package com.zyren.backend.media;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.zyren.backend.paste.PasteEntity;
import com.zyren.backend.paste.PasteRepository;
import com.zyren.backend.user.Role;
import com.zyren.backend.user.UserEntity;
import com.zyren.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MediaService {

    private final Cloudinary cloudinary;
    private final PasteRepository pasteRepository;
    private final UserRepository userRepository;

    private static final List<String> ALLOWED_TYPES = List.of(
            "image/jpeg", "image/png", "image/jpg", "image/webp",
            "video/mp4", "video/quicktime",
            "application/pdf"
    );

    private static final long MAX_SIZE_BYTES = 15 * 1024 * 1024;

    public MediaUploadResponse upload(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File is required");
        }
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new RuntimeException("Unsupported file type");
        }
        if (file.getSize() > MAX_SIZE_BYTES) {
            throw new RuntimeException("File too large");
        }

        String contentType = file.getContentType();
        Map<String, Object> uploadParams = new HashMap<>();
        if ("application/pdf".equals(contentType)) {
            uploadParams.put("resource_type", "raw");
        } else {
            uploadParams.put("resource_type", "image");
        }
        uploadParams.put("folder", "zyren/pastes");
        uploadParams.put("use_filename", true);
        uploadParams.put("unique_filename", true);
        uploadParams.put("overwrite", false);

        Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadParams);

        String secureUrl = (String) uploadResult.get("secure_url");
        String publicId = (String) uploadResult.get("public_id");

        return new MediaUploadResponse(secureUrl, publicId, (String) uploadParams.get("resource_type"));
    }

    public void delete(Long pasteId, String publicId) throws IOException {
        PasteEntity paste = pasteRepository.findById(pasteId)
                .orElseThrow(() -> new RuntimeException("Paste not found"));

        UserEntity user = currentUser();
        boolean isOwner = paste.getOwner() != null && paste.getOwner().getId().equals(user.getId());
        boolean isAdmin = user.getRole() == Role.ADMIN;
        if (!isOwner && !isAdmin) {
            throw new RuntimeException("Not allowed");
        }

        if (paste.getMediaPublicId() == null || !paste.getMediaPublicId().equals(publicId)) {
            throw new RuntimeException("Media does not belong to paste");
        }

        String resourceType = paste.getMediaType() == null ? "image" : paste.getMediaType();
        cloudinary.uploader().destroy(publicId, ObjectUtils.asMap(
                "resource_type", resourceType,
                "invalidate", true
        ));

        paste.setMediaUrl(null);
        paste.setMediaPublicId(null);
        paste.setMediaType(null);
        pasteRepository.save(paste);
    }

    private UserEntity currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            throw new RuntimeException("Unauthenticated");
        }
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private String resolveResourceType(String contentType) {
        if (contentType == null) return "auto";
        if (contentType.startsWith("video")) return "video";
        if (contentType.equals("application/pdf")) return "raw";
        return "image";
    }
}

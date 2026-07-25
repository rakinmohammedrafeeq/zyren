package com.zyren.backend.paste;

import com.zyren.backend.user.Role;
import com.zyren.backend.user.UserEntity;
import com.zyren.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PasteService {

    private final PasteRepository pasteRepository;
    private final UserRepository userRepository;
    private final CodeGenerator codeGenerator;

    public PasteEntity createPaste(String title, String content, String type, Integer expiryMinutes, String customCode) {
        return createPaste(title, content, type, expiryMinutes, customCode, null, null, null);
    }

    public PasteEntity createPaste(String title, String content, String type, Integer expiryMinutes, String customCode,
                                   String mediaUrl, String mediaPublicId, String mediaType) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDateTime expiryAt = (expiryMinutes != null)
                ? LocalDateTime.now().plusMinutes(expiryMinutes)
                : null;

        String finalCode;
        if (customCode != null && !customCode.isBlank()) {
            String candidate = customCode.trim();
            if (!candidate.matches("[A-Za-z0-9_-]+")) {
                throw new RuntimeException("Invalid code format. Use only letters, numbers, '-' or '_'.");
            }
            boolean exists = pasteRepository.findByCode(candidate).isPresent();
            if (exists) {
                throw new RuntimeException("Code already in use. Please choose a different code.");
            }
            finalCode = candidate;
        } else {
            finalCode = codeGenerator.generateUniqueCode();
        }

        PasteEntity paste = PasteEntity.builder()
                .title(title)
                .content(content)
                .type(type)
                .code(finalCode)
                .createdAt(LocalDateTime.now())
                .expiryAt(expiryAt)
                .owner(owner)
                .mediaUrl(mediaUrl)
                .mediaPublicId(mediaPublicId)
                .mediaType(mediaType)
                .build();

        return pasteRepository.save(paste);
    }

    public List<PasteEntity> getMyPastes() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return pasteRepository.findByOwnerAndExpiredFalseOrderByCreatedAtDesc(owner);
    }

    public PasteEntity getByCode(String code) {
        PasteEntity paste = pasteRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Paste not found"));

        if (paste.getExpiryAt() != null && LocalDateTime.now().isAfter(paste.getExpiryAt())) {
            paste.setExpired(true);
            pasteRepository.save(paste);
            throw new RuntimeException("Paste has expired!");
        }

        return paste;
    }

    public PasteEntity editPaste(Long id, String newTitle, String newContent, String mediaUrl, String mediaPublicId, String mediaType) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PasteEntity paste = pasteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paste not found"));

        boolean isOwner = paste.getOwner().getId().equals(owner.getId());
        boolean isAdmin = owner.getRole() == Role.ADMIN;
        if (!isOwner && !isAdmin) {
            throw new RuntimeException("You can only edit your own pastes!");
        }

        paste.setTitle(newTitle);
        paste.setContent(newContent);

        // Update media info
        paste.setMediaUrl(mediaUrl);
        paste.setMediaPublicId(mediaPublicId);
        paste.setMediaType(mediaType);

        return pasteRepository.save(paste);
    }

    public void deleteMyPaste(Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PasteEntity paste = pasteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paste not found"));

        boolean isOwner = paste.getOwner().getId().equals(owner.getId());
        boolean isAdmin = owner.getRole() == Role.ADMIN;
        if (!isOwner && !isAdmin) {
            throw new RuntimeException("You are not allowed to delete this paste!");
        }

        pasteRepository.delete(paste);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void adminDelete(Long id) {
        pasteRepository.deleteById(id);
    }

    @Scheduled(fixedRate = 60000)
    public void autoExpirePastes() {
        List<PasteEntity> all = pasteRepository.findAll();
        LocalDateTime now = LocalDateTime.now();

        for (PasteEntity paste : all) {
            if (paste.getExpiryAt() != null && now.isAfter(paste.getExpiryAt()) && !paste.isExpired()) {
                paste.setExpired(true);
                pasteRepository.save(paste);
            }
        }
    }

    @Scheduled(cron = "0 0 3 * * *")
    public void cleanupExpiredPastes() {

        LocalDateTime cutoff = LocalDateTime.now().minusDays(7);

        List<PasteEntity> all = pasteRepository.findAll();

        for (PasteEntity paste : all) {
            if (paste.isExpired() && paste.getExpiryAt() != null && paste.getExpiryAt().isBefore(cutoff)) {
                pasteRepository.delete(paste);
            }
        }
    }

}

package com.zyren.backend.media;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
@Slf4j
public class MediaController {

    private final MediaService mediaService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MediaUploadResponse> upload(@RequestParam("file") MultipartFile file) throws Exception {
        log.debug("[media] upload request: name={}, size={}, type={}", file != null ? file.getOriginalFilename() : null,
                file != null ? file.getSize() : null,
                file != null ? file.getContentType() : null);

        // Delegate to service; replace with simple success message if desired
        MediaUploadResponse response = mediaService.upload(file);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> delete(@RequestParam Long pasteId,
                                       @RequestParam String publicId) throws Exception {
        mediaService.delete(pasteId, publicId);
        return ResponseEntity.noContent().build();
    }
}

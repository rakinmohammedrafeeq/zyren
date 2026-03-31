package com.zyren.backend.paste;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/paste")
public class PasteController {

    private final PasteService pasteService;

    @PostMapping
    public ResponseEntity<PasteEntity> createPaste(@RequestParam String title,
                                                   @RequestParam String content,
                                                   @RequestParam(defaultValue = "TEXT") String type,
                                                   @RequestParam(required = false) Integer expiryMinutes,
                                                   @RequestParam(required = false, name = "code") String customCode,
                                                   @RequestParam(required = false) String mediaUrl,
                                                   @RequestParam(required = false) String mediaPublicId,
                                                   @RequestParam(required = false) String mediaType) {
        return ResponseEntity.ok(pasteService.createPaste(title, content, type, expiryMinutes, customCode, mediaUrl, mediaPublicId, mediaType));
    }

    @GetMapping("/me")
    public ResponseEntity<List<PasteEntity>> getMyPastes() {
        return ResponseEntity.ok(pasteService.getMyPastes());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMyPaste(@PathVariable Long id) {
        pasteService.deleteMyPaste(id);
        return ResponseEntity.ok("Paste deleted successfully!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<PasteEntity> editPaste(@PathVariable Long id,
                                                 @RequestParam String title,
                                                 @RequestParam String content,
                                                 @RequestParam(required = false) String mediaUrl,
                                                 @RequestParam(required = false) String mediaPublicId,
                                                 @RequestParam(required = false) String mediaType) {
        return ResponseEntity.ok(pasteService.editPaste(id, title, content, mediaUrl, mediaPublicId, mediaType));
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminDelete(@PathVariable Long id) {
        pasteService.adminDelete(id);
        return ResponseEntity.ok("Paste deleted by admin!");
    }

}
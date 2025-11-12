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
                                                   @RequestParam(required = false) Integer expiryMinutes) {
        return ResponseEntity.ok(pasteService.createPaste(title, content, type, expiryMinutes));
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
                                                 @RequestParam String content) {
        return ResponseEntity.ok(pasteService.editPaste(id, title, content));
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminDelete(@PathVariable Long id) {
        pasteService.adminDelete(id);
        return ResponseEntity.ok("Paste deleted by admin!");
    }

}
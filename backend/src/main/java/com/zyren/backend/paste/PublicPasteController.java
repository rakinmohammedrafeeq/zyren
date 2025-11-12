package com.zyren.backend.paste;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public")
public class PublicPasteController {

    private final PasteService pasteService;

    @GetMapping("/{code}")
    public ResponseEntity<PasteEntity> getPasteByCode(@PathVariable String code) {
        return ResponseEntity.ok(pasteService.getByCode(code));
    }
}
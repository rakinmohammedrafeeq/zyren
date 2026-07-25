package com.zyren.backend.ai;

import lombok.Data;

@Data
public class AIRequest {
    private String content;
    private String question;
    private String targetLanguage;
    private String action; // "generate-title", "summarize", "chat", "translate"
    private String mediaUrl; // For image/media analysis
    private String mediaType; // "image", "video", "pdf"
}

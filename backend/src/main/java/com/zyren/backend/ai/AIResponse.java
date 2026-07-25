package com.zyren.backend.ai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AIResponse {
    private String result;
    private String contentType; // "code", "recipe", "notes", "article", "other"
    private Integer wordCount;
    private String error;

    public AIResponse(String result) {
        this.result = result;
    }

    public static AIResponse error(String message) {
        AIResponse response = new AIResponse();
        response.setError(message);
        return response;
    }
}

package com.zyren.backend.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    @Autowired
    private AIService aiService;

    /**
     * Generate title from content
     */
    @PostMapping("/generate-title")
    public ResponseEntity<AIResponse> generateTitle(@RequestBody AIRequest request) {
        try {
            String title = aiService.generateTitle(request.getContent());
            return ResponseEntity.ok(new AIResponse(title));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                .status(503) // Service Unavailable
                .body(AIResponse.error(e.getMessage()));
        }
    }

    /**
     * Summarize content (with optional media)
     */
    @PostMapping("/summarize")
    public ResponseEntity<AIResponse> summarize(@RequestBody AIRequest request) {
        try {
            String summary;
            
            // Check if media is included
            if (request.getMediaUrl() != null && !request.getMediaUrl().isEmpty()) {
                summary = aiService.summarizeWithMedia(
                    request.getContent(), 
                    request.getMediaUrl(), 
                    request.getMediaType()
                );
            } else {
                summary = aiService.summarize(request.getContent());
            }
            
            String contentType = aiService.detectContentType(request.getContent());
            int wordCount = request.getContent().split("\\s+").length;

            AIResponse response = new AIResponse();
            response.setResult(summary);
            response.setContentType(contentType);
            response.setWordCount(wordCount);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                .status(503)
                .body(AIResponse.error(e.getMessage()));
        }
    }

    /**
     * Chat/Answer questions about content (with optional media)
     */
    @PostMapping("/chat")
    public ResponseEntity<AIResponse> chat(@RequestBody AIRequest request) {
        try {
            String answer;
            
            // Check if media is included
            if (request.getMediaUrl() != null && !request.getMediaUrl().isEmpty()) {
                answer = aiService.chatWithMedia(
                    request.getContent(), 
                    request.getQuestion(), 
                    request.getMediaUrl()
                );
            } else {
                answer = aiService.chat(request.getContent(), request.getQuestion());
            }
            
            return ResponseEntity.ok(new AIResponse(answer));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                .status(503)
                .body(AIResponse.error(e.getMessage()));
        }
    }

    /**
     * Translate content
     */
    @PostMapping("/translate")
    public ResponseEntity<AIResponse> translate(@RequestBody AIRequest request) {
        try {
            String translation = aiService.translate(request.getContent(), request.getTargetLanguage());
            return ResponseEntity.ok(new AIResponse(translation));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                .status(503)
                .body(AIResponse.error(e.getMessage()));
        }
    }

    /**
     * Detect content type
     */
    @PostMapping("/detect-type")
    public ResponseEntity<AIResponse> detectType(@RequestBody AIRequest request) {
        try {
            String contentType = aiService.detectContentType(request.getContent());
            return ResponseEntity.ok(new AIResponse(contentType));
        } catch (Exception e) {
            // For detect-type, just return "unknown" instead of error
            return ResponseEntity.ok(new AIResponse("unknown"));
        }
    }
}

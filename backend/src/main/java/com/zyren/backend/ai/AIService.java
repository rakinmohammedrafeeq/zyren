package com.zyren.backend.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Enterprise-grade multi-tier AI Service supporting automatic provider and model fallback.
 * Primary and fallback roles can be toggled between Groq (ultra-fast inference) and
 * Google Gemini (advanced multimodal reasoning). Each provider maintains its own ordered
 * chain of verified non-decommissioned text and vision models.
 */
@Service
public class AIService {

    @Value("${ai.primary.provider:groq}")
    private String aiPrimaryProvider;

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @Value("${groq.api.key:}")
    private String groqApiKey;

    // --- Groq Models ---
    @Value("${groq.text.model:groq/compound-mini}")
    private String groqTextModel;

    @Value("${groq.text.fallback1:openai/gpt-oss-120b}")
    private String groqTextFallback1;

    @Value("${groq.text.fallback2:openai/gpt-oss-20b}")
    private String groqTextFallback2;

    @Value("${groq.text.fallback3:qwen/qwen3.8-27b}")
    private String groqTextFallback3;

    @Value("${groq.text.fallback4:groq/compound}")
    private String groqTextFallback4;

    @Value("${groq.text.fallbacks:}")
    private String groqTextFallbacks;

    @Value("${groq.vision.model:qwen/qwen3.8-27b}")
    private String groqVisionModel;

    @Value("${groq.vision.fallback1:qwen/qwen3.8-27b}")
    private String groqVisionFallback1;

    @Value("${groq.vision.fallbacks:}")
    private String groqVisionFallbacks;

    // --- Gemini Vision Models ---
    @Value("${gemini.vision.primary:gemini-3.6-flash}")
    private String geminiVisionPrimary;

    @Value("${gemini.vision.fallback1:gemini-flash-latest}")
    private String geminiVisionFallback1;

    @Value("${gemini.vision.fallback2:gemini-3.8-flash}")
    private String geminiVisionFallback2;

    @Value("${gemini.vision.fallback3:gemini-3.5-flash-lite}")
    private String geminiVisionFallback3;

    @Value("${gemini.vision.fallback4:gemini-3.1-flash-lite}")
    private String geminiVisionFallback4;

    // --- Gemini Text Models ---
    @Value("${gemini.text.primary:gemini-3.6-flash}")
    private String geminiTextPrimary;

    @Value("${gemini.text.fallback1:gemini-flash-latest}")
    private String geminiTextFallback1;

    @Value("${gemini.text.fallback2:gemini-3.8-flash}")
    private String geminiTextFallback2;

    @Value("${gemini.text.fallback3:gemini-3.5-flash-lite}")
    private String geminiTextFallback3;

    @Value("${gemini.text.fallback4:gemini-3.1-flash-lite}")
    private String geminiTextFallback4;

    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
    private static final String GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models/";

    private final RestTemplate restTemplate = new RestTemplate();

    // ==========================================
    // Public API Methods
    // ==========================================

    /**
     * Generate a short, descriptive title from content.
     * Uses full multi-provider and multi-model fallback chain.
     */
    public String generateTitle(String content) {
        if (content == null || content.trim().isEmpty()) {
            return "Untitled Paste";
        }

        String prompt = "Generate a short, descriptive title (maximum 8 words) for this content. Return ONLY the title, nothing else:\n\n"
                + content.substring(0, Math.min(content.length(), 1000));

        String rawTitle = executeTextWithFallback(prompt);
        if (rawTitle == null || rawTitle.trim().isEmpty()) {
            return "Untitled Paste";
        }

        // Clean up title (remove wrapping quotes or prefixes if present)
        String cleaned = rawTitle.trim().replaceAll("^[\"']|[\"']$", "").replaceAll("^(Title:|Subject:)\\s*", "");
        return cleaned.isEmpty() ? "Untitled Paste" : cleaned;
    }

    /**
     * Summarize text content.
     * Uses full multi-provider and multi-model fallback chain.
     */
    public String summarize(String content) {
        if (content == null || content.trim().isEmpty()) {
            return "No content to summarize.";
        }

        String prompt = "Summarize the following content. Provide a clear, comprehensive summary that captures the key points and main ideas. Use markdown formatting with asterisks (*) for emphasis and bullet points.\n\n"
                + content;

        return executeTextWithFallback(prompt);
    }

    /**
     * Summarize content with media attachment (Image, PDF, Video thumbnail).
     * Uses multimodal vision models with provider/model fallback and graceful text-only fallback.
     */
    public String summarizeWithMedia(String content, String mediaUrl, String mediaType) {
        if (mediaUrl == null || mediaUrl.trim().isEmpty()) {
            return summarize(content);
        }

        String prompt;
        if ("pdf".equalsIgnoreCase(mediaType)) {
            prompt = "You are analyzing a PDF document AND separate text content.\n\n" +
                    "CRITICAL INSTRUCTIONS:\n" +
                    "1. First section: Describe what you see in the PDF document (any text, images, structure, formatting, dates, logos, information visible)\n" +
                    "2. Add TWO blank lines\n" +
                    "3. Second section: Provide a summary of the user's text content below\n" +
                    "4. Use markdown formatting with asterisks (*) for emphasis and lists\n" +
                    "5. Each section should be comprehensive and detailed\n\n" +
                    "User's text content:\n" + (content != null ? content : "");
        } else if ("video".equalsIgnoreCase(mediaType)) {
            prompt = "You are analyzing a video thumbnail AND separate text content.\n\n" +
                    "CRITICAL INSTRUCTIONS:\n" +
                    "1. First section: Describe what you see in the video thumbnail (scene, people, objects, text overlays, colors, composition)\n" +
                    "2. Add TWO blank lines\n" +
                    "3. Second section: Provide a summary of the user's text content below\n" +
                    "4. Use markdown formatting with asterisks (*) for emphasis and lists\n" +
                    "5. Each section should be comprehensive and detailed\n\n" +
                    "User's text content:\n" + (content != null ? content : "");
        } else {
            prompt = "You are analyzing an image AND separate text content.\n\n" +
                    "CRITICAL INSTRUCTIONS:\n" +
                    "1. First section: Describe what you see in the image with all details (objects, people, text, colors, composition, any visible information)\n" +
                    "2. Add TWO blank lines\n" +
                    "3. Second section: Provide a summary of the user's text content below\n" +
                    "4. Use markdown formatting with asterisks (*) for emphasis and lists\n" +
                    "5. Each section should be comprehensive and detailed\n\n" +
                    "User's text content:\n" + (content != null ? content : "");
        }

        return executeVisionWithFallback(prompt, mediaUrl, content);
    }

    /**
     * Chat/Answer questions about content.
     */
    public String chat(String content, String question) {
        if (content == null || content.trim().isEmpty()) {
            return "No content available to answer questions about.";
        }

        if (question == null || question.trim().isEmpty()) {
            return "Please ask a question.";
        }

        String prompt = "Based on this content:\n\n" + content + "\n\nAnswer this question concisely: " + question;
        return executeTextWithFallback(prompt);
    }

    /**
     * Chat with media context.
     */
    public String chatWithMedia(String content, String question, String mediaUrl) {
        if (mediaUrl == null || mediaUrl.trim().isEmpty()) {
            return chat(content, question);
        }

        String prompt = "IMPORTANT: This paste contains BOTH an image/document AND text content.\n\n" +
                "IMAGE/DOCUMENT: You are viewing an image or document (such as a PDF, photo, or screenshot). " +
                "Please carefully examine what is shown in this image/document.\n\n" +
                "TEXT CONTENT:\n" + (content != null ? content : "") + "\n\n" +
                "USER QUESTION: " + question + "\n\n" +
                "INSTRUCTIONS: Answer the question based on BOTH the image/document you can see AND the text content provided. " +
                "If the question is about what's in the image, describe what you see. " +
                "If the question is about the content in general, combine information from both sources. " +
                "FORMATTING: Use markdown formatting with asterisks (*) for emphasis and bullet points to organize your response clearly.";

        try {
            return executeVisionWithFallback(prompt, mediaUrl, content);
        } catch (Exception e) {
            System.err.println("⚠️ Vision chat failed across providers, falling back to text chat: " + e.getMessage());
            String textAnswer = chat(content, question);
            return textAnswer + "\n\n*(Note: Vision analysis was temporarily unavailable; answer derived from text content).*";
        }
    }

    /**
     * Translate content into a target language.
     */
    public String translate(String content, String targetLanguage) {
        if (content == null || content.trim().isEmpty()) {
            return "No content to translate.";
        }

        String prompt = "Translate the following content to " + targetLanguage + ":\n\n" + content;
        return executeTextWithFallback(prompt);
    }

    /**
     * Detect content category.
     */
    public String detectContentType(String content) {
        if (content == null || content.trim().isEmpty()) {
            return "unknown";
        }

        String prompt = "Classify this content into ONE of these categories: code, recipe, notes, article, poem, list, other. " +
                "Only return the category name:\n\n" + content.substring(0, Math.min(content.length(), 500));

        try {
            String result = executeTextWithFallback(prompt);
            if (result != null) {
                String cleaned = result.toLowerCase().trim();
                List<String> validTypes = Arrays.asList("code", "recipe", "notes", "article", "poem", "list", "other");
                for (String vt : validTypes) {
                    if (cleaned.contains(vt)) {
                        return vt;
                    }
                }
                return cleaned;
            }
        } catch (Exception e) {
            System.err.println("⚠️ detectContentType failed across all providers: " + e.getMessage());
        }
        return "unknown";
    }

    // ==========================================
    // Core Orchestration & Fallback Pipelines
    // ==========================================

    /**
     * Orchestrates text execution with dual-provider and multi-model fallback.
     * Respects aiPrimaryProvider ('groq' or 'gemini').
     */
    private String executeTextWithFallback(String prompt) {
        boolean isGeminiPrimary = "gemini".equalsIgnoreCase(aiPrimaryProvider);

        if (isGeminiPrimary) {
            // Flow: Gemini text models -> Groq text models
            String geminiResult = tryGeminiTextModels(prompt);
            if (geminiResult != null) return geminiResult;

            System.out.println("🔄 Primary provider (Gemini) exhausted all text models. Falling over to Groq...");
            String groqResult = tryGroqTextModels(prompt);
            if (groqResult != null) return groqResult;
        } else {
            // Flow: Groq text models -> Gemini text models
            String groqResult = tryGroqTextModels(prompt);
            if (groqResult != null) return groqResult;

            System.out.println("🔄 Primary provider (Groq) exhausted all text models. Falling over to Gemini...");
            String geminiResult = tryGeminiTextModels(prompt);
            if (geminiResult != null) return geminiResult;
        }

        throw new RuntimeException("AI service temporarily unavailable across all providers and models. Please try again later.");
    }

    /**
     * Orchestrates vision execution with dual-provider and multi-model fallback.
     * Falls back gracefully to text-only if all vision models are exhausted.
     */
    private String executeVisionWithFallback(String prompt, String mediaUrl, String fallbackContent) {
        boolean isGeminiPrimary = "gemini".equalsIgnoreCase(aiPrimaryProvider);

        if (isGeminiPrimary) {
            // Flow: Gemini Vision models -> Groq Vision models -> Text-only fallback
            String geminiResult = tryGeminiVisionModels(mediaUrl, prompt);
            if (geminiResult != null) return geminiResult;

            System.out.println("🔄 Primary vision provider (Gemini) exhausted. Falling over to Groq Vision...");
            String groqResult = tryGroqVisionModels(prompt, mediaUrl);
            if (groqResult != null) return groqResult;
        } else {
            // Flow: Groq Vision models -> Gemini Vision models -> Text-only fallback
            String groqResult = tryGroqVisionModels(prompt, mediaUrl);
            if (groqResult != null) return groqResult;

            System.out.println("🔄 Primary vision provider (Groq) exhausted. Falling over to Gemini Vision...");
            String geminiResult = tryGeminiVisionModels(mediaUrl, prompt);
            if (geminiResult != null) return geminiResult;
        }

        // Both vision systems failed, gracefully fallback to text-only processing
        System.err.println("⚠️ All vision models across both Groq and Gemini failed. Falling back to text-only summary...");
        return summarize(fallbackContent);
    }

    // ==========================================
    // Groq Execution Engine
    // ==========================================

    private String tryGroqTextModels(String prompt) {
        if (groqApiKey == null || groqApiKey.trim().isEmpty()) {
            System.err.println("⚠️ Groq API key is not configured, skipping Groq text models.");
            return null;
        }

        List<String> models = getGroqTextModels();
        for (int i = 0; i < models.size(); i++) {
            String model = models.get(i);
            try {
                System.out.printf("🤖 [Groq Text] Attempting model %d/%d: %s%n", (i + 1), models.size(), model);
                String result = callSingleGroqTextModel(model, prompt);
                if (result != null && !result.trim().isEmpty()) {
                    System.out.printf("✅ [Groq Text] Success with model: %s (%d chars)%n", model, result.length());
                    return result;
                }
            } catch (Exception e) {
                System.err.printf("⚠️ [Groq Text] Model %s failed: %s%n", model, e.getMessage());
            }
        }
        return null;
    }

    private String tryGroqVisionModels(String prompt, String mediaUrl) {
        if (groqApiKey == null || groqApiKey.trim().isEmpty()) {
            System.err.println("⚠️ Groq API key is not configured, skipping Groq vision models.");
            return null;
        }

        List<String> models = getGroqVisionModels();
        for (int i = 0; i < models.size(); i++) {
            String model = models.get(i);
            try {
                System.out.printf("👁️ [Groq Vision] Attempting model %d/%d: %s%n", (i + 1), models.size(), model);
                String result = callSingleGroqVisionModel(model, prompt, mediaUrl);
                if (result != null && !result.trim().isEmpty()) {
                    System.out.printf("✅ [Groq Vision] Success with model: %s (%d chars)%n", model, result.length());
                    return result;
                }
            } catch (Exception e) {
                System.err.printf("⚠️ [Groq Vision] Model %s failed: %s%n", model, e.getMessage());
            }
        }
        return null;
    }

    private String callSingleGroqTextModel(String model, String prompt) {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);

        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);
        requestBody.put("messages", List.of(message));
        requestBody.put("temperature", 0.7);
        requestBody.put("max_tokens", 1024);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey.trim());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.exchange(GROQ_API_URL, HttpMethod.POST, entity, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> msg = (Map<String, Object>) choices.get(0).get("message");
                if (msg != null && msg.containsKey("content")) {
                    return (String) msg.get("content");
                }
            }
        }
        return null;
    }

    private String callSingleGroqVisionModel(String model, String prompt, String imageUrl) {
        String processedUrl = imageUrl != null ? imageUrl.trim() : "";
        if (!processedUrl.startsWith("http://") && !processedUrl.startsWith("https://") && !processedUrl.startsWith("data:")) {
            processedUrl = "https://" + processedUrl;
        }

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);

        List<Map<String, Object>> contentParts = new ArrayList<>();

        Map<String, Object> textPart = new HashMap<>();
        textPart.put("type", "text");
        textPart.put("text", prompt);
        contentParts.add(textPart);

        Map<String, Object> imagePart = new HashMap<>();
        imagePart.put("type", "image_url");
        Map<String, Object> imageUrlObj = new HashMap<>();
        imageUrlObj.put("url", processedUrl);
        imagePart.put("image_url", imageUrlObj);
        contentParts.add(imagePart);

        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", contentParts);

        requestBody.put("messages", List.of(message));
        requestBody.put("temperature", 0.7);
        requestBody.put("max_tokens", 2048);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey.trim());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.exchange(GROQ_API_URL, HttpMethod.POST, entity, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> msg = (Map<String, Object>) choices.get(0).get("message");
                if (msg != null && msg.containsKey("content")) {
                    return (String) msg.get("content");
                }
            }
        }
        return null;
    }

    // ==========================================
    // Gemini Execution Engine
    // ==========================================

    private String tryGeminiTextModels(String prompt) {
        if (geminiApiKey == null || geminiApiKey.trim().isEmpty()) {
            System.err.println("⚠️ Gemini API key is not configured, skipping Gemini text models.");
            return null;
        }

        List<String> models = getGeminiTextModels();
        for (int i = 0; i < models.size(); i++) {
            String model = models.get(i);
            try {
                System.out.printf("🤖 [Gemini Text] Attempting model %d/%d: %s%n", (i + 1), models.size(), model);
                String result = callSingleGeminiTextModel(model, prompt);
                if (result != null && !result.trim().isEmpty()) {
                    System.out.printf("✅ [Gemini Text] Success with model: %s (%d chars)%n", model, result.length());
                    return result;
                }
            } catch (Exception e) {
                System.err.printf("⚠️ [Gemini Text] Model %s failed: %s%n", model, e.getMessage());
            }
        }
        return null;
    }

    private String tryGeminiVisionModels(String mediaUrl, String textPrompt) {
        if (geminiApiKey == null || geminiApiKey.trim().isEmpty()) {
            System.err.println("⚠️ Gemini API key is not configured, skipping Gemini vision models.");
            return null;
        }

        // Download image/media once for all model attempts
        String base64Image;
        String mimeType;
        try {
            base64Image = downloadImageAsBase64(mediaUrl);
            mimeType = getMimeTypeFromUrl(mediaUrl);
        } catch (IOException e) {
            System.err.println("❌ Failed to download media for Gemini Vision: " + e.getMessage());
            return null;
        }

        List<String> models = getGeminiVisionModels();
        for (int i = 0; i < models.size(); i++) {
            String model = models.get(i);
            try {
                System.out.printf("👁️ [Gemini Vision] Attempting model %d/%d: %s%n", (i + 1), models.size(), model);
                String result = callSingleGeminiVisionModel(model, base64Image, mimeType, textPrompt);
                if (result != null && !result.trim().isEmpty()) {
                    System.out.printf("✅ [Gemini Vision] Success with model: %s (%d chars)%n", model, result.length());
                    return result;
                }
            } catch (Exception e) {
                System.err.printf("⚠️ [Gemini Vision] Model %s failed: %s%n", model, e.getMessage());
            }
        }
        return null;
    }

    private String callSingleGeminiTextModel(String model, String prompt) {
        String url = GEMINI_API_BASE + model + ":generateContent?key=" + geminiApiKey.trim();

        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> content = new HashMap<>();
        Map<String, String> part = new HashMap<>();
        part.put("text", prompt);
        content.put("parts", List.of(part));
        requestBody.put("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return parseGeminiResponse(response.getBody());
        }
        return null;
    }

    private String callSingleGeminiVisionModel(String model, String base64Image, String mimeType, String textPrompt) {
        String url = GEMINI_API_BASE + model + ":generateContent?key=" + geminiApiKey.trim();

        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> content = new HashMap<>();
        List<Map<String, Object>> parts = new ArrayList<>();

        // Text prompt part
        Map<String, Object> textPart = new HashMap<>();
        textPart.put("text", textPrompt);
        parts.add(textPart);

        // Image part with inlineData
        Map<String, Object> imagePart = new HashMap<>();
        Map<String, String> inlineData = new HashMap<>();
        inlineData.put("mimeType", mimeType);
        inlineData.put("data", base64Image);
        imagePart.put("inlineData", inlineData);
        parts.add(imagePart);

        content.put("parts", parts);
        requestBody.put("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return parseGeminiResponse(response.getBody());
        }
        return null;
    }

    private String parseGeminiResponse(Map<String, Object> responseBody) {
        try {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> candidate = candidates.get(0);
                Map<String, Object> content = (Map<String, Object>) candidate.get("content");
                if (content != null) {
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (parts != null && !parts.isEmpty()) {
                        return (String) parts.get(0).get("text");
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("⚠️ Could not parse Gemini response: " + e.getMessage());
        }
        return null;
    }

    // ==========================================
    // Media & Helper Utilities
    // ==========================================

    private String downloadImageAsBase64(String imageUrl) throws IOException {
        String cleanUrl = imageUrl.trim();
        if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
            cleanUrl = "https://" + cleanUrl;
        }
        URL url = new URL(cleanUrl);
        byte[] imageBytes = url.openStream().readAllBytes();
        return Base64.getEncoder().encodeToString(imageBytes);
    }

    private String getMimeTypeFromUrl(String imageUrl) {
        String lowerUrl = imageUrl.toLowerCase();
        if (lowerUrl.contains(".png")) return "image/png";
        if (lowerUrl.contains(".gif")) return "image/gif";
        if (lowerUrl.contains(".webp")) return "image/webp";
        if (lowerUrl.contains(".pdf")) return "application/pdf";
        return "image/jpeg";
    }

    // ==========================================
    // Model List Resolvers
    // ==========================================

    private List<String> getGroqTextModels() {
        Set<String> set = new LinkedHashSet<>();
        List<String> candidates = List.of(
                groqTextModel != null ? groqTextModel : "",
                groqTextFallback1 != null ? groqTextFallback1 : "",
                groqTextFallback2 != null ? groqTextFallback2 : "",
                groqTextFallback3 != null ? groqTextFallback3 : "",
                groqTextFallback4 != null ? groqTextFallback4 : ""
        );
        for (String c : candidates) {
            if (!c.trim().isEmpty()) set.add(c.trim());
        }
        if (groqTextFallbacks != null && !groqTextFallbacks.trim().isEmpty()) {
            for (String m : groqTextFallbacks.split(",")) {
                if (!m.trim().isEmpty()) set.add(m.trim());
            }
        }
        // Fallback default list if empty
        if (set.isEmpty()) {
            set.addAll(List.of("groq/compound-mini", "openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.8-27b", "groq/compound"));
        }
        return new ArrayList<>(set);
    }

    private List<String> getGroqVisionModels() {
        Set<String> set = new LinkedHashSet<>();
        List<String> candidates = List.of(
                groqVisionModel != null ? groqVisionModel : "",
                groqVisionFallback1 != null ? groqVisionFallback1 : ""
        );
        for (String c : candidates) {
            if (!c.trim().isEmpty()) set.add(c.trim());
        }
        if (groqVisionFallbacks != null && !groqVisionFallbacks.trim().isEmpty()) {
            for (String m : groqVisionFallbacks.split(",")) {
                if (!m.trim().isEmpty()) set.add(m.trim());
            }
        }
        if (set.isEmpty()) {
            set.addAll(List.of("qwen/qwen3.8-27b"));
        }
        return new ArrayList<>(set);
    }

    private List<String> getGeminiTextModels() {
        Set<String> set = new LinkedHashSet<>();
        List<String> candidates = List.of(
                geminiTextPrimary != null ? geminiTextPrimary : "",
                geminiTextFallback1 != null ? geminiTextFallback1 : "",
                geminiTextFallback2 != null ? geminiTextFallback2 : "",
                geminiTextFallback3 != null ? geminiTextFallback3 : "",
                geminiTextFallback4 != null ? geminiTextFallback4 : ""
        );
        for (String c : candidates) {
            if (!c.trim().isEmpty()) set.add(c.trim());
        }
        if (set.isEmpty()) {
            set.addAll(List.of("gemini-3.6-flash", "gemini-flash-latest", "gemini-3.8-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"));
        }
        return new ArrayList<>(set);
    }

    private List<String> getGeminiVisionModels() {
        Set<String> set = new LinkedHashSet<>();
        List<String> candidates = List.of(
                geminiVisionPrimary != null ? geminiVisionPrimary : "",
                geminiVisionFallback1 != null ? geminiVisionFallback1 : "",
                geminiVisionFallback2 != null ? geminiVisionFallback2 : "",
                geminiVisionFallback3 != null ? geminiVisionFallback3 : "",
                geminiVisionFallback4 != null ? geminiVisionFallback4 : ""
        );
        for (String c : candidates) {
            if (!c.trim().isEmpty()) set.add(c.trim());
        }
        if (set.isEmpty()) {
            set.addAll(List.of("gemini-3.6-flash", "gemini-flash-latest", "gemini-3.8-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"));
        }
        return new ArrayList<>(set);
    }
}

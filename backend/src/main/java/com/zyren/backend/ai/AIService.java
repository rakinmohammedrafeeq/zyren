package com.zyren.backend.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @Value("${groq.api.key:}")
    private String groqApiKey;
    
    // Vision models (support images/PDFs/video)
    @Value("${gemini.vision.primary:gemini-3.6-flash}")
    private String geminiVisionPrimary;
    
    @Value("${gemini.vision.fallback1:gemini-3.5-flash}")
    private String geminiVisionFallback1;
    
    @Value("${gemini.vision.fallback2:gemini-3-flash}")
    private String geminiVisionFallback2;
    
    @Value("${gemini.vision.fallback3:gemini-2.5-flash}")
    private String geminiVisionFallback3;
    
    // Text-only models (best limits for text processing)
    @Value("${gemini.text.primary:gemini-3.5-flash-lite}")
    private String geminiTextPrimary;
    
    @Value("${gemini.text.fallback1:gemini-3.1-flash-lite}")
    private String geminiTextFallback1;
    
    @Value("${gemini.text.fallback2:gemini-3.6-flash}")
    private String geminiTextFallback2;
    
    @Value("${gemini.text.fallback3:gemini-2.5-flash-lite}")
    private String geminiTextFallback3;
    
    @Value("${groq.text.model:llama-3.3-70b-versatile}")
    private String groqTextModel;
    
    @Value("${groq.vision.model:meta-llama/llama-4-maverick-17b-128e-instruct}")
    private String groqVisionModel;

    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Generate a title from content (uses Groq for speed)
     */
    public String generateTitle(String content) {
        if (content == null || content.trim().isEmpty()) {
            return "Untitled Paste";
        }

        String prompt = "Generate a short, descriptive title (maximum 8 words) for this content. Return ONLY the title, nothing else:\n\n" + content.substring(0, Math.min(content.length(), 1000));

        return callGroqAPI(prompt);
    }

    /**
     * Summarize content (uses Groq for text)
     * Provides a comprehensive summary
     */
    public String summarize(String content) {
        if (content == null || content.trim().isEmpty()) {
            return "No content to summarize.";
        }

        String prompt = "Summarize the following content. Provide a clear, comprehensive summary that captures the key points and main ideas. Use plain text without markdown formatting.\n\n" + content;

        return callGroqAPI(prompt);
    }

    /**
     * Summarize content with media (uses Groq vision model for image analysis)
     * Returns detailed analysis with image and text separated by new line
     */
    public String summarizeWithMedia(String content, String mediaUrl, String mediaType) {
        if (mediaUrl == null || mediaUrl.trim().isEmpty()) {
            return summarize(content);
        }

        // Try Groq first
        try {
            String prompt;
            if ("pdf".equalsIgnoreCase(mediaType)) {
                prompt = "You are analyzing a PDF document AND separate text content.\n\n" +
                        "CRITICAL INSTRUCTIONS:\n" +
                        "1. First paragraph: Describe what you see in the PDF document (any text, images, structure, formatting, dates, logos, information visible)\n" +
                        "2. Add TWO blank lines\n" +
                        "3. Second paragraph: Provide a summary of the user's text content below\n" +
                        "4. Use plain text only - NO markdown formatting (* # - _ etc.)\n" +
                        "5. Each paragraph should be comprehensive and detailed\n\n" +
                        "User's text content:\n" + content;
            } else if ("video".equalsIgnoreCase(mediaType)) {
                prompt = "You are analyzing a video thumbnail AND separate text content.\n\n" +
                        "CRITICAL INSTRUCTIONS:\n" +
                        "1. First paragraph: Describe what you see in the video thumbnail (scene, people, objects, text overlays, colors, composition)\n" +
                        "2. Add TWO blank lines\n" +
                        "3. Second paragraph: Provide a summary of the user's text content below\n" +
                        "4. Use plain text only - NO markdown formatting (* # - _ etc.)\n" +
                        "5. Each paragraph should be comprehensive and detailed\n\n" +
                        "User's text content:\n" + content;
            } else {
                prompt = "You are analyzing an image AND separate text content.\n\n" +
                        "CRITICAL INSTRUCTIONS:\n" +
                        "1. First paragraph: Describe what you see in the image with all details (objects, people, text, colors, composition, any visible information)\n" +
                        "2. Add TWO blank lines\n" +
                        "3. Second paragraph: Provide a summary of the user's text content below\n" +
                        "4. Use plain text only - NO markdown formatting (* # - _ etc.)\n" +
                        "5. Each paragraph should be comprehensive and detailed\n\n" +
                        "User's text content:\n" + content;
            }
            
            return callGroqVisionAPI(prompt, mediaUrl);
            
        } catch (Exception groqError) {
            System.err.println("\n⚠️ Groq Vision failed, trying Gemini as fallback...");
            System.err.println("   Groq error: " + groqError.getMessage());
            
            // Try Gemini as fallback
            try {
                String imageAnalysis = analyzeImageWithGemini(mediaUrl);
                String textSummary = summarize(content);
                
                // Ensure proper separation between image and text summaries
                return imageAnalysis.trim() + "\n\n" + textSummary.trim();
            } catch (Exception geminiError) {
                System.err.println("   Gemini also failed: " + geminiError.getMessage());
                System.err.println("   Falling back to text-only\n");
                
                return summarize(content);
            }
        }
    }

    /**
     * Download image from URL and convert to base64
     */
    private String downloadImageAsBase64(String imageUrl) throws IOException {
        try {
            URL url = new URL(imageUrl);
            byte[] imageBytes = url.openStream().readAllBytes();
            return Base64.getEncoder().encodeToString(imageBytes);
        } catch (IOException e) {
            System.err.println("❌ Failed to download image from: " + imageUrl);
            throw e;
        }
    }
    
    /**
     * Get MIME type from image URL
     */
    private String getMimeTypeFromUrl(String imageUrl) {
        String lowerUrl = imageUrl.toLowerCase();
        if (lowerUrl.contains(".png")) return "image/png";
        if (lowerUrl.contains(".gif")) return "image/gif";
        if (lowerUrl.contains(".webp")) return "image/webp";
        return "image/jpeg"; // default
    }

    /**
     * Analyze image using Gemini with base64 encoding
     * Uses VISION models (support multi-modal: images, PDFs, video)
     */
    private String analyzeImageWithGemini(String mediaUrl) {
        if (geminiApiKey == null || geminiApiKey.isEmpty()) {
            throw new RuntimeException("Gemini API key not configured");
        }

        // VISION models only (Flash models support images/PDFs/video)
        String[] models = {
            geminiVisionPrimary,    // gemini-3.6-flash (5 RPM, 20 RPD)
            geminiVisionFallback1,  // gemini-3.5-flash (5 RPM, 20 RPD)
            geminiVisionFallback2,  // gemini-3-flash (5 RPM, 20 RPD)
            geminiVisionFallback3   // gemini-2.5-flash (5 RPM, 20 RPD)
        };

        Exception lastError = null;
        
        // Try each model until one succeeds
        for (int i = 0; i < models.length; i++) {
            String model = models[i];
            try {
                System.out.println("\n=== Gemini Vision API Debug ===");
                System.out.println("Trying model " + (i + 1) + "/" + models.length + ": " + model);
                System.out.println("Downloading image from: " + mediaUrl);
                
                // Download and encode image
                String base64Image = downloadImageAsBase64(mediaUrl);
                String mimeType = getMimeTypeFromUrl(mediaUrl);
                
                System.out.println("Image downloaded successfully, size: " + base64Image.length() + " chars (base64)");
                System.out.println("MIME type: " + mimeType);
                
                String url = "https://generativelanguage.googleapis.com/v1/models/" + model + ":generateContent?key=" + geminiApiKey;

                Map<String, Object> requestBody = new HashMap<>();
                
                List<Map<String, Object>> contents = new ArrayList<>();
                Map<String, Object> content = new HashMap<>();
                
                List<Map<String, Object>> parts = new ArrayList<>();
                
                // Text part - asking about the image with explicit NO MARKDOWN instruction
                Map<String, Object> textPart = new HashMap<>();
                textPart.put("text", "Describe what you see in this image in detail. Include any text visible in the image, objects, people, dates, seals, stamps, and any other relevant information. Be specific and thorough. IMPORTANT: Use plain text only. Do NOT use markdown formatting such as asterisks (*), hashtags (#), dashes (---), or any other markdown symbols. Write in clear, simple paragraphs without special formatting.");
                parts.add(textPart);
                
                // Image part with inline base64 data
                Map<String, Object> imagePart = new HashMap<>();
                Map<String, String> inlineData = new HashMap<>();
                inlineData.put("mimeType", mimeType);
                inlineData.put("data", base64Image);
                imagePart.put("inlineData", inlineData);
                parts.add(imagePart);
                
                content.put("parts", parts);
                contents.add(content);
                requestBody.put("contents", contents);

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);

                HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
                
                System.out.println("Sending request to Gemini...");

                ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

                if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                    String result = parseGeminiResponse(response.getBody());
                    System.out.println("✅ Gemini Vision Success with model: " + model);
                    System.out.println("   Response length: " + result.length() + " chars");
                    System.out.println("===============================\n");
                    return result;
                }

            } catch (IOException e) {
                System.err.println("❌ Failed to download image: " + e.getMessage());
                lastError = new RuntimeException("Cannot download image from URL: " + e.getMessage());
                break; // Don't retry other models if image download fails
                
            } catch (org.springframework.web.client.HttpClientErrorException e) {
                String responseBody = e.getResponseBodyAsString();
                System.err.println("❌ Gemini Vision API error with model " + model + ": " + e.getStatusCode());
                System.err.println("   Response: " + responseBody);
                
                // Check if it's a quota/rate limit error - try next model
                if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS || 
                    responseBody.contains("quota") || 
                    responseBody.contains("rate_limit") ||
                    responseBody.contains("RESOURCE_EXHAUSTED")) {
                    
                    System.err.println("   Rate limit reached, trying next model...");
                    lastError = e;
                    continue; // Try next model
                }
                
                // Check if it's an auth error - don't retry
                if (e.getStatusCode() == HttpStatus.FORBIDDEN || 
                    e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                    System.err.println("===============================\n");
                    throw new RuntimeException("Gemini API key invalid or expired");
                }
                
                // For other errors, try next model
                lastError = e;
                continue;
                
            } catch (Exception e) {
                System.err.println("❌ Unexpected error with model " + model + ": " + e.getMessage());
                lastError = e;
                continue; // Try next model
            }
        }

        // All models failed
        System.err.println("❌ All Gemini models exhausted");
        System.err.println("===============================\n");
        
        if (lastError != null) {
            if (lastError instanceof org.springframework.web.client.HttpClientErrorException) {
                org.springframework.web.client.HttpClientErrorException httpError = 
                    (org.springframework.web.client.HttpClientErrorException) lastError;
                if (httpError.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                    throw new RuntimeException("All Gemini models quota exceeded. Please try again later.");
                }
            }
            throw new RuntimeException("Gemini image analysis failed: " + lastError.getMessage());
        }
        
        throw new RuntimeException("Unable to analyze image with Gemini");
    }

    /**
     * Chat/Answer questions about content (uses Groq)
     */
    public String chat(String content, String question) {
        if (content == null || content.trim().isEmpty()) {
            return "No content available to answer questions about.";
        }

        if (question == null || question.trim().isEmpty()) {
            return "Please ask a question.";
        }

        String prompt = "Based on this content:\n\n" + content + "\n\nAnswer this question: " + question;

        return callGroqAPI(prompt);
    }

    /**
     * Chat with media context (uses Groq vision model)
     */
    public String chatWithMedia(String content, String question, String mediaUrl) {
        if (mediaUrl == null || mediaUrl.trim().isEmpty()) {
            return chat(content, question);
        }

        // Try Groq first
        try {
            String prompt = "IMPORTANT: This paste contains BOTH an image/document AND text content.\n\n" +
                           "IMAGE/DOCUMENT: You are viewing an image or document (like a PDF, photo, screenshot, etc.). " +
                           "Please carefully examine what is shown in this image/document.\n\n" +
                           "TEXT CONTENT:\n" + content + "\n\n" +
                           "USER QUESTION: " + question + "\n\n" +
                           "INSTRUCTIONS: Answer the question based on BOTH the image/document you can see AND the text content provided. " +
                           "If the question is about what's in the image, describe what you see. " +
                           "If the question is about the content in general, combine information from both sources. " +
                           "CRITICAL: Use plain text only. Do NOT use markdown formatting such as asterisks (*), hashtags (#), dashes (---), underscores (_), or any other markdown symbols. Write in clear, simple paragraphs.";
            
            return callGroqVisionAPI(prompt, mediaUrl);
            
        } catch (Exception groqError) {
            System.err.println("\n⚠️ Groq Vision failed, trying Gemini as fallback...");
            System.err.println("   Groq error: " + groqError.getMessage());
            System.err.println("   Question: " + question);
            
            // Try Gemini as fallback
            try {
                String imageAnalysis = analyzeImageWithGemini(mediaUrl);
                String textAnswer = chat(content, question);
                return imageAnalysis + "\n\n" + textAnswer;
            } catch (Exception geminiError) {
                System.err.println("   Gemini also failed: " + geminiError.getMessage());
                System.err.println("   Falling back to text-only\n");
                
                String textAnswer = chat(content, question);
                return textAnswer + "\n\n⚠️ Note: This paste contains an image/document, but vision analysis is currently unavailable.";
            }
        }
    }

    /**
     * Translate content (uses Groq)
     */
    public String translate(String content, String targetLanguage) {
        if (content == null || content.trim().isEmpty()) {
            return "No content to translate.";
        }

        String prompt = "Translate the following content to " + targetLanguage + ":\n\n" + content;

        return callGroqAPI(prompt);
    }

    /**
     * Detect content type (uses Groq for speed)
     */
    public String detectContentType(String content) {
        if (content == null || content.trim().isEmpty()) {
            return "unknown";
        }

        String prompt = "Classify this content into ONE of these categories: code, recipe, notes, article, poem, list, other. " +
                "Only return the category name:\n\n" + content.substring(0, Math.min(content.length(), 500));

        String result = callGroqAPI(prompt);
        return result.toLowerCase().trim();
    }

    /**
     * Call Groq API (fast text processing)
     */
    private String callGroqAPI(String prompt) {
        if (groqApiKey == null || groqApiKey.isEmpty()) {
            throw new RuntimeException("AI service not configured. Please contact support.");
        }

        try {
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", groqTextModel);
            
            Map<String, String> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", prompt);
            requestBody.put("messages", List.of(message));
            
            requestBody.put("temperature", 0.7);
            requestBody.put("max_tokens", 1024);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(groqApiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.exchange(GROQ_API_URL, HttpMethod.POST, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map<String, Object> message1 = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message1.get("content");
                }
            }

            throw new RuntimeException("Unable to generate AI response");

        } catch (org.springframework.web.client.HttpClientErrorException e) {
            String responseBody = e.getResponseBodyAsString();
            
            // Parse error message from Groq API response
            try {
                // Check if the response contains rate_limit_exceeded or tokens error
                if (responseBody.contains("rate_limit_exceeded") || 
                    responseBody.contains("tokens per minute") ||
                    responseBody.contains("Request too large for model")) {
                    throw new RuntimeException("Your content is too large for AI processing. Please try with shorter content.");
                }
            } catch (RuntimeException re) {
                throw re; // Re-throw our custom message
            } catch (Exception parseError) {
                // Continue to other checks if JSON parsing fails
            }
            
            // Check HTTP status codes
            if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS || 
                e.getStatusCode() == HttpStatus.PAYMENT_REQUIRED) {
                throw new RuntimeException("AI service limit reached. Please try again later.");
            }
            
            if (e.getStatusCode() == HttpStatus.PAYLOAD_TOO_LARGE) {
                throw new RuntimeException("Your content is too large. Please try with shorter content.");
            }
            
            // Generic error
            throw new RuntimeException("AI service error. Please try again.");
        } catch (org.springframework.web.client.ResourceAccessException e) {
            throw new RuntimeException("Cannot connect to AI service. Please try again later.");
        } catch (RuntimeException e) {
            // Re-throw our custom RuntimeExceptions
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("AI service temporarily unavailable");
        }
    }

    /**
     * Call Groq Vision API (for image analysis with vision model)
     */
    private String callGroqVisionAPI(String prompt, String imageUrl) {
        if (groqApiKey == null || groqApiKey.isEmpty()) {
            throw new RuntimeException("AI service not configured. Please contact support.");
        }

        try {
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", groqVisionModel);
            
            // Create message with text and image content
            Map<String, Object> message = new HashMap<>();
            message.put("role", "user");
            
            // Content is an array with text and image_url parts
            List<Map<String, Object>> contentParts = new ArrayList<>();
            
            // Text part - MUST come first
            Map<String, Object> textPart = new HashMap<>();
            textPart.put("type", "text");
            textPart.put("text", prompt);
            contentParts.add(textPart);
            
            // Image part - Groq vision requires specific format
            Map<String, Object> imagePart = new HashMap<>();
            imagePart.put("type", "image_url");
            Map<String, Object> imageUrlObj = new HashMap<>();
            
            // Ensure URL is properly formatted - Groq vision needs the full URL
            String processedUrl = imageUrl;
            if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
                processedUrl = "https://" + imageUrl;
            }
            
            imageUrlObj.put("url", processedUrl);
            imagePart.put("image_url", imageUrlObj);
            contentParts.add(imagePart);
            
            message.put("content", contentParts);
            requestBody.put("messages", List.of(message));
            
            requestBody.put("temperature", 0.7);
            requestBody.put("max_tokens", 2048); // Increased for better responses

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(groqApiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
            System.out.println("\n=== Groq Vision API Debug ===");
            System.out.println("Model: " + groqVisionModel);
            System.out.println("Image URL: " + processedUrl);
            System.out.println("Prompt length: " + prompt.length() + " chars");
            System.out.println("Full prompt: " + (prompt.length() > 200 ? prompt.substring(0, 200) + "..." : prompt));
            System.out.println("============================\n");

            ResponseEntity<Map> response = restTemplate.exchange(GROQ_API_URL, HttpMethod.POST, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map<String, Object> message1 = (Map<String, Object>) choices.get(0).get("message");
                    String result = (String) message1.get("content");
                    System.out.println("\n✅ Vision API Success! Response length: " + result.length() + " chars\n");
                    return result;
                }
            }

            throw new RuntimeException("Unable to generate AI response");

        } catch (org.springframework.web.client.HttpClientErrorException e) {
            String responseBody = e.getResponseBodyAsString();
            System.err.println("\n❌ Groq Vision API HTTP Error: " + e.getStatusCode());
            System.err.println("Response body: " + responseBody);
            System.err.println("Image URL: " + imageUrl + "\n");
            
            // Check if vision model is not available or not supported
            if (responseBody.contains("model") && 
                (responseBody.contains("not found") || 
                 responseBody.contains("not available") || 
                 responseBody.contains("does not support") ||
                 responseBody.contains("multimodal"))) {
                throw new RuntimeException("Vision model not available. The AI cannot analyze images at this time.");
            }
            
            // Check if image URL is invalid or not accessible
            if (responseBody.contains("image") && 
                (responseBody.contains("invalid") || 
                 responseBody.contains("not found") || 
                 responseBody.contains("cannot access") ||
                 responseBody.contains("failed to fetch") ||
                 responseBody.contains("unsupported") ||
                 responseBody.contains("download"))) {
                throw new RuntimeException("Cannot access the image. The image may be private or the URL may be invalid.");
            }
            
            // Parse error message from Groq API response
            try {
                // Check if the response contains rate_limit_exceeded or tokens error
                if (responseBody.contains("rate_limit_exceeded") || 
                    responseBody.contains("tokens per minute") ||
                    responseBody.contains("Request too large for model")) {
                    throw new RuntimeException("Content is too large for AI processing. Try with shorter content or smaller images.");
                }
            } catch (RuntimeException re) {
                throw re; // Re-throw our custom message
            } catch (Exception parseError) {
                // Continue to other checks if JSON parsing fails
            }
            
            // Check HTTP status codes
            if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS || 
                e.getStatusCode() == HttpStatus.PAYMENT_REQUIRED) {
                throw new RuntimeException("AI service limit reached. Please try again in a few minutes.");
            }
            
            if (e.getStatusCode() == HttpStatus.PAYLOAD_TOO_LARGE) {
                throw new RuntimeException("Content or image is too large. Try with shorter content or smaller images.");
            }
            
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED || 
                e.getStatusCode() == HttpStatus.FORBIDDEN) {
                throw new RuntimeException("AI service authentication failed. Please contact support.");
            }
            
            // Generic error - this will trigger fallback
            throw new RuntimeException("Vision processing failed: " + e.getStatusCode() + ". Falling back to text-only analysis.");
            
        } catch (org.springframework.web.client.HttpServerErrorException e) {
            String responseBody = e.getResponseBodyAsString();
            System.err.println("\n❌ Groq Vision API Server Error: " + e.getStatusCode());
            System.err.println("Response body: " + responseBody);
            System.err.println("This is likely a temporary issue with the Groq API service.\n");
            throw new RuntimeException("AI service is temporarily unavailable. Please try again in a few moments.");
            
        } catch (org.springframework.web.client.ResourceAccessException e) {
            System.err.println("\n❌ Cannot connect to Groq API: " + e.getMessage() + "\n");
            throw new RuntimeException("Cannot connect to AI service. Please check your internet connection and try again.");
            
        } catch (RuntimeException e) {
            // Re-throw our custom RuntimeExceptions
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("\n❌ Vision API unexpected error: " + e.getClass().getName() + " - " + e.getMessage() + "\n");
            throw new RuntimeException("Vision processing encountered an unexpected error. Falling back to text-only analysis.");
        }
    }

    /**
     * Call Gemini API (text-only with multi-model fallback)
     * Uses TEXT models (best limits for text processing)
     */
    private String callGeminiAPI(String prompt) {
        if (geminiApiKey == null || geminiApiKey.isEmpty()) {
            return "AI service not configured. Please add GEMINI_API_KEY to environment variables.";
        }

        // TEXT models (better limits for text-only processing)
        String[] models = {
            geminiTextPrimary,    // gemini-3.5-flash-lite (15 RPM, 500 RPD)
            geminiTextFallback1,  // gemini-3.1-flash-lite (15 RPM, 500 RPD)
            geminiTextFallback2,  // gemini-3.6-flash (5 RPM, 20 RPD)
            geminiTextFallback3   // gemini-2.5-flash-lite (10 RPM, 20 RPD)
        };

        for (int i = 0; i < models.length; i++) {
            String model = models[i];
            try {
                String url = "https://generativelanguage.googleapis.com/v1/models/" + model + ":generateContent?key=" + geminiApiKey;

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

            } catch (org.springframework.web.client.HttpClientErrorException e) {
                String responseBody = e.getResponseBodyAsString();
                
                // Check for rate limit - try next model
                if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS ||
                    responseBody.contains("rate_limit") ||
                    responseBody.contains("quota") ||
                    responseBody.contains("RESOURCE_EXHAUSTED")) {
                    System.err.println("Gemini model " + model + " quota reached, trying next model...");
                    continue;
                }
                
                // Check for authentication/authorization errors - don't retry
                if (e.getStatusCode() == HttpStatus.FORBIDDEN || 
                    e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                    System.err.println("Gemini API authentication error: " + responseBody);
                    return "AI service unavailable (Invalid API key)";
                }
                
                // For other errors, try next model
                continue;
                
            } catch (Exception e) {
                // Try next model
                continue;
            }
        }
        
        // All models failed
        return "AI service limit reached. Please try again later.";
    }

    /**
     * Parse Gemini response
     */
    private String parseGeminiResponse(Map<String, Object> responseBody) {
        try {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> candidate = candidates.get(0);
                Map<String, Object> content = (Map<String, Object>) candidate.get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                if (parts != null && !parts.isEmpty()) {
                    return (String) parts.get(0).get("text");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Unable to parse response";
    }
}

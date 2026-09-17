package com.zyren.backend.ai;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AIServiceFallbackTest {

    @Autowired
    private AIService aiService;

    @Test
    void testEmptyContentTitle() {
        String title = aiService.generateTitle("");
        assertEquals("Untitled Paste", title);

        String nullTitle = aiService.generateTitle(null);
        assertEquals("Untitled Paste", nullTitle);
    }

    @Test
    void testEmptyContentSummarize() {
        String summary = aiService.summarize("");
        assertEquals("No content to summarize.", summary);

        String nullSummary = aiService.summarize(null);
        assertEquals("No content to summarize.", nullSummary);
    }

    @Test
    void testDetectContentTypeEmpty() {
        String type = aiService.detectContentType("");
        assertEquals("unknown", type);

        String nullType = aiService.detectContentType(null);
        assertEquals("unknown", nullType);
    }

    @Test
    void testChatEmpty() {
        String answer = aiService.chat("", "What is this?");
        assertEquals("No content available to answer questions about.", answer);

        String noQuestion = aiService.chat("Some code content", "");
        assertEquals("Please ask a question.", noQuestion);
    }

    @Test
    void testModelResolutionLists() throws Exception {
        java.lang.reflect.Method groqTextM = AIService.class.getDeclaredMethod("getGroqTextModels");
        groqTextM.setAccessible(true);
        @SuppressWarnings("unchecked")
        java.util.List<String> groqTextModels = (java.util.List<String>) groqTextM.invoke(aiService);
        assertTrue(groqTextModels.contains("groq/compound-mini"));
        assertTrue(groqTextModels.contains("openai/gpt-oss-120b"));
        assertTrue(groqTextModels.contains("openai/gpt-oss-20b"));
        assertTrue(groqTextModels.contains("qwen/qwen3.8-27b"));
        assertTrue(groqTextModels.contains("groq/compound"));

        java.lang.reflect.Method groqVisionM = AIService.class.getDeclaredMethod("getGroqVisionModels");
        groqVisionM.setAccessible(true);
        @SuppressWarnings("unchecked")
        java.util.List<String> groqVisionModels = (java.util.List<String>) groqVisionM.invoke(aiService);
        assertTrue(groqVisionModels.contains("qwen/qwen3.8-27b"));

        java.lang.reflect.Method geminiTextM = AIService.class.getDeclaredMethod("getGeminiTextModels");
        geminiTextM.setAccessible(true);
        @SuppressWarnings("unchecked")
        java.util.List<String> geminiTextModels = (java.util.List<String>) geminiTextM.invoke(aiService);
        assertTrue(geminiTextModels.contains("gemini-3.6-flash"));
        assertTrue(geminiTextModels.contains("gemini-flash-latest"));

        java.lang.reflect.Method geminiVisionM = AIService.class.getDeclaredMethod("getGeminiVisionModels");
        geminiVisionM.setAccessible(true);
        @SuppressWarnings("unchecked")
        java.util.List<String> geminiVisionModels = (java.util.List<String>) geminiVisionM.invoke(aiService);
        assertTrue(geminiVisionModels.contains("gemini-3.6-flash"));
        assertTrue(geminiVisionModels.contains("gemini-flash-latest"));
    }
}

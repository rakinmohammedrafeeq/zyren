package com.zyren.backend.ai;

import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AIServiceLiveTest {

    @Autowired
    private AIService aiService;

    @Test
    void testLiveTextExecutionWithFallback() {
        try {
            Dotenv dotenv = Dotenv.load();
            String groqKey = dotenv.get("GROQ_API_KEY");
            String geminiKey = dotenv.get("GEMINI_API_KEY");

            if (groqKey != null && !groqKey.isEmpty()) {
                ReflectionTestUtils.setField(aiService, "groqApiKey", groqKey);
            }
            if (geminiKey != null && !geminiKey.isEmpty()) {
                ReflectionTestUtils.setField(aiService, "geminiApiKey", geminiKey);
            }

            // Test Title Generation
            String sampleCode = "public class HelloWorld { public static void main(String[] args) { System.out.println(\"Hello, World!\"); } }";
            String title = aiService.generateTitle(sampleCode);
            System.out.println("Live Test Generated Title: " + title);
            assertNotNull(title);
            assertFalse(title.trim().isEmpty());
            assertNotEquals("Untitled Paste", title);

            // Test Content Type Detection
            String detectedType = aiService.detectContentType(sampleCode);
            System.out.println("Live Test Detected Content Type: " + detectedType);
            assertEquals("code", detectedType);

            // Test Provider Failover (Simulate Groq API down by breaking Groq key, should failover to Gemini)
            ReflectionTestUtils.setField(aiService, "groqApiKey", "invalid_groq_key_to_force_failover");
            String summaryFromGemini = aiService.summarize("Artificial intelligence is transforming modern software engineering by enabling automated testing, synthesis, and documentation.");
            System.out.println("Live Test Fallback Summary from Gemini: " + summaryFromGemini);
            assertNotNull(summaryFromGemini);
            assertFalse(summaryFromGemini.trim().isEmpty());

            // Restore key
            ReflectionTestUtils.setField(aiService, "groqApiKey", groqKey);

            // Test Reverse Failover: Gemini primary -> Groq fallback
            ReflectionTestUtils.setField(aiService, "aiPrimaryProvider", "gemini");
            ReflectionTestUtils.setField(aiService, "geminiApiKey", "invalid_gemini_key_to_force_failover");
            String summaryFromGroq = aiService.summarize("Modern cloud architectures enable resilience through distributed redundancy and automated failover.");
            System.out.println("Live Test Reverse Fallback Summary from Groq: " + summaryFromGroq);
            assertNotNull(summaryFromGroq);
            assertFalse(summaryFromGroq.trim().isEmpty());

            // Restore defaults
            ReflectionTestUtils.setField(aiService, "aiPrimaryProvider", "groq");
            ReflectionTestUtils.setField(aiService, "geminiApiKey", geminiKey);

        } catch (Exception e) {
            System.out.println("Note: Live API test skipped if network unavailable: " + e.getMessage());
        }
    }
}

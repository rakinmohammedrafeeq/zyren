package com.zyren.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ZyrenApplication {

    public static void main(String[] args) {

        try {

            Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

            // Set all dotenv entries into System properties
            dotenv.entries().forEach(entry -> {
                if (entry.getValue() != null && !entry.getValue().isEmpty()) {
                    System.setProperty(entry.getKey(), entry.getValue());
                }
            });

            // Map DB credentials (supporting both SPRING_DATASOURCE_* and DB_* aliases)
            setSystemPropIfNotNull("spring.datasource.url", resolveVal(dotenv, "SPRING_DATASOURCE_URL", "DB_URL"));
            setSystemPropIfNotNull("spring.datasource.username", resolveVal(dotenv, "SPRING_DATASOURCE_USERNAME", "DB_USERNAME"));
            setSystemPropIfNotNull("spring.datasource.password", resolveVal(dotenv, "SPRING_DATASOURCE_PASSWORD", "DB_PASSWORD"));

            setSystemPropIfNotNull("jwt.secret", dotenv.get("JWT_SECRET"));
            setSystemPropIfNotNull("jwt.expiration", dotenv.get("JWT_EXPIRATION"));

            setSystemPropIfNotNull("zyren.admin.email.1", dotenv.get("ZYREN_ADMIN_EMAIL_1"));
            setSystemPropIfNotNull("zyren.admin.password.1", dotenv.get("ZYREN_ADMIN_PASSWORD_1"));
            setSystemPropIfNotNull("zyren.admin.email.2", dotenv.get("ZYREN_ADMIN_EMAIL_2"));
            setSystemPropIfNotNull("zyren.admin.password.2", dotenv.get("ZYREN_ADMIN_PASSWORD_2"));

            setSystemPropIfNotNull("zyren.mail.to", dotenv.get("MAIL_TO"));
            setSystemPropIfNotNull("resend.api.key", dotenv.get("RESEND_API_KEY"));
            setSystemPropIfNotNull("RESET_BASE_URL", dotenv.get("RESET_BASE_URL"));

            setSystemPropIfNotNull("cloudinary.cloud-name", dotenv.get("CLOUDINARY_CLOUD_NAME"));
            setSystemPropIfNotNull("cloudinary.api-key", dotenv.get("CLOUDINARY_API_KEY"));
            setSystemPropIfNotNull("cloudinary.api-secret", dotenv.get("CLOUDINARY_API_SECRET"));

            setSystemPropIfNotNull("gemini.api.key", dotenv.get("GEMINI_API_KEY"));
            setSystemPropIfNotNull("groq.api.key", dotenv.get("GROQ_API_KEY"));

            setSystemPropIfNotNull("spring.security.oauth2.client.registration.google.client-id",
                    dotenv.get("GOOGLE_CLIENT_ID"));
            setSystemPropIfNotNull("spring.security.oauth2.client.registration.google.client-secret",
                    dotenv.get("GOOGLE_CLIENT_SECRET"));

            setSystemPropIfNotNull("app.frontend.url", resolveVal(dotenv, "FRONTEND_URL", "APP_BASE_URL"));

        } catch (Exception e) {
            System.err.println("Note: Dotenv initialization caught: " + e.getMessage());
        }

        SpringApplication.run(ZyrenApplication.class, args);

    }

    private static String resolveVal(Dotenv dotenv, String primary, String fallback) {
        String val = dotenv.get(primary);
        if (val != null && !val.trim().isEmpty()) return val;
        val = dotenv.get(fallback);
        if (val != null && !val.trim().isEmpty()) return val;
        val = System.getenv(primary);
        if (val != null && !val.trim().isEmpty()) return val;
        return System.getenv(fallback);
    }

    private static void setSystemPropIfNotNull(String key, String value) {
        if (key != null && value != null && !value.trim().isEmpty()) {
            System.setProperty(key, value.trim());
        }
    }
}
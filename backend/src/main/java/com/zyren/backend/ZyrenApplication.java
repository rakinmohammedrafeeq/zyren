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

            Dotenv dotenv = Dotenv.load();

            System.setProperty("spring.datasource.url", dotenv.get("SPRING_DATASOURCE_URL"));
            System.setProperty("spring.datasource.username", dotenv.get("SPRING_DATASOURCE_USERNAME"));
            System.setProperty("spring.datasource.password", dotenv.get("SPRING_DATASOURCE_PASSWORD"));

            System.setProperty("jwt.secret", dotenv.get("JWT_SECRET"));
            System.setProperty("jwt.expiration", dotenv.get("JWT_EXPIRATION"));

            System.setProperty("zyren.admin.email.1", dotenv.get("ZYREN_ADMIN_EMAIL_1"));
            System.setProperty("zyren.admin.password.1", dotenv.get("ZYREN_ADMIN_PASSWORD_1"));
            System.setProperty("zyren.admin.email.2", dotenv.get("ZYREN_ADMIN_EMAIL_2"));
            System.setProperty("zyren.admin.password.2", dotenv.get("ZYREN_ADMIN_PASSWORD_2"));

//            System.setProperty("zyren.mail.from", dotenv.get("MAIL_FROM"));
            System.setProperty("zyren.mail.to", dotenv.get("MAIL_TO"));

            System.setProperty("resend.api.key", dotenv.get("RESEND_API_KEY"));

//            System.setProperty("spring.mail.host", dotenv.get("SPRING_MAIL_HOST"));
//            System.setProperty("spring.mail.port", dotenv.get("SPRING_MAIL_PORT"));
//            System.setProperty("spring.mail.username", dotenv.get("MAIL_USERNAME"));
//            System.setProperty("spring.mail.password", dotenv.get("MAIL_PASSWORD"));

            System.setProperty("RESET_BASE_URL", dotenv.get("RESET_BASE_URL"));

            System.setProperty("cloudinary.cloud-name", dotenv.get("CLOUDINARY_CLOUD_NAME"));
            System.setProperty("cloudinary.api-key", dotenv.get("CLOUDINARY_API_KEY"));
            System.setProperty("cloudinary.api-secret", dotenv.get("CLOUDINARY_API_SECRET"));

            System.setProperty("gemini.api.key", dotenv.get("GEMINI_API_KEY"));
            System.setProperty("groq.api.key", dotenv.get("GROQ_API_KEY"));

            System.setProperty("spring.security.oauth2.client.registration.google.client-id",
                    dotenv.get("GOOGLE_CLIENT_ID"));
            System.setProperty("spring.security.oauth2.client.registration.google.client-secret",
                    dotenv.get("GOOGLE_CLIENT_SECRET"));

            System.setProperty("app.frontend.url", dotenv.get("FRONTEND_URL"));

        }

        catch (Exception ignored) {}

        SpringApplication.run(ZyrenApplication.class, args);

    }
}
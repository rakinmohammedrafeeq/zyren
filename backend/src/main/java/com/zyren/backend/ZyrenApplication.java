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

            System.setProperty("zyren.admin.email", dotenv.get("ZYREN_ADMIN_EMAIL"));
            System.setProperty("zyren.admin.password", dotenv.get("ZYREN_ADMIN_PASSWORD"));

            System.setProperty("spring.mail.host", dotenv.get("SPRING_MAIL_HOST"));
            System.setProperty("spring.mail.port", dotenv.get("SPRING_MAIL_PORT"));
            System.setProperty("spring.mail.username", dotenv.get("MAIL_USERNAME"));
            System.setProperty("spring.mail.password", dotenv.get("MAIL_PASSWORD"));

            System.setProperty("RESET_BASE_URL", dotenv.get("RESET_BASE_URL"));

        }

        catch (Exception ignored) {}

        SpringApplication.run(ZyrenApplication.class, args);

    }
}
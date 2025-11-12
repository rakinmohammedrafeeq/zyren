package com.zyren.backend.config;

import com.zyren.backend.user.Role;
import com.zyren.backend.user.UserEntity;
import com.zyren.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${zyren.admin.email}")
    private String adminEmail;

    @Value("${zyren.admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args) {

        if (adminEmail == null || adminEmail.isBlank()) {
            System.out.println("No ZYREN_ADMIN_EMAIL set. Skipping admin creation.");
            return;
        }

        if (userRepository.findByEmail(adminEmail).isEmpty()) {

            UserEntity admin = UserEntity.builder()
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .role(Role.ADMIN)
                    .build();

            userRepository.save(admin);

        }
    }
}
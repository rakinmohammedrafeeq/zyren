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

    @Value("${zyren.admin.email.1:}")
    private String adminEmail1;

    @Value("${zyren.admin.password.1:}")
    private String adminPassword1;

    @Value("${zyren.admin.email.2:}")
    private String adminEmail2;

    @Value("${zyren.admin.password.2:}")
    private String adminPassword2;

    @Override
    public void run(String... args) {
        createAdminIfNotExists(adminEmail1, adminPassword1, "Admin 1");
        createAdminIfNotExists(adminEmail2, adminPassword2, "Admin 2");
    }

    private void createAdminIfNotExists(String email, String password, String adminName) {
        if (email == null || email.isBlank()) {
            System.out.println(String.format("No %s email set. Skipping %s creation.", adminName, adminName));
            return;
        }

        userRepository.findByEmail(email).ifPresentOrElse(
                existing -> {
                    if (existing.getRole() != Role.ADMIN) {
                        existing.setRole(Role.ADMIN);
                        userRepository.save(existing);
                        System.out.println(String.format("%s (%s) role updated to ADMIN.", adminName, email));
                    } else {
                        System.out.println(String.format("%s already exists with email: %s", adminName, email));
                    }
                },
                () -> {
                    UserEntity admin = UserEntity.builder()
                            .email(email)
                            .password(passwordEncoder.encode(password))
                            .role(Role.ADMIN)
                            .provider("LOCAL")
                            .displayName(adminName)
                            .build();

                    userRepository.save(admin);
                    System.out.println(String.format("%s created successfully with email: %s", adminName, email));
                }
        );
    }
}
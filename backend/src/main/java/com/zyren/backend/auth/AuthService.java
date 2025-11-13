package com.zyren.backend.auth;

import com.zyren.backend.config.JwtUtil;
import com.zyren.backend.mail.MailService;
import com.zyren.backend.user.UserEntity;
import com.zyren.backend.user.UserRepository;
import com.zyren.backend.user.Role;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
//    private final JavaMailSender mailSender;
    private final PasswordResetTokenRepository tokenRepo;
    private final MailService mailService;

    @Value("${RESET_BASE_URL}")
    private String resetBaseUrl;

//    @Value("${zyren.mail.from}")
//    private String mailFrom;

    public String register(String email, String password) {
        if (userRepository.findByEmail(email).isPresent())
            throw new RuntimeException("User already exists");

        UserEntity user = UserEntity.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        return "User registered successfully!";
    }

    public String login(String email, String password) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtil.generateToken(email);
    }

    public void requestPasswordReset(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Check your email for password reset instructions."));

        String token = UUID.randomUUID().toString();

        PasswordResetTokenEntity entity = PasswordResetTokenEntity.builder()
                .token(token)
                .user(user)
                .expiresAt(Instant.now().plus(30, ChronoUnit.MINUTES))
                .used(false)
                .build();

        tokenRepo.save(entity);

        String link = resetBaseUrl + "?token=" + token;

//        SimpleMailMessage msg = new SimpleMailMessage();
//
//        msg.setFrom(mailFrom);
//        msg.setTo(user.getEmail());
//        msg.setSubject("Reset your Zyren password");
//        msg.setText(
//                "We received a request to reset your password.\n\n" +
//                        "Click the link below to set a new password (valid for 30 minutes):\n" +
//                        link + "\n\n" +
//                        "If you didn't request this, you can ignore this email."
//        );
//
//        mailSender.send(msg);

        String html = """
                <h3>Password Reset Requested</h3>
                <p>Click the button below to reset your password:</p>
                <a href="%s" style="display:inline-block;padding:10px 20px;
                background:#4CAF50;color:white;text-decoration:none;border-radius:5px;">
                Reset Password
                </a>
                <p>This link is valid for 30 minutes.</p>
                """.formatted(link);

        mailService.sendMail(
                user.getEmail(),
                "Reset your Zyren password",
                html
        );

    }

    public void resetPassword(String token, String newPassword) {

        PasswordResetTokenEntity prt = tokenRepo
                .findByTokenAndUsedFalseAndExpiresAtAfter(token, Instant.now())
                .orElseThrow(() -> new RuntimeException("Invalid or expired reset token"));

        UserEntity user = prt.getUser();

        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);

        prt.setUsed(true);

        tokenRepo.save(prt);

        //            System.out.println("Admin created");

    }

//        else {
//            System.out.println("Admin already exists");
//        }

}
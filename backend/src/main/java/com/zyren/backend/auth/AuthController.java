package com.zyren.backend.auth;

import com.zyren.backend.user.UserEntity;
import com.zyren.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.zyren.backend.auth.PasswordValidator.isValid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam String email,
                                           @RequestParam String password) {

        if (!isValid(password, email))
            return ResponseEntity.badRequest().body("Password does not meet security requirements");

        return ResponseEntity.ok(authService.register(email, password));

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email,
                                        @RequestParam String password) {

        String token = authService.login(email, password);

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", user.getRole().name()
        ));

    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {

        String email = body.get("email");

        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "email is required"));
        }

        try {
            authService.requestPasswordReset(email);
        } catch (Exception ignored) {}

        return ResponseEntity.ok(Map.of("message", "Check your email for password reset instructions."));

    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token,
                                           @RequestBody Map<String, String> body) {

        String newPassword = body.get("newPassword");


        if (!isValid(newPassword, null)) {
            return ResponseEntity.badRequest().body(Map.of("error","newPassword does not meet security requirements"));
        }

        authService.resetPassword(token, newPassword);

        return ResponseEntity.ok(Map.of("message", "Password has been reset successfully."));

    }

}
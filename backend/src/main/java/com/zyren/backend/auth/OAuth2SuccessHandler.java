package com.zyren.backend.auth;

import com.zyren.backend.config.JwtUtil;
import com.zyren.backend.user.Role;
import com.zyren.backend.user.UserEntity;
import com.zyren.backend.user.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof org.springframework.security.oauth2.core.user.OAuth2User)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid OAuth2 user");
            return;
        }
        var oAuth2User = (org.springframework.security.oauth2.core.user.OAuth2User) principal;

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = attributes.get("email") != null ? attributes.get("email").toString() : null;
        String name = attributes.get("name") != null ? attributes.get("name").toString() : null;
        if (email == null || email.isBlank()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Email not found from OAuth2 provider");
            return;
        }

        UserEntity user = userRepository.findByEmail(email)
                .map(existingUser -> {
                    if (existingUser.getProvider() == null || existingUser.getProvider().isBlank()) {
                        existingUser.setProvider("GOOGLE");
                        return userRepository.save(existingUser);
                    }
                    return existingUser;
                })
                .orElseGet(() -> {
                    UserEntity newUser = UserEntity.builder()
                            .email(email)
                            .password(null)
                            .role(Role.USER)
                            .provider("GOOGLE")
                            .displayName(name != null ? name : email)
                            .build();
                    return userRepository.save(newUser);
                });

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getProvider());
        String encodedToken = URLEncoder.encode(token, StandardCharsets.UTF_8);
//        response.sendRedirect("http://localhost:5173/oauth-success?token=" + encodedToken);
        response.sendRedirect("https://zyren.netlify.app/oauth-success?token=" + encodedToken);
    }
}

package com.zyren.backend.user;

import com.zyren.backend.auth.PasswordResetTokenRepository;
import com.zyren.backend.paste.PasteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final UserRepository userRepository;
    private final PasteRepository pasteRepository;
    private final PasswordResetTokenRepository tokenRepo;

    @GetMapping
    public List<UserEntity> getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .filter(
                        u -> !u.getEmail()
                                .equals(
                                        SecurityContextHolder.getContext()
                                        .getAuthentication().getName()
                                )
                )
                .toList();

    }

    @GetMapping("/{id}/pastes")
    public List<?> getPastesOfUser(@PathVariable Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return pasteRepository.findByOwner(user);
    }

    @Transactional
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        tokenRepo.deleteByUserId(id);
        pasteRepository.deleteByOwnerId(id);
        userRepository.deleteById(id);

        return "User removed";
    }

}
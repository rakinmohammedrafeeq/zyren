package com.zyren.backend.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetTokenEntity, Long> {

    Optional<PasswordResetTokenEntity> findByTokenAndUsedFalseAndExpiresAtAfter(String token, Instant now);

    @Transactional
    @Modifying
    @Query("delete from PasswordResetTokenEntity t where t.user.id = :userId")
    void deleteByUserId(Long userId);
}
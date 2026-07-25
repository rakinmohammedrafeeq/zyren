package com.zyren.backend.paste;

import com.zyren.backend.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface PasteRepository extends JpaRepository<PasteEntity, Long> {

    Optional<PasteEntity> findByCode(String code);

    List<PasteEntity> findByOwner(UserEntity owner);

    List<PasteEntity> findByOwnerAndExpiredFalseOrderByCreatedAtDesc(UserEntity owner);

    Optional<PasteEntity> findByMediaPublicId(String mediaPublicId);

    @Transactional
    @Modifying
    @Query("delete from PasteEntity p where p.owner.id = :ownerId")
    void deleteByOwnerId(Long ownerId);
}
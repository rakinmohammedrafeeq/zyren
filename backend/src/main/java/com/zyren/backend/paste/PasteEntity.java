package com.zyren.backend.paste;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zyren.backend.user.UserEntity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pastes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    // -------------------------------------------------------------------
    // Oracle Docker: Uncomment this block when running Oracle locally
    // -------------------------------------------------------------------
    //
    // @Lob
    // @Column(columnDefinition = "CLOB")
    // private String content;

    // -------------------------------------------------------------------
    // PostgreSQL (Render Hosting): Use TEXT column only
    // NOTE: Do NOT use @Lob here — it can cause LOB stream errors
    // -------------------------------------------------------------------
    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(unique = true, nullable = false)
    private String code;

    private String mediaUrl;

    private String mediaPublicId;

    private String mediaType;

    private LocalDateTime createdAt;

    private LocalDateTime expiryAt;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private UserEntity owner;

    @Column(nullable = false)
    private String type = "TEXT";

    private boolean expired = false;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
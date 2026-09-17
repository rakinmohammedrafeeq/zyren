package com.zyren.backend.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String password;

    @Column
    private String displayName;

    @Column(nullable = false)
    @Convert(converter = RoleConverter.class)
    private Role role;

    @Column
    private String provider;

    public Role getRole() {
        return role;
    }
}

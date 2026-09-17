package com.zyren.backend.user;

public enum Role {
    USER,
    ADMIN,
    ANALYST,
    VIEWER;

    public static Role fromString(String value) {
        if (value == null || value.trim().isEmpty()) {
            return USER;
        }
        try {
            return Role.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return USER;
        }
    }
}
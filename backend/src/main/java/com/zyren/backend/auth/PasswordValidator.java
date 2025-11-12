package com.zyren.backend.auth;

import java.util.List;

public class PasswordValidator {

    private static final List<String> COMMON_BAD = List.of(
            "password", "12345678", "qwerty", "letmein", "admin", "iloveyou"
    );

    public static boolean isValid(String password, String email) {

        if (password == null) return false;

        if (password.length() < 8 || password.length() > 32) return false;

        if (!password.equals(password.trim())) return false;

        if (!password.matches(".*[a-z].*")) return false;

        if (!password.matches(".*[A-Z].*")) return false;

        if (!password.matches(".*[0-9].*")) return false;

        if (!password.matches(".*[!@#$%^&*._\\-+].*")) return false;

        if (password.matches("\\d+")) return false;


        if (email != null && password.equalsIgnoreCase(email)) return false;

        if (COMMON_BAD.contains(password.toLowerCase())) return false;

        return true;
    }
}

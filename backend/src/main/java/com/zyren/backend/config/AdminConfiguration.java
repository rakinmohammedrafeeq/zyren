package com.zyren.backend.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Centralized configuration for admin accounts.
 * Reads from environment variables and provides validated admin credentials.
 */
@Component
@Getter
public class AdminConfiguration {

    @Value("${zyren.admin.email.1:}")
    private String adminEmail1;

    @Value("${zyren.admin.password.1:}")
    private String adminPassword1;

    @Value("${zyren.admin.email.2:}")
    private String adminEmail2;

    @Value("${zyren.admin.password.2:}")
    private String adminPassword2;

    /**
     * Validates if the given email and password match any admin credentials.
     *
     * @param email    the email to validate
     * @param password the password to validate
     * @return true if the credentials match either admin 1 or admin 2
     */
    public boolean isValidAdminCredentials(String email, String password) {
        if (email == null || password == null) {
            return false;
        }

        return (email.equals(adminEmail1) && password.equals(adminPassword1)) ||
               (email.equals(adminEmail2) && password.equals(adminPassword2));
    }

    /**
     * Validates if the given email is an admin email.
     *
     * @param email the email to check
     * @return true if the email matches either admin 1 or admin 2
     */
    public boolean isAdminEmail(String email) {
        if (email == null) {
            return false;
        }

        return email.equals(adminEmail1) || email.equals(adminEmail2);
    }

    /**
     * Gets the number of configured admins.
     *
     * @return the count of configured admin accounts
     */
    public int getConfiguredAdminCount() {
        int count = 0;
        if (adminEmail1 != null && !adminEmail1.isBlank()) {
            count++;
        }
        if (adminEmail2 != null && !adminEmail2.isBlank()) {
            count++;
        }
        return count;
    }
}


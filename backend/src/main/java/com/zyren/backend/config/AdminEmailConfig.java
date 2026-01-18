package com.zyren.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class AdminEmailConfig {

    @Value("${zyren.admin.email.1:#{null}}")
    private String adminEmail1;

    @Value("${zyren.admin.email.2:#{null}}")
    private String adminEmail2;

    /**
     * Returns a list of all configured admin email addresses.
     * Only includes non-null and non-empty emails.
     *
     * @return List of admin email addresses
     */
    public List<String> getAdminEmails() {
        List<String> emails = new ArrayList<>();

        if (adminEmail1 != null && !adminEmail1.trim().isEmpty()) {
            emails.add(adminEmail1.trim());
        }

        if (adminEmail2 != null && !adminEmail2.trim().isEmpty()) {
            emails.add(adminEmail2.trim());
        }

        return emails;
    }

    /**
     * Returns admin emails as an array for Resend API compatibility.
     *
     * @return Array of admin email addresses
     */
    public String[] getAdminEmailsArray() {
        return getAdminEmails().toArray(new String[0]);
    }

    /**
     * Checks if at least one admin email is configured.
     *
     * @return true if at least one admin email exists
     */
    public boolean hasAdminEmails() {
        return !getAdminEmails().isEmpty();
    }
}


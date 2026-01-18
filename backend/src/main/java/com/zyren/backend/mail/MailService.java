package com.zyren.backend.mail;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class MailService {

    @Value("${resend.api.key}")
    private String apiKey;

    /**
     * Send email to a single recipient.
     *
     * @param to      recipient email address
     * @param subject email subject
     * @param html    email HTML content
     */
    public void sendMail(String to, String subject, String html) {
        sendMail(new String[]{to}, subject, html);
    }

    /**
     * Send email to multiple recipients.
     *
     * @param to      array of recipient email addresses
     * @param subject email subject
     * @param html    email HTML content
     */
    public void sendMail(String[] to, String subject, String html) {
        if (to == null || to.length == 0) {
            throw new IllegalArgumentException("At least one recipient email is required");
        }

        Resend resend = new Resend(apiKey);

        // Resend API expects a String[] for multiple recipients
        CreateEmailOptions options = CreateEmailOptions.builder()
                .from("Zyren <onboarding@resend.dev>")
                .to(to)
                .subject(subject)
                .html(html)
                .build();

        try {
            CreateEmailResponse response = resend.emails().send(options);
            System.out.println("Email sent to " + Arrays.toString(to) + " with ID: " + response.getId());
        } catch (ResendException e) {
            throw new RuntimeException("Email failed: " + e.getMessage(), e);
        }
    }

    /**
     * Send email to multiple recipients (List variant).
     *
     * @param to      list of recipient email addresses
     * @param subject email subject
     * @param html    email HTML content
     */
    public void sendMail(List<String> to, String subject, String html) {
        if (to == null || to.isEmpty()) {
            throw new IllegalArgumentException("At least one recipient email is required");
        }
        sendMail(to.toArray(new String[0]), subject, html);
    }

}
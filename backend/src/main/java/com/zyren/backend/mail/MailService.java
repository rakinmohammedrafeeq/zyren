package com.zyren.backend.mail;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Value("${resend.api.key}")
    private String apiKey;

    public void sendMail(String to, String subject, String html) {

        Resend resend = new Resend(apiKey);

        CreateEmailOptions options = CreateEmailOptions.builder()
                .from("Zyren <onboarding@resend.dev>")
                .to(to)
                .subject(subject)
                .html(html)
                .build();

        try {
            CreateEmailResponse response = resend.emails().send(options);
            System.out.println("Email sent with ID: " + response.getId());
        } catch (ResendException e) {
            throw new RuntimeException("Email failed: " + e.getMessage(), e);
        }

    }

}
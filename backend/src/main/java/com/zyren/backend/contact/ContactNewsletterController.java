package com.zyren.backend.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Validated
public class ContactNewsletterController {

    private final JavaMailSender mailSender;

    @Value("${zyren.mail.from}")
    private String mailFrom;

    @Value("${zyren.mail.to}")
    private String mailTo;

    @PostMapping("/contact")
    public ResponseEntity<?> contact(@RequestBody @Validated ContactRequest req) {

        SimpleMailMessage msg = new SimpleMailMessage();

        msg.setFrom(mailFrom);
        msg.setTo(mailTo);
        msg.setSubject("Zyren Contact Message from: " + req.name());
        msg.setText(req.message() + "\n\nReply to: " + req.email());

        mailSender.send(msg);

        return ResponseEntity.ok().body(
                java.util.Map.of("ok", true, "message", "Message sent successfully")
        );
    }

    @PostMapping("/newsletter/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody @Validated NewsletterSubscribeRequest req) {

        SimpleMailMessage msg = new SimpleMailMessage();

        msg.setFrom(mailFrom);
        msg.setTo(mailTo);
        msg.setSubject("Zyren Newsletter Subscribe");
        msg.setText("New subscriber: " + req.email());

        mailSender.send(msg);

        return ResponseEntity.ok().body(
                java.util.Map.of("ok", true, "message", "Subscribed!")
        );
    }
}
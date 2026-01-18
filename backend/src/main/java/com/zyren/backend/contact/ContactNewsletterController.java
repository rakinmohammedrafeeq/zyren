package com.zyren.backend.contact;

import com.zyren.backend.config.AdminEmailConfig;
import com.zyren.backend.mail.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Validated
public class ContactNewsletterController {

//    private final JavaMailSender mailSender;
    private final MailService mailService;
    private final AdminEmailConfig adminEmailConfig;

//    @Value("${zyren.mail.from}")
//    private String mailFrom;

    @PostMapping("/contact")
    public ResponseEntity<?> contact(@RequestBody @Validated ContactRequest req) {

//        SimpleMailMessage msg = new SimpleMailMessage();
//
//        msg.setFrom(mailFrom);
//        msg.setTo(mailTo);
//        msg.setSubject("Zyren Contact Message from: " + req.name());
//        msg.setText(req.message() + "\n\nReply to: " + req.email());
//
//        mailSender.send(msg);

        String subject = "Zyren Contact Message from: " + req.name();

        String html = """
                <h3>New contact form submission</h3>
                <p><strong>Name:</strong> %s</p>
                <p><strong>Email:</strong> %s</p>
                <p><strong>Message:</strong><br>%s</p>
                """.formatted(req.name(), req.email(), req.message());

        // Send to all admin emails
        mailService.sendMail(adminEmailConfig.getAdminEmailsArray(), subject, html);

        return ResponseEntity.ok().body(
                java.util.Map.of("ok", true, "message", "Message sent successfully")
        );

    }

    @PostMapping("/newsletter/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody @Validated NewsletterSubscribeRequest req) {

//        SimpleMailMessage msg = new SimpleMailMessage();
//
//        msg.setFrom(mailFrom);
//        msg.setTo(mailTo);
//        msg.setSubject("Zyren Newsletter Subscribe");
//        msg.setText("New subscriber: " + req.email());
//
//        mailSender.send(msg);

        // Send to all admin emails
        mailService.sendMail(
                adminEmailConfig.getAdminEmailsArray(),
                "Zyren Newsletter Subscribe",
                "<p>New newsletter subscriber:</p><strong>" + req.email() + "</strong>"
        );

        return ResponseEntity.ok().body(
                java.util.Map.of("ok", true, "message", "Subscribed!")
        );

    }

}
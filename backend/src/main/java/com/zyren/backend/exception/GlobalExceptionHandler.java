package com.zyren.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception ex) {
        Map<String, String> error = new HashMap<>();
        
        // Check for specific error messages to provide appropriate status codes
        String message = ex.getMessage();
        
        if (message != null) {
            // Rate limiting - check for both explicit rate limit and "too large" token messages
            if (message.contains("limit reached") || 
                message.contains("Too many requests") ||
                message.toLowerCase().contains("rate_limit") ||
                (message.contains("tokens") && message.contains("Limit"))) {
                error.put("message", "AI service limit reached. Please try again later or use shorter content.");
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(error);
            }
            
            // Payload too large
            if (message.contains("too large") || 
                message.contains("exceeds") ||
                message.contains("Request too large")) {
                error.put("message", "Your content is too large. Please try with shorter content.");
                return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(error);
            }
            
            // Service unavailable
            if (message.contains("temporarily unavailable") || 
                message.contains("Cannot connect") || 
                message.contains("not configured")) {
                error.put("message", message);
                return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(error);
            }
        }
        
        // Default to bad request
        error.put("message", message != null ? message : "An error occurred");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, String>> handleAccessDenied(AccessDeniedException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("message", "Access denied: you are not allowed to perform this action!");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, String>> handleMaxUploadSizeExceeded(MaxUploadSizeExceededException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("message", "File size exceeds the maximum allowed limit. Please upload a smaller file.");
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(error);
    }

}
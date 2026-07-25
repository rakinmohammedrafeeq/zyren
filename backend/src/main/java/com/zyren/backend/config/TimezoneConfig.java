package com.zyren.backend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.util.TimeZone;

@Configuration
public class TimezoneConfig {

    @PostConstruct
    public void init() {
        // Set default timezone for the entire application
        // Change this to your local timezone if needed
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }
}

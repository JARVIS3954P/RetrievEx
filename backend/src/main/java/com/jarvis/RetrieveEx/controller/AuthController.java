package com.jarvis.RetrieveEx.controller;

import com.jarvis.RetrieveEx.controller.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    // Injects the password from application.properties
    @Value("${moderator.password}")
    private String moderatorPassword;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if (moderatorPassword.equals(loginRequest.getPassword())) {
            // If the password is correct, return a success response.
            return ResponseEntity.ok(Map.of("status", "success"));
        } else {
            // If the password is incorrect, return an unauthorized error.
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }
}
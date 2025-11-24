package com.example.studentmanagement.controller;

import com.example.studentmanagement.payload.request.AuthRequest;
import com.example.studentmanagement.payload.request.RegisterRequest;
import com.example.studentmanagement.payload.response.AuthResponse;
import com.example.studentmanagement.payload.response.ApiResponse;
import com.example.studentmanagement.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(
                ApiResponse.<AuthResponse>builder()
                        .success(true)
                        .message("User registered successfully")
                        .data(response)
                        .status(HttpStatus.OK)
                        .build()
        );
    }


    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.authenticate(request);
        return ResponseEntity.ok(
                ApiResponse.<AuthResponse>builder()
                        .success(true)
                        .message("Login successful")
                        .data(response)
                        .status(HttpStatus.OK)
                        .build()
        );
    }


    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(@RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Logged out successfully")
                        .data(null)
                        .status(HttpStatus.OK)
                        .build()
        );
    }
}

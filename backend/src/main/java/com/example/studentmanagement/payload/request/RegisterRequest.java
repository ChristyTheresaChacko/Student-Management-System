package com.example.studentmanagement.payload.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String role;  // "ADMIN", "TEACHER", "STUDENT"
    private String firstName;
    private String lastName;
    private String gender;
    private String phone;
    private String address;
    private String department;
    private String semester;
    private String admissionNumber;
}

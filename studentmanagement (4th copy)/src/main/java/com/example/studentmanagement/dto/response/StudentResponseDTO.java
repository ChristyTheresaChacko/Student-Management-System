package com.example.studentmanagement.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentResponseDTO {

    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String admissionNumber;
    private String email;
    private String phone;
    private String semester;
    private String department;
    private String gender;
    private String address;

    private Long classId;
    private String className;
    private String createdBy;
    private String updatedBy;
}

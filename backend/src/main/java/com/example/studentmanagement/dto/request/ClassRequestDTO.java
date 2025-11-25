package com.example.studentmanagement.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassRequestDTO {

    @NotBlank(message = "Class name is required")
    private String className;

    @NotBlank(message = "Department is required")
    private String department;

    private Long teacherId; // optional
}

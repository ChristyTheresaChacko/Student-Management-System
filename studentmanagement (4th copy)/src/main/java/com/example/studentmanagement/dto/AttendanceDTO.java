package com.example.studentmanagement.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceDTO {

    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotNull(message = "Class ID is required")
    private Long classId;

    @NotNull(message = "Date is required")
    private LocalDate date;

    private boolean present; // optional, defaults to false if not provided
    private String remarks; // optional
}

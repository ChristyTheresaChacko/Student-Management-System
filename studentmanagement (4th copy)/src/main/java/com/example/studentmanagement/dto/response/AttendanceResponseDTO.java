package com.example.studentmanagement.dto.response;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceResponseDTO {

    private Long id;
    private LocalDate date;
    private boolean present;
    private String remarks;

    private Long studentId;
    private String studentName;

    private Long classId;
    private String className;
}

package com.example.studentmanagement.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassResponseDTO {

    private Long id;
    private String className;
    private String department;

    private Long teacherId;
    private String teacherName; // computed from entity
}

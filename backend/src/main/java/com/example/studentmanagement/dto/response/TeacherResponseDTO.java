package com.example.studentmanagement.dto.response;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherResponseDTO {

    private Long id;

    private String username;
    private String firstName;
    private String lastName;

    private String email;
    private String phone;
    private String department;

    private List<Long> teachingClassIds;
    private List<String> teachingClassNames; // derived
}

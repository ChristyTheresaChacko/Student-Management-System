package com.example.studentmanagement.mapper;

import com.example.studentmanagement.dto.request.TeacherRequestDTO;
import com.example.studentmanagement.dto.response.TeacherResponseDTO;
import com.example.studentmanagement.entity.ClassEntity;
import com.example.studentmanagement.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TeacherMapper {

    public TeacherResponseDTO toDTO(User teacher) {
        return TeacherResponseDTO.builder()
                .id(teacher.getId())
                .username(teacher.getUsername())
                .firstName(teacher.getFirstName())
                .lastName(teacher.getLastName())
                .email(teacher.getEmail())
                .phone(teacher.getPhone())
                .department(teacher.getDepartment())

                // extract IDs
                .teachingClassIds(
                        teacher.getClassesAssigned() == null ? null :
                                teacher.getClassesAssigned()
                                        .stream()
                                        .map(ClassEntity::getId)
                                        .toList()
                )

                // extract names
                .teachingClassNames(
                        teacher.getClassesAssigned() == null ? null :
                                teacher.getClassesAssigned()
                                        .stream()
                                        .map(ClassEntity::getClassName)
                                        .toList()
                )
                .build();
    }


    public void updateTeacherFromDTO(TeacherRequestDTO dto, User teacher) {
        teacher.setUsername(dto.getUsername());
        teacher.setFirstName(dto.getFirstName());
        teacher.setLastName(dto.getLastName());
        teacher.setEmail(dto.getEmail());
        teacher.setPhone(dto.getPhone());
        teacher.setDepartment(dto.getDepartment());
    }
}

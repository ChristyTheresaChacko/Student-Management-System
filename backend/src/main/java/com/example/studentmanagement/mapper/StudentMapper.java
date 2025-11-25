package com.example.studentmanagement.mapper;

import com.example.studentmanagement.dto.request.StudentRequestDTO;
import com.example.studentmanagement.dto.response.StudentResponseDTO;
import com.example.studentmanagement.entity.ClassEntity;
import com.example.studentmanagement.entity.User;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {

    // Convert RequestDTO → Entity
    public User toEntity(StudentRequestDTO dto, ClassEntity classEntity) {
        return User.builder()
                .username(dto.getUsername())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .semester(dto.getSemester())
                .department(dto.getDepartment())
                .admissionNumber(dto.getAdmissionNumber())
                .gender(dto.getGender())
                .address(dto.getAddress())
                .classAssigned(classEntity)
                .enabled(true)
                .build();
    }

    // Convert Entity → ResponseDTO
    public StudentResponseDTO toResponse(User user) {
        return StudentResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .admissionNumber(user.getAdmissionNumber())
                .email(user.getEmail())
                .phone(user.getPhone())
                .semester(user.getSemester())
                .department(user.getDepartment())
                .gender(user.getGender())
                .address(user.getAddress())
                .classId(user.getClassAssigned() != null ? user.getClassAssigned().getId() : null)
                .className(user.getClassAssigned() != null ? user.getClassAssigned().getClassName() : null)
                .createdBy(user.getCreatedBy())
                .updatedBy(user.getUpdatedBy())
                .build();
    }
}

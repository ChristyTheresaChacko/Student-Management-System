package com.example.studentmanagement.mapper;

import com.example.studentmanagement.dto.request.ClassRequestDTO;
import com.example.studentmanagement.dto.response.ClassResponseDTO;
import com.example.studentmanagement.entity.ClassEntity;
import com.example.studentmanagement.entity.User;
import org.springframework.stereotype.Component;

@Component
public class ClassMapper {

    // Convert entity → response DTO
    public ClassResponseDTO toDTO(ClassEntity entity) {
        if (entity == null) return null;

        return ClassResponseDTO.builder()
                .id(entity.getId())
                .className(entity.getClassName())
                .department(entity.getDepartment())
                .teacherId(entity.getTeacher() != null ? entity.getTeacher().getId() : null)
                .teacherName(entity.getTeacher() != null
                        ? entity.getTeacher().getFirstName() + " " + entity.getTeacher().getLastName()
                        : null)
                .build();
    }

    // Convert request DTO → entity
    public ClassEntity toEntity(ClassRequestDTO dto, User teacher) {
        return ClassEntity.builder()
                .className(dto.getClassName())
                .department(dto.getDepartment())
                .teacher(teacher)
                .build();
    }
}

package com.example.studentmanagement.service;

import com.example.studentmanagement.dto.request.ClassRequestDTO;
import com.example.studentmanagement.dto.response.ClassResponseDTO;
import com.example.studentmanagement.dto.response.StudentResponseDTO;
import com.example.studentmanagement.entity.ClassEntity;
import com.example.studentmanagement.entity.User;
import com.example.studentmanagement.mapper.ClassMapper;
import com.example.studentmanagement.mapper.StudentMapper;
import com.example.studentmanagement.repository.ClassRepository;
import com.example.studentmanagement.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassService {

    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final ClassMapper classMapper;
    private final StudentMapper studentMapper;

    public ClassService(ClassRepository classRepository,
                        UserRepository userRepository,
                        ClassMapper classMapper,
                        StudentMapper studentMapper) {
        this.classRepository = classRepository;
        this.userRepository = userRepository;
        this.classMapper = classMapper;
        this.studentMapper = studentMapper;
    }

    public List<ClassResponseDTO> getAllClasses() {
        return classRepository.findAll().stream()
                .map(classMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ClassResponseDTO getClassById(Long id) {
        ClassEntity clazz = classRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Class not found"));
        return classMapper.toDTO(clazz);
    }

    public ClassResponseDTO addClass(ClassRequestDTO dto) {
        User teacher = null;
        if (dto.getTeacherId() != null) {
            teacher = userRepository.findById(dto.getTeacherId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Teacher not found"));
        }
        ClassEntity clazz = classMapper.toEntity(dto, teacher);
        ClassEntity saved = classRepository.save(clazz);
        return classMapper.toDTO(saved);
    }

    public ClassResponseDTO updateClass(Long id, ClassRequestDTO dto) {
        ClassEntity existing = classRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Class not found"));

        existing.setClassName(dto.getClassName());
        existing.setDepartment(dto.getDepartment());

        if (dto.getTeacherId() != null) {
            User teacher = userRepository.findById(dto.getTeacherId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Teacher not found"));
            existing.setTeacher(teacher);
        } else {
            existing.setTeacher(null);
        }

        ClassEntity saved = classRepository.save(existing);
        return classMapper.toDTO(saved);
    }

    // ========================
    //      🔥 HARD DELETE
    // ========================
    public void deleteClass(Long id) {
        ClassEntity clazz = classRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Class not found"));

        classRepository.delete(clazz);
    }

    public StudentResponseDTO assignStudentToClass(Long studentId, Long classId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
        ClassEntity clazz = classRepository.findById(classId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Class not found"));

        student.setClassAssigned(clazz);
        User saved = userRepository.save(student);
        return studentMapper.toResponse(saved);
    }

    public ClassResponseDTO assignTeacherToClass(Long teacherId, Long classId) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Teacher not found"));
        ClassEntity clazz = classRepository.findById(classId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Class not found"));

        clazz.setTeacher(teacher);
        ClassEntity saved = classRepository.save(clazz);
        return classMapper.toDTO(saved);
    }

    public List<StudentResponseDTO> getStudentsByClass(Long classId) {
        List<User> students = userRepository.findByClassAssignedId(classId);
        return students.stream()
                .map(studentMapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<?> getClassAttendance(Long classId) {
        ClassEntity clazz = classRepository.findById(classId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Class not found"));
        return clazz.getAttendanceList();
    }
}

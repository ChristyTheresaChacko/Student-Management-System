package com.example.studentmanagement.service;

import com.example.studentmanagement.dto.request.StudentRequestDTO;
import com.example.studentmanagement.dto.request.TeacherRequestDTO;
import com.example.studentmanagement.dto.response.StudentResponseDTO;
import com.example.studentmanagement.dto.response.TeacherResponseDTO;
import com.example.studentmanagement.entity.ClassEntity;
import com.example.studentmanagement.entity.Role;
import com.example.studentmanagement.entity.User;
import com.example.studentmanagement.mapper.StudentMapper;
import com.example.studentmanagement.mapper.TeacherMapper;
import com.example.studentmanagement.repository.AttendanceRepository;
import com.example.studentmanagement.repository.ClassRepository;
import com.example.studentmanagement.repository.RoleRepository;
import com.example.studentmanagement.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ClassRepository classRepository;
    private final AttendanceRepository attendanceRepository;

    private final StudentMapper studentMapper;
    private final TeacherMapper teacherMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       ClassRepository classRepository,
                       AttendanceRepository attendanceRepository,
                       StudentMapper studentMapper,
                       TeacherMapper teacherMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.classRepository = classRepository;
        this.attendanceRepository = attendanceRepository;
        this.studentMapper = studentMapper;
        this.teacherMapper = teacherMapper;
    }

    // ================= STUDENTS =================
    public List<StudentResponseDTO> getAllStudents() {
        return userRepository.findByRoleName("STUDENT").stream()
                .map(studentMapper::toResponse)
                .collect(Collectors.toList());
    }

    public StudentResponseDTO getStudentById(Long id) {
        User student = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        if (!"STUDENT".equalsIgnoreCase(student.getRole().getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not a student");
        }

        return studentMapper.toResponse(student);
    }

    public User updateProfile(String username, StudentResponseDTO dto) {
        User existingUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        existingUser.setFirstName(dto.getFirstName());
        existingUser.setLastName(dto.getLastName());
        existingUser.setEmail(dto.getEmail());
        existingUser.setPhone(dto.getPhone());
        existingUser.setAddress(dto.getAddress());
        existingUser.setGender(dto.getGender());

        return userRepository.save(existingUser);
    }
    public List<Object> searchUsers(String keyword) {
        return userRepository.searchUsersByNameOrClass(keyword).stream()
                .map(u -> {
                    if ("STUDENT".equalsIgnoreCase(u.getRole().getName())) {
                        return studentMapper.toResponse(u);
                    } else {
                        return teacherMapper.toDTO(u);
                    }
                })
                .collect(Collectors.toList());
    }


    public StudentResponseDTO addStudent(StudentRequestDTO dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        Role studentRole = roleRepository.findByName("STUDENT")
                .orElseThrow(() -> new RuntimeException("Role STUDENT not found"));

        ClassEntity clazz = null;
        if (dto.getClassId() != null) {
            clazz = classRepository.findById(dto.getClassId())
                    .orElseThrow(() -> new RuntimeException("Class not found"));
        }

        User student = studentMapper.toEntity(dto, clazz);
        student.setRole(studentRole);
        student.setPassword(passwordEncoder.encode("student123"));

        User saved = userRepository.save(student);
        return studentMapper.toResponse(saved);
    }

    @Transactional
    public StudentResponseDTO updateStudent(Long id, StudentRequestDTO dto) {

        User student = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        if (!student.getUsername().equals(dto.getUsername())
                && userRepository.existsByUsername(dto.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        ClassEntity clazz = null;
        if (dto.getClassId() != null) {
            clazz = classRepository.findById(dto.getClassId())
                    .orElseThrow(() -> new RuntimeException("Class not found"));
        }

        // Update fields
        student.setUsername(dto.getUsername());
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setPhone(dto.getPhone());
        student.setSemester(dto.getSemester());
        student.setDepartment(dto.getDepartment());
        student.setAdmissionNumber(dto.getAdmissionNumber());
        student.setGender(dto.getGender());
        student.setAddress(dto.getAddress());
        student.setClassAssigned(clazz);

        User updated = userRepository.save(student);
        return studentMapper.toResponse(updated);
    }

    // HARD DELETE STUDENT
    @Transactional
    public void deleteStudent(Long id) {
        User student = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Remove from class if assigned
        if (student.getClassAssigned() != null) {
            student.setClassAssigned(null);
        }

        // Remove attendance
        attendanceRepository.deleteAll(student.getAttendanceList());

        userRepository.delete(student);
    }

    // ================= TEACHERS =================
    public List<TeacherResponseDTO> getAllTeachers() {
        return userRepository.findByRoleName("TEACHER").stream()
                .map(teacherMapper::toDTO)
                .collect(Collectors.toList());
    }

    public TeacherResponseDTO getTeacherById(Long id) {
        User teacher = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        if (!"TEACHER".equalsIgnoreCase(teacher.getRole().getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not a teacher");
        }

        return teacherMapper.toDTO(teacher);
    }

    public TeacherResponseDTO addTeacher(TeacherRequestDTO dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        Role teacherRole = roleRepository.findByName("TEACHER")
                .orElseThrow(() -> new RuntimeException("Role TEACHER not found"));

        User teacher = new User();
        teacherMapper.updateTeacherFromDTO(dto, teacher);
        teacher.setRole(teacherRole);
        teacher.setPassword(passwordEncoder.encode("teacher123"));

        User saved = userRepository.save(teacher);
        return teacherMapper.toDTO(saved);
    }

    @Transactional
    public TeacherResponseDTO updateTeacher(Long id, TeacherRequestDTO dto) {
        User teacher = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        if (!teacher.getUsername().equals(dto.getUsername()) &&
                userRepository.existsByUsername(dto.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        teacherMapper.updateTeacherFromDTO(dto, teacher);

        User updated = userRepository.save(teacher);
        return teacherMapper.toDTO(updated);
    }

    // HARD DELETE TEACHER
    @Transactional
    public void deleteTeacher(Long teacherId) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        // Unassign teacher from classes
        if (teacher.getClassesAssigned() != null) {
            for (ClassEntity cls : teacher.getClassesAssigned()) {
                cls.setTeacher(null);
            }
            classRepository.saveAll(teacher.getClassesAssigned());
        }

        userRepository.delete(teacher);
    }

    // ================= CLASS OPERATIONS =================
    public boolean isTeacherAssignedToClass(Long teacherId, Long classId) {
        User teacher = getUserById(teacherId);
        if (teacher.getClassesAssigned() == null) return false;

        return teacher.getClassesAssigned().stream()
                .anyMatch(c -> c.getId().equals(classId));
    }

    public List<User> getStudentsByClassId(Long classId) {
        return userRepository.findByClassAssignedId(classId);
    }

    // ================= COMMON =================
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found with username: " + username));
    }

}

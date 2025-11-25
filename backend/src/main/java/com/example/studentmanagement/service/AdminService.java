package com.example.studentmanagement.service;

import com.example.studentmanagement.entity.User;
import com.example.studentmanagement.entity.ClassEntity;
import com.example.studentmanagement.repository.UserRepository;
import com.example.studentmanagement.repository.ClassRepository;
import com.example.studentmanagement.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private static UserRepository userRepository = null;
    private static ClassRepository classRepository = null;
    private final RoleRepository roleRepository;

    public AdminService(UserRepository userRepository,
                        ClassRepository classRepository,
                        RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.classRepository = classRepository;
        this.roleRepository = roleRepository;
    }

    // In AdminService.java
    public static User assignClassToStudent(Long studentId, Long classId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        ClassEntity clazz = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        // Set the class for the student (owning side)
        student.setClassAssigned(clazz);

        // Save the student
        return userRepository.save(student);
    }


    // Students CRUD
    public List<User> getAllStudents() {
        return userRepository.findByRoleName("STUDENT");
    }

    public User getStudentById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public User addStudent(User student) {
        return userRepository.save(student);
    }

    public User updateStudent(Long id, User student) {
        User existing = userRepository.findById(id).orElseThrow();
        existing.setFirstName(student.getFirstName());
        existing.setLastName(student.getLastName());
        existing.setEmail(student.getEmail());
        existing.setPhone(student.getPhone());
        existing.setSemester(student.getSemester());
        existing.setClassAssigned(student.getClassAssigned());
        return userRepository.save(existing);
    }

    public void deleteStudent(Long id) {
        userRepository.deleteById(id);
    }
    public static ClassEntity assignClassToTeacher(Long teacherId, Long classId) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        ClassEntity clazz = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        // Set the teacher in the class (owning side)
        clazz.setTeacher(teacher);

        // Save the class to persist the relation
        ClassEntity savedClass = classRepository.save(clazz);

        return savedClass;
    }




}

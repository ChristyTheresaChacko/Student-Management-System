package com.example.studentmanagement.service;

import com.example.studentmanagement.entity.User;
import com.example.studentmanagement.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    private final UserRepository userRepository;

    public TeacherService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getStudentsByClass(Long classId) {
        return userRepository.findByClassAssignedId(classId);
    }

    // Add/update marks & attendance methods will use MarksRepository / AttendanceRepository
}

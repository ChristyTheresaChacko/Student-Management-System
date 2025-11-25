package com.example.studentmanagement.service;

import com.example.studentmanagement.entity.User;
import com.example.studentmanagement.repository.AttendanceRepository;
import com.example.studentmanagement.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final UserRepository userRepository;

    private final AttendanceRepository attendanceRepository;

    public StudentService(UserRepository userRepository,

                          AttendanceRepository attendanceRepository) {
        this.userRepository = userRepository;

        this.attendanceRepository = attendanceRepository;
    }

    public User getProfile(Long studentId) {
        return userRepository.findById(studentId).orElseThrow();
    }


    public List<?> getAttendance(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }
}

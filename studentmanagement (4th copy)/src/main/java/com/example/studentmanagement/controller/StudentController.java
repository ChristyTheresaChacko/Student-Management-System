package com.example.studentmanagement.controller;

import com.example.studentmanagement.dto.response.StudentResponseDTO;
import com.example.studentmanagement.entity.User;
import com.example.studentmanagement.mapper.StudentMapper;
import com.example.studentmanagement.payload.response.ApiResponse;
import com.example.studentmanagement.service.AttendanceService;
import com.example.studentmanagement.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final UserService userService;
    private final AttendanceService attendanceService;
    private final StudentMapper studentMapper;

    public StudentController(UserService userService,
                             AttendanceService attendanceService,
                             StudentMapper studentMapper) {
        this.userService = userService;
        this.attendanceService = attendanceService;
        this.studentMapper = studentMapper;
    }

    // ------------------- Test -------------------
    @GetMapping("/test")
    public ResponseEntity<ApiResponse<String>> test() {
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Student endpoint working!")
                        .data("Student endpoint working!")
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    // ------------------- Profile -------------------
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<StudentResponseDTO>> getProfile(Authentication authentication) {
        String username = authentication.getName();
        User student = userService.getUserByUsername(username);
        StudentResponseDTO dto = studentMapper.toResponse(student);

        return ResponseEntity.ok(
                ApiResponse.<StudentResponseDTO>builder()
                        .success(true)
                        .message("Profile retrieved successfully")
                        .data(dto)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<StudentResponseDTO>> updateProfile(
            Authentication authentication,
            @RequestBody StudentResponseDTO studentDTO) {

        String username = authentication.getName();

        // Service should return updated User or Student entity
        User updatedUser = userService.updateProfile(username, studentDTO);

        // Convert entity to response DTO
        StudentResponseDTO dto = studentMapper.toResponse(updatedUser);

        return ResponseEntity.ok(
                ApiResponse.<StudentResponseDTO>builder()
                        .success(true)
                        .message("Profile updated successfully")
                        .data(dto)
                        .status(HttpStatus.OK)
                        .build()
        );
    }


    // ------------------- Attendance -------------------
    @GetMapping("/attendance")
    public ResponseEntity<ApiResponse<?>> getAttendance(Authentication authentication) {
        String username = authentication.getName();
        User student = userService.getUserByUsername(username);
        Object attendance = attendanceService.getStudentAttendance(student.getId());

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Attendance retrieved successfully")
                        .data(attendance)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @GetMapping("/attendance/search")
    public ResponseEntity<ApiResponse<?>> getAttendanceBetweenDates(
            Authentication authentication,
            @RequestParam("from") String fromDate,
            @RequestParam("to") String toDate) {

        String username = authentication.getName();
        User student = userService.getUserByUsername(username);

        LocalDate from;
        LocalDate to;

        try {
            from = LocalDate.parse(fromDate);
            to = LocalDate.parse(toDate);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Invalid date format. Use yyyy-MM-dd")
                            .status(HttpStatus.BAD_REQUEST)
                            .build()
            );
        }

        Object attendance = attendanceService.getStudentAttendanceBetweenDates(student.getId(), from, to);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Attendance retrieved successfully")
                        .data(attendance)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

}

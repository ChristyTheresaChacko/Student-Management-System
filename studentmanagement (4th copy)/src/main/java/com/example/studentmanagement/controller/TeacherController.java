package com.example.studentmanagement.controller;

import com.example.studentmanagement.dto.AttendanceDTO;
import com.example.studentmanagement.dto.response.TeacherResponseDTO;
import com.example.studentmanagement.entity.Attendance;
import com.example.studentmanagement.entity.ClassEntity;
import com.example.studentmanagement.entity.User;
import com.example.studentmanagement.payload.response.ApiResponse;
import com.example.studentmanagement.service.AttendanceService;
import com.example.studentmanagement.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Teacher Management", description = "APIs for managing teachers")
@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    private final UserService userService;
    private final AttendanceService attendanceService;

    public TeacherController(UserService userService, AttendanceService attendanceService) {
        this.userService = userService;
        this.attendanceService = attendanceService;
    }

    // ------------------- Test -------------------
    @GetMapping("/test")
    public ResponseEntity<ApiResponse<String>> test() {
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Teacher endpoint working!")
                        .data("Teacher endpoint working!")
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    // ------------------- Profile -------------------
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<TeacherResponseDTO>> getProfile() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User teacher = userService.getUserByUsername(username);

        if (teacher.getRole() == null || !"TEACHER".equalsIgnoreCase(teacher.getRole().getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    ApiResponse.<TeacherResponseDTO>builder()
                            .success(false)
                            .message("Access denied: Not a teacher")
                            .data(null)
                            .status(HttpStatus.FORBIDDEN)
                            .build()
            );
        }

        TeacherResponseDTO dto = userService.getTeacherById(teacher.getId());
        return ResponseEntity.ok(
                ApiResponse.<TeacherResponseDTO>builder()
                        .success(true)
                        .message("Profile retrieved successfully")
                        .data(dto)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    // ------------------- Assigned Classes -------------------
    @GetMapping("/assigned-classes")
    public ResponseEntity<ApiResponse<List<ClassEntity>>> getAssignedClasses() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User teacher = userService.getUserByUsername(username);
        List<ClassEntity> classes = teacher.getClassesAssigned() != null ? teacher.getClassesAssigned() : List.of();

        return ResponseEntity.ok(
                ApiResponse.<List<ClassEntity>>builder()
                        .success(true)
                        .message("Assigned classes retrieved successfully")
                        .data(classes)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    // ------------------- Students in Class -------------------
    @GetMapping("/classes/{classId}/students")
    public ResponseEntity<ApiResponse<List<User>>> getStudentsByClass(@PathVariable Long classId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User teacher = userService.getUserByUsername(username);

        if (!userService.isTeacherAssignedToClass(teacher.getId(), classId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    ApiResponse.<List<User>>builder()
                            .success(false)
                            .message("You are not assigned to this class")
                            .data(null)
                            .status(HttpStatus.FORBIDDEN)
                            .build()
            );
        }

        List<User> students = userService.getStudentsByClassId(classId);
        return ResponseEntity.ok(
                ApiResponse.<List<User>>builder()
                        .success(true)
                        .message("Students retrieved successfully")
                        .data(students)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    // ------------------- Attendance -------------------
    @GetMapping("/classes/{classId}/attendance")
    public ResponseEntity<ApiResponse<List<Attendance>>> getAttendanceByClass(@PathVariable Long classId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User teacher = userService.getUserByUsername(username);

        if (!userService.isTeacherAssignedToClass(teacher.getId(), classId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    ApiResponse.<List<Attendance>>builder()
                            .success(false)
                            .message("You are not assigned to this class")
                            .data(null)
                            .status(HttpStatus.FORBIDDEN)
                            .build()
            );
        }

        List<Attendance> attendance = attendanceService.getAttendanceByClassId(classId);
        return ResponseEntity.ok(
                ApiResponse.<List<Attendance>>builder()
                        .success(true)
                        .message("Attendance retrieved successfully")
                        .data(attendance)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @PostMapping("/classes/{classId}/attendance")
    public ResponseEntity<ApiResponse<Attendance>> addAttendance(@PathVariable Long classId,
                                                                 @RequestBody AttendanceDTO dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User teacher = userService.getUserByUsername(username);

        if (!userService.isTeacherAssignedToClass(teacher.getId(), classId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    ApiResponse.<Attendance>builder()
                            .success(false)
                            .message("You are not assigned to this class")
                            .data(null)
                            .status(HttpStatus.FORBIDDEN)
                            .build()
            );
        }

        dto.setClassId(classId);
        Attendance saved = attendanceService.addAttendanceFromDTO(dto);
        return ResponseEntity.ok(
                ApiResponse.<Attendance>builder()
                        .success(true)
                        .message("Attendance added successfully")
                        .data(saved)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @PutMapping("/attendance/{id}")
    public ResponseEntity<ApiResponse<Attendance>> updateAttendance(@PathVariable Long id,
                                                                    @RequestBody AttendanceDTO dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User teacher = userService.getUserByUsername(username);

        Attendance existing = attendanceService.getAttendanceById(id);
        if (!userService.isTeacherAssignedToClass(teacher.getId(), existing.getClassEntity().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    ApiResponse.<Attendance>builder()
                            .success(false)
                            .message("You are not assigned to this class")
                            .data(null)
                            .status(HttpStatus.FORBIDDEN)
                            .build()
            );
        }

        Attendance updated = attendanceService.updateAttendanceFromDTO(id, dto);
        return ResponseEntity.ok(
                ApiResponse.<Attendance>builder()
                        .success(true)
                        .message("Attendance updated successfully")
                        .data(updated)
                        .status(HttpStatus.OK)
                        .build()
        );
    }
    @GetMapping("/classes/{classId}/attendance-by-date")
public ResponseEntity<ApiResponse<List<Attendance>>> getAttendanceByClassAndDate(
        @PathVariable Long classId,
        @RequestParam String date) {

    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    User teacher = userService.getUserByUsername(username);

    if (!userService.isTeacherAssignedToClass(teacher.getId(), classId)) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                ApiResponse.<List<Attendance>>builder()
                        .success(false)
                        .message("You are not assigned to this class")
                        .data(null)
                        .status(HttpStatus.FORBIDDEN)
                        .build()
        );
    }

    List<Attendance> attendance = attendanceService.getAttendanceByClassAndDate(classId, date);

    return ResponseEntity.ok(
            ApiResponse.<List<Attendance>>builder()
                    .success(true)
                    .message("Attendance for date retrieved successfully")
                    .data(attendance)
                    .status(HttpStatus.OK)
                    .build()
    );
}


    @DeleteMapping("/attendance/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAttendance(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User teacher = userService.getUserByUsername(username);

        Long classId = attendanceService.getClassIdForAttendance(id);
        if (!userService.isTeacherAssignedToClass(teacher.getId(), classId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    ApiResponse.<Void>builder()
                            .success(false)
                            .message("You are not assigned to this class")
                            .data(null)
                            .status(HttpStatus.FORBIDDEN)
                            .build()
            );
        }

        attendanceService.deleteAttendanceById(id);


        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Attendance deleted successfully")
                        .data(null)
                        .status(HttpStatus.OK)
                        .build()
        );
    }
}

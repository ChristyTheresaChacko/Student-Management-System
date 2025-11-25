package com.example.studentmanagement.controller;

import com.example.studentmanagement.dto.request.ClassRequestDTO;
import com.example.studentmanagement.dto.request.StudentRequestDTO;
import com.example.studentmanagement.dto.request.TeacherRequestDTO;
import com.example.studentmanagement.dto.response.ClassResponseDTO;
import com.example.studentmanagement.dto.response.StudentResponseDTO;
import com.example.studentmanagement.dto.response.TeacherResponseDTO;
import com.example.studentmanagement.payload.response.ApiResponse;
import com.example.studentmanagement.service.AttendanceService;
import com.example.studentmanagement.service.ClassService;
import com.example.studentmanagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserService userService;
    private final ClassService classService;
    private final AttendanceService attendanceService;

    public AdminController(UserService userService,
                           ClassService classService,
                           AttendanceService attendanceService) {
        this.userService = userService;
        this.classService = classService;
        this.attendanceService = attendanceService;
    }

    // ================= STUDENTS =================
    @GetMapping("/students/{id}")
    public StudentResponseDTO getStudentById(@PathVariable Long id) {
        return userService.getStudentById(id);
    }

    @GetMapping("/students")
    public List<StudentResponseDTO> getAllStudents() {
        return userService.getAllStudents();
    }

    @PostMapping("/students")
    public StudentResponseDTO addStudent(@Valid @RequestBody StudentRequestDTO studentDTO) {
        return userService.addStudent(studentDTO);
    }

    @PutMapping("/students/{id}")
    public StudentResponseDTO updateStudent(@PathVariable Long id,
                                            @Valid @RequestBody StudentRequestDTO studentDTO) {
        return userService.updateStudent(id, studentDTO);
    }
    @DeleteMapping("/students/{id}")
    public ApiResponse<Void> deleteStudent(@PathVariable Long id) {
        userService.deleteStudent(id);
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Student with ID " + id + " deleted successfully")
                .status(HttpStatus.OK)
                .build();
    }
    @DeleteMapping("/teachers/{id}")
    public ApiResponse<Void> deleteTeacher(@PathVariable Long id) {
        userService.deleteTeacher(id);
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Teacher with ID " + id + " deleted successfully")
                .status(HttpStatus.OK)
                .build();
    }
    @PostMapping("/students/{studentId}/assign-class/{classId}")
    public StudentResponseDTO assignClassToStudent(@PathVariable Long studentId,
                                                   @PathVariable Long classId) {
        return classService.assignStudentToClass(studentId, classId); // ✅ FIXED
    }


    // ================= TEACHERS =================
    @GetMapping("/teachers/{id}")
    public TeacherResponseDTO getTeacherById(@PathVariable Long id) {
        return userService.getTeacherById(id);
    }

    @GetMapping("/teachers")
    public List<TeacherResponseDTO> getAllTeachers() {
        return userService.getAllTeachers();
    }

    @PostMapping("/teachers")
    public TeacherResponseDTO addTeacher(@Valid @RequestBody TeacherRequestDTO teacherDTO) {
        return userService.addTeacher(teacherDTO);
    }

    @PutMapping("/teachers/{id}")
    public TeacherResponseDTO updateTeacher(@PathVariable Long id,
                                            @Valid @RequestBody TeacherRequestDTO teacherDTO) {
        return userService.updateTeacher(id, teacherDTO);
    }



    @PostMapping("/teachers/{teacherId}/assign-class/{classId}")
    public ClassResponseDTO assignClassToTeacher(@PathVariable Long teacherId,
                                                 @PathVariable Long classId) {
        return classService.assignTeacherToClass(teacherId, classId);
    }

    // ================= CLASSES =================
    @GetMapping("/classes/{id}")
    public ClassResponseDTO getClassById(@PathVariable Long id) {
        return classService.getClassById(id);
    }

    @GetMapping("/classes")
    public List<ClassResponseDTO> getAllClasses() {
        return classService.getAllClasses();
    }

    @PostMapping("/classes")
    public ClassResponseDTO addClass(@Valid @RequestBody ClassRequestDTO classDTO) {
        return classService.addClass(classDTO);
    }

    @PutMapping("/classes/{id}")
    public ClassResponseDTO updateClass(@PathVariable Long id,
                                        @Valid @RequestBody ClassRequestDTO classDTO) {
        return classService.updateClass(id, classDTO);
    }
    @DeleteMapping("/classes/{id}")
    public ApiResponse<Void> deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Class with ID " + id + " deleted successfully")
                .status(HttpStatus.OK)
                .build();
    }

    @GetMapping("/classes/{classId}/students")
    public List<StudentResponseDTO> getStudentsInClass(@PathVariable Long classId) {
        return classService.getStudentsByClass(classId);
    }

    // ================= ATTENDANCE =================
    @GetMapping("/classes/{classId}/attendance")
    public Object getClassAttendance(@PathVariable Long classId) {
        return classService.getClassAttendance(classId);
    }

    @GetMapping("/students/{studentId}/attendance")
    public Object getStudentAttendance(@PathVariable Long studentId) {
        return attendanceService.getStudentAttendance(studentId);
    }

    @DeleteMapping("/attendance/{attendanceId}")
    public ApiResponse<Void> deleteAttendance(@PathVariable Long attendanceId) {
        attendanceService.deleteAttendance(attendanceId);
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Attendance deleted successfully")
                .status(HttpStatus.OK)
                .build();
    }
    @GetMapping("/users/search")
    public List<Object> searchUsers(@RequestParam("q") String keyword) {
        return userService.searchUsers(keyword);
    }
    @GetMapping("/attendance/search")
    public ResponseEntity<ApiResponse<?>> getAllAttendanceBetweenDates(
            @RequestParam("from") String fromDate,
            @RequestParam("to") String toDate) {

        LocalDate from;
        LocalDate to;

        try {
            from = LocalDate.parse(fromDate);
            to = LocalDate.parse(toDate);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Invalid date format. Use yyyy-MM-dd")
                            .status(HttpStatus.BAD_REQUEST)
                            .build()
            );
        }

        Object attendance = attendanceService.getAllAttendanceBetweenDates(from, to);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Attendance records retrieved successfully")
                        .data(attendance)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

}

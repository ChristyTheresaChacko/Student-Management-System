package com.example.studentmanagement.service;

import com.example.studentmanagement.dto.AttendanceDTO;
import com.example.studentmanagement.entity.Attendance;
import com.example.studentmanagement.entity.ClassEntity;
import com.example.studentmanagement.entity.User;
import com.example.studentmanagement.repository.AttendanceRepository;
import com.example.studentmanagement.repository.ClassRepository;
import com.example.studentmanagement.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final ClassRepository classRepository;

    public AttendanceService(AttendanceRepository attendanceRepository,
                             UserRepository userRepository,
                             ClassRepository classRepository) {
        this.attendanceRepository = attendanceRepository;
        this.userRepository = userRepository;
        this.classRepository = classRepository;
    }

    public List<Attendance> getStudentAttendance(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }


    public List<Attendance> getAttendanceByClassId(Long classId) {
        return attendanceRepository.findByClassEntityId(classId);
    }

    public Attendance addAttendanceFromDTO(AttendanceDTO dto) {
        User student = userRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
        ClassEntity clazz = classRepository.findById(dto.getClassId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Class not found"));

        if (dto.getDate() == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Date is required");

        Optional<Attendance> existing = attendanceRepository.findByStudentIdAndDate(student.getId(), dto.getDate());
        if (existing.isPresent()) throw new ResponseStatusException(HttpStatus.CONFLICT, "Attendance already exists for this student on this date");

        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setClassEntity(clazz);
        attendance.setDate(dto.getDate());
        attendance.setPresent(dto.isPresent());
        attendance.setRemarks(dto.getRemarks());

        return attendanceRepository.save(attendance);
    }
    
    
public List<Attendance> getAttendanceByClassAndDate(Long classId, String date) {
    LocalDate localDate = LocalDate.parse(date);
    return attendanceRepository.findByClassEntityIdAndDate(classId, localDate);
}


    public Attendance updateAttendanceFromDTO(Long id, AttendanceDTO dto) {
        Attendance existing = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attendance not found"));
        if (dto.getDate() != null) existing.setDate(dto.getDate());
        existing.setPresent(dto.isPresent());
        if (dto.getRemarks() != null) existing.setRemarks(dto.getRemarks());
        return attendanceRepository.save(existing);
    }
    public List<Attendance> getAllAttendanceBetweenDates(LocalDate from, LocalDate to) {
        return attendanceRepository.findByDateBetween(from, to);
    }
    public void softDeleteAttendance(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attendance not found"));
        attendance.setDeleted(true); // make sure Attendance entity has boolean 'deleted'
        attendanceRepository.save(attendance);
    }

    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attendance not found"));
    }
    public void deleteAttendance(Long attendanceId) {
        attendanceRepository.deleteById(attendanceId);
    }


    public Long getClassIdForAttendance(Long attendanceId) {
        Attendance attendance = getAttendanceById(attendanceId);
        return attendance.getClassEntity().getId();
    }
    public void deleteAttendanceById(Long attendanceId) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attendance not found"));
        attendanceRepository.delete(attendance);
    }
    public List<Attendance> getStudentAttendanceBetweenDates(Long studentId, LocalDate from, LocalDate to) {
        return attendanceRepository.findByStudentIdAndDateBetween(studentId, from, to);
    }
}

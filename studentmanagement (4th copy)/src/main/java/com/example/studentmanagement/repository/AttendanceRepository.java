package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;



public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByClassEntityIdAndDate(Long classId, LocalDate date);

    boolean existsByStudentIdAndClassEntityIdAndDate(Long studentId, Long classId, LocalDate date);

    List<Attendance> findByStudentId(Long studentId);

    List<Attendance> findByClassEntityId(Long classId);

    List<Attendance> findByClassEntityIdAndClassEntityTeacherId(Long classId, Long teacherId);

    // ✅ New method
    Optional<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date);

    List<Attendance> findByStudentIdAndDateBetween(Long studentId, LocalDate from, LocalDate to);
    List<Attendance> findByDateBetween(LocalDate from, LocalDate to);


    void deleteByStudentId(Long studentId);

}

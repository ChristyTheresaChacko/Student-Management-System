package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<User, Long> {

    // Find all students
    List<User> findByRoleName(String roleName);

    // Find student by ID and role
    Optional<User> findByIdAndRoleName(Long id, String roleName);

    // Optionally, find by admission number
    Optional<User> findByAdmissionNumber(String admissionNumber);
}

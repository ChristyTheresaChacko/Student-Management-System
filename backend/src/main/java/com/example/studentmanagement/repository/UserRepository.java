package com.example.studentmanagement.repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.example.studentmanagement.entity.Role;
import com.example.studentmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    List<User> findByRoleName(String student);

    List<User> findByClassAssignedId(Long classId);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    @Query("SELECT DISTINCT u FROM User u " +
            "LEFT JOIN u.classAssigned c " +            // students
            "LEFT JOIN u.classesAssigned ca " +         // teachers
            "WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(c.className) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(ca.className) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<User> searchUsersByNameOrClass(@Param("keyword") String keyword);

}

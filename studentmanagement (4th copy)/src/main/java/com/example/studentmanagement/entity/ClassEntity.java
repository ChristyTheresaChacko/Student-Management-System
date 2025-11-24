package com.example.studentmanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(
        name = "classes"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String className;

    private String department;

    // STUDENTS IN THIS CLASS
    @OneToMany(mappedBy = "classAssigned")
    @JsonIgnore
    private List<User> students;

    // TEACHER – MANY CLASSES for 1 TEACHER
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private User teacher;

    // Attendance for this class
    @OneToMany(mappedBy = "classEntity")
    @JsonIgnore
    private List<Attendance> attendanceList;
}

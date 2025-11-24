package com.example.studentmanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    private String password;
    private boolean enabled = true;

    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String phone;
    private String address;

    private String department; // student dept
    private String semester;
    private String admissionNumber;

    // ROLE
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;
    @Column(name = "`deleted`")  // escape the reserved keyword
    private boolean deleted = false;

    // STUDENT → belongs to ONE CLASS
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    @JsonIgnore
    private ClassEntity classAssigned;

    // TEACHER → can teach MANY CLASSES
    @OneToMany(mappedBy = "teacher")
    @JsonIgnore
    private List<ClassEntity> classesAssigned;

    // Attendance for STUDENT
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Attendance> attendanceList;

    // UserDetails
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of((GrantedAuthority) () -> "ROLE_" + role.getName());
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }

    public String getFullName() {
        return firstName + " " + lastName;
    }
}

package com.example.studentmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class StudentmanagementApplication{

    public static void main(String[] args) {
        SpringApplication.run(StudentmanagementApplication.class, args);
    }
    @EnableJpaAuditing(auditorAwareRef = "auditorAware")
    @SpringBootApplication
    public class StudentManagementApplication {
        public static void main(String[] args) {
            SpringApplication.run(StudentManagementApplication.class, args);
        }
    }

}
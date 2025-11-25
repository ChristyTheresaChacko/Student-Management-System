package com.example.studentmanagement.service;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ExportService {

    // Export class marks as Excel/PDF
    public ResponseEntity<byte[]> exportClassMarks(Long classId) {
        // Placeholder data
        byte[] fileContent = "Marks export placeholder".getBytes();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=class_" + classId + "_marks.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(fileContent);
    }

    // Export class attendance as Excel/PDF
    public ResponseEntity<byte[]> exportClassAttendance(Long classId) {
        // Placeholder data
        byte[] fileContent = "Attendance export placeholder".getBytes();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=class_" + classId + "_attendance.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(fileContent);
    }
}

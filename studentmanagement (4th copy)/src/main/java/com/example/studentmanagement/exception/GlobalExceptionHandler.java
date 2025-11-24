package com.example.studentmanagement.exception;

import com.example.studentmanagement.payload.response.ApiResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<ApiResponse<String>> buildErrorResponse(Exception ex, HttpStatus status) {
        String message = ex.getMessage();

        if (message == null || message.isBlank()) {
            message = switch (status) {
                case NOT_FOUND -> "The requested resource was not found.";
                case BAD_REQUEST -> "Invalid request data.";
                case UNAUTHORIZED -> "Authentication required or token invalid.";
                case FORBIDDEN -> "You do not have permission to access this resource.";
                default -> "An unexpected error occurred.";
            };
        }

        ApiResponse<String> response = ApiResponse.<String>builder()
                .success(false)
                .message(message)
                .data(null)
                .status(status)
                .build();

        return ResponseEntity.status(status).body(response);
    }

    // ========= 400 VALIDATION ERRORS ============
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining("; "));

        return buildErrorResponse(
                new RuntimeException(errors),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<String>> handleConstraintViolations(ConstraintViolationException ex) {
        String violations = ex.getConstraintViolations()
                .stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.joining("; "));

        return buildErrorResponse(
                new RuntimeException(violations),
                HttpStatus.BAD_REQUEST
        );
    }

    // ========== 404 NOT FOUND ===========
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleNotFound(ResourceNotFoundException ex) {
        return buildErrorResponse(ex, HttpStatus.NOT_FOUND);
    }

    // ========== 400 BAD REQUEST ===========
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<String>> handleBadRequest(BadRequestException ex) {
        return buildErrorResponse(ex, HttpStatus.BAD_REQUEST);
    }

    // ========== 401 UNAUTHORIZED ===========
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse<String>> handleUnauthorized(UnauthorizedException ex) {
        return buildErrorResponse(ex, HttpStatus.UNAUTHORIZED);
    }

    // ========== 403 FORBIDDEN (ROLE ACCESS) ===========
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<String>> handleAccessDenied(AccessDeniedException ex) {
        return buildErrorResponse(ex, HttpStatus.FORBIDDEN);
    }

    // ========== 500 INTERNAL SERVER ERROR (DEFAULT) ============
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleAllExceptions(Exception ex) {
        ex.printStackTrace();
        return buildErrorResponse(new Exception("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

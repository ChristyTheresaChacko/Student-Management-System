package com.example.studentmanagement.payload.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(
        description = "Standard API response wrapper used for all endpoints."
)
public class ApiResponse<T> {

    @Schema(
            description = "Indicates whether the request was successful or not.",
            example = "true"
    )
    private boolean success;

    @Schema(
            description = "Descriptive message about the operation result.",
            example = "Student created successfully."
    )
    private String message;

    @Schema(
            description = "Actual data returned by the API. This can be any type depending on the endpoint.",
            example = "{ \"id\": 1, \"name\": \"John Doe\" }"
    )
    private T data;

    @Schema(
            description = "HTTP status of the response.",
            example = "OK"
    )
    private HttpStatus status;
}

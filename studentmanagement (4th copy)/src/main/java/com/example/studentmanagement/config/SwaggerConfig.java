package com.example.studentmanagement.config;
 
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
 
@Configuration
public class SwaggerConfig {
 
    @Bean
    public OpenAPI studentManagerOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Student Manager API")
                        .description("API documentation for the Student Manager application")
                        .version("1.0.0"));
    }
}
package com.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDto {
    private String message;
    private String username;
    private String fullName;
    private String email;
}

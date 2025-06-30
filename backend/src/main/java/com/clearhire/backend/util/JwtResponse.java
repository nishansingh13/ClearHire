package com.clearhire.backend.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String token;
    private String refreshToken;
    private String type = "Bearer";
    private String email;
    private Long expiresIn;

    public JwtResponse(String token, String refreshToken, String email, Long expiresIn) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.email = email;
        this.expiresIn = expiresIn;
    }

    public JwtResponse(String token, String email, Long expiresIn) {
        this.token = token;
        this.email = email;
        this.expiresIn = expiresIn;
    }
     
}

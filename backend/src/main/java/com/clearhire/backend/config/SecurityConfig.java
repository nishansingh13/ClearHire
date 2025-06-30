package com.clearhire.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> {}) // enable CORS
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/**").permitAll()
            .requestMatchers("/users/**").permitAll()
            .anyRequest().authenticated()
        );

    return http.build();
}

}

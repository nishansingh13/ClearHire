package com.clearhire.backend.service;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.clearhire.backend.Repository.UserRepository;
import com.clearhire.backend.models.User;
import com.clearhire.backend.util.JwtUtil;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired 
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<?> registerUser(User user){
        if (userRepository.existsById(user.getEmail())) {
            return ResponseEntity.status(403).body("User already exists");
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.status(400).body("Password cannot be empty");
        }
        if (user.getName() == null || user.getName().isEmpty()) {
            return ResponseEntity.status(400).body("Name cannot be empty");
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            return ResponseEntity.status(400).body("Email cannot be empty");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

   public ResponseEntity<?> loginUser(String email, String password) {
    Optional<User> users = userRepository.findById(email);
    if(users.isEmpty()){
        return ResponseEntity.status(404).body("User not found");
    }
    User user = users.get();
    if(passwordEncoder.matches(password, user.getPassword())){
        // Generate JWT token
        String token = jwtUtil.generateToken(email);
        
        // Create HTTP-only cookie with JWT token
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                .secure(false) // Set to true in production with HTTPS
                .path("/")
                .maxAge(24 * 60 * 60) // 24 hours
                .sameSite("Lax")
                .httpOnly(true)
                .build();
        
        // Return response with cookie header
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body("Login successful yo");
    }
    return ResponseEntity.status(401).body("Invalid credentials");
}

    // Logout method to clear JWT cookie
    public ResponseEntity<?> logoutUser() {
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", "")
                .secure(false) 
                .path("/")
                .maxAge(0)
                .httpOnly(true)
                .build();
        
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body("Logout successful");
    }

    public ResponseEntity<?> getToken(){
         ResponseCookie jwtCookie = ResponseCookie.from("jwt", "")
                .secure(false) 
                .path("/")
                .maxAge(0)
                .httpOnly(true)
                .build();

               if(jwtCookie.getValue()!=null || jwtCookie.getValue().length()==0) return ResponseEntity.ok(jwtCookie);
               return ResponseEntity.status(404).body(null);
    }
}

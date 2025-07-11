package com.clearhire.backend.service;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;

import com.clearhire.backend.Repository.UserRepository;
import com.clearhire.backend.models.SignUpData;
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
                .secure(true) // Required for cross-origin cookies
                .path("/")
                .maxAge(24 * 60 * 60) // 24 hours
                .sameSite("None") // Required for cross-origin cookies
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
                .secure(true) 
                .path("/")
                .maxAge(0)
                .sameSite("None") // Required for cross-origin cookies
                .httpOnly(true)
                .build();
        
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body("Logout successful");
    }
    public boolean validateToken(String token){
      return jwtUtil.validateToken(token, jwtUtil.extractemail(token));
    }

    public ResponseEntity<?> updateUser(SignUpData user, @CookieValue(value="jwt", defaultValue = "") String jwt) {
       if(!validateToken(jwt))  return ResponseEntity.status(401).body("Invalid token");
       if(jwt.isEmpty()) return ResponseEntity.status(401).body("Token is empty");
       Optional<User> existingUser = userRepository.findById(jwtUtil.extractemail(jwt));
         if(existingUser.isEmpty()) {
              return ResponseEntity.status(404).body("User not found");
         }
         String location = user.getLocation();
         String name = user.getName();
         String phone = user.getPhone();
         String bio = user.getBio();
         String experience = user.getExperience();
         if(location != null && !location.isEmpty()) {
            existingUser.get().setLocation(location);
         }
         if(name != null && !name.isEmpty()) {
            existingUser.get().setName(name);
         }
        if(phone != null && !phone.isEmpty()) {
                existingUser.get().setPhone(phone);
        }
        if(bio != null && !bio.isEmpty()) {
            existingUser.get().setBio(bio);
        }
        if(experience != null && !experience.isEmpty()) {
            existingUser.get().setExperience(experience);   
        }
         userRepository.save(existingUser.get());
         return ResponseEntity.ok("User updated successfully");

        
         

    }

   
}

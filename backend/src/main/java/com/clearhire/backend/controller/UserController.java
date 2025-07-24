package com.clearhire.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.clearhire.backend.Repository.UserRepository;
import com.clearhire.backend.models.User;
import com.clearhire.backend.service.UserService;
import com.clearhire.backend.models.SignUpData;
import com.clearhire.backend.util.JwtUtil;
 class LoginRequest{
    private String email;
    private String password;
    
    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
@RestController
public class UserController {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private UserService userService;
  @Autowired
  private JwtUtil  jwtUtil;
  
  // Helper method to extract JWT token from Authorization header
  private String extractToken(String authHeader) {
      if (authHeader != null && authHeader.startsWith("Bearer ")) {
          return authHeader.substring(7);
      }
      return "";
  }
  
    @PostMapping("/users/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        return  userService.registerUser(user);
    }
    @PostMapping("/users/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
      String email = loginRequest.getEmail();
      String password = loginRequest.getPassword();
      return userService.loginUser(email, password);
    }
    @GetMapping("/users/logout")
    public ResponseEntity<?> logoutUser(){
       return userService.logoutUser();
    }
    @GetMapping("/users/token")
     public ResponseEntity<?> getToken(@RequestHeader(name="Authorization", defaultValue = "") String authHeader) {
        String jwt = extractToken(authHeader);
        if(jwt==null || jwt.isEmpty()){
            return ResponseEntity.status(401).body("No token found");
        }
        if(!userService.validateToken(jwt)){
            return ResponseEntity.status(401).body("Invalid token");
        }
        String email = jwtUtil.extractemail(jwt);
        Optional<User> user = userRepository.findById(email);
        if(user.isEmpty()){
            return ResponseEntity.status(404).body("User not found");
        }
       
        return ResponseEntity.ok(jwt);
        
    }
    @PutMapping("/users/update")
    public ResponseEntity<?> updateUser(@RequestBody SignUpData user, @RequestHeader(name="Authorization", defaultValue = "") String authHeader) {
        String jwt = extractToken(authHeader);
        return userService.updateUser(user, jwt);
        
    }

    @GetMapping("/users/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader(name="Authorization", defaultValue = "") String authHeader) {
        String jwt = extractToken(authHeader);
        if(jwt.isEmpty()) {
            return ResponseEntity.status(401).body("Token is empty");
        }
        if(!userService.validateToken(jwt)) {
            return ResponseEntity.status(401).body("Invalid token");
        }
        String email = jwtUtil.extractemail(jwt);
        Optional<User> user = userRepository.findById(email);
        if(user.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.ok(user.get());
    }

    @GetMapping("/ping")
    public ResponseEntity<?> ping() {
        return ResponseEntity.ok("Pong");
    }
}

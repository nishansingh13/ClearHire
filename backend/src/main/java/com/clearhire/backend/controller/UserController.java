package com.clearhire.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.clearhire.backend.models.User;
import com.clearhire.backend.service.UserService;
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
  private UserService userService;
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
}

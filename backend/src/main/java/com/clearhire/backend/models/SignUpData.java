package com.clearhire.backend.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor
@NoArgsConstructor
public class SignUpData {
    private String location;
    private String password;
    private String name;
    private String phone;
    private String bio;
    private String experience;
}

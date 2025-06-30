package com.clearhire.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String email;
    private String name;
    private String password; 
    

}

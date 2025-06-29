package com.clearhire.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "resumes")
public class Resume {
    @Id
    private String id;

    private String name;
    private String email;
    private String phone;
    private List<String> skills;
    private List<String> experience;
    private List<String> education;
}

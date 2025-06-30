package com.clearhire.backend.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.clearhire.backend.models.Resume;
public interface ResumeRepository extends MongoRepository<Resume, String> {
   

    
}

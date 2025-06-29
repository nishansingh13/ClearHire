package com.clearhire.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clearhire.backend.Repository.ResumeRepository;
import com.clearhire.backend.models.Resume;
@Service
public class ResumeService {
    @Autowired
    private ResumeRepository resumeRepository;
    
    public Resume saveResume(Resume resume){
        return resumeRepository.save(resume);
    }

}

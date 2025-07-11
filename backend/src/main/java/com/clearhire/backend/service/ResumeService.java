package com.clearhire.backend.service;

import java.util.List;

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
    public List<Resume> getResume(){
        return resumeRepository.findAll();
    }
    public Resume getResumeByEmail(String email) {
        Resume resume = resumeRepository.findById(email).orElse(null);
        System.out.println("Resume fetched: " + resume);
        return resumeRepository.findById(email).orElse(null);
    }

}

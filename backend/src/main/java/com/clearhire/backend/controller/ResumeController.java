package com.clearhire.backend.controller;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.clearhire.backend.models.Resume;
import com.clearhire.backend.service.ResumeParserService;
import com.clearhire.backend.service.ResumeService;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ResumeController {
    
    @Autowired
    private ResumeParserService resumeParserService;
    @Autowired
    private ResumeService resumeService;
    
    @PostMapping("/api/resume/upload")
        public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file, @RequestParam("selectedRole") String selectedRole) {
            try {
                if (file.isEmpty()) {
                    return ResponseEntity.badRequest()
                    .body(Map.of("error", "Please select a file to upload"));
            }
            
            if (!file.getContentType().equals("application/pdf")) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Only PDF files are allowed"));
            }
            
            if (file.getSize() > 10 * 1024 * 1024) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "File size should not exceed 10MB"));
            }
            

            Map<String, Object> resumeData = resumeParserService.parseResume(file);
            
            if (resumeData == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to parse resume data"));
            }
            
            resumeData.put("role",selectedRole);
            
            return ResponseEntity.ok(resumeData);
            
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to process PDF file: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "An unexpected error occurred: " + e.getMessage()));
        }
    }
    @PostMapping("api/resume/save")
    public ResponseEntity<?> saveResume(@RequestBody Resume resume){
        try{
            if(resume.getName() == null || resume.getName() =="not found" || resume.getEmail() == null || resume.getPhone() == null){
                throw new IllegalArgumentException("Name, email, and phone are required fields.");
            }
            Resume savedResume = resumeService.saveResume(resume);
            return ResponseEntity.ok(savedResume);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to save resume: " + e.getMessage()));
        }
    }
    @GetMapping("api/resume/getResumeData")
    public ResponseEntity<?> getResume(){
            List<Resume> list = resumeService.getResume();
            if (list == null || list.isEmpty()) {
                return ResponseEntity.status(404).build();
            }

            else return ResponseEntity.ok(list);
    }

    @PostMapping("api/resume/getResumeByEmail")
    public ResponseEntity<?> getResumeByEmail(@RequestBody Map<String,String> payload){
        
        Resume resume = resumeService.getResumeByEmail(payload.get("email"));
        if (resume == null) {
            return ResponseEntity.status(404).build();
        
        } else {
            return ResponseEntity.ok(resume);
        }
    }

}

package com.clearhire.backend.controller;
import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
        public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file) {
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
            
            resumeData.put("fileName", file.getOriginalFilename());
            resumeData.put("fileSize", file.getSize());
            resumeData.put("uploadStatus", "success");
            
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
    public Resume saveResume(@RequestBody Resume resume){
        try{
            Resume savedResume = resumeService.saveResume(resume);
            return savedResume;
        }
        catch (Exception e) {
            return null;
        }
    }

}

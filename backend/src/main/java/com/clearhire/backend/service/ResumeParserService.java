package com.clearhire.backend.service;
import java.io.IOException;
import java.util.Map;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.pdfbox.Loader;




@Service
public class ResumeParserService {

    private final OpenAIConnection openAIService;

    @Autowired
    public ResumeParserService(OpenAIConnection openAIService) {
        this.openAIService = openAIService;
    }

    public Map<String,Object>  parseResume(MultipartFile file) throws IOException {
        PDDocument document = null;
        try {
            document = Loader.loadPDF(file.getBytes());
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);

            return openAIService.extractResumeData(text);

        } catch (Exception e) {
            // Log the exception for debugging
            e.printStackTrace();
            // Re-throw the exception so it can be properly handled by the controller
            throw new IOException("Failed to parse resume: " + e.getMessage(), e);
        } finally {
            if (document != null) {
                document.close();
            }
        }
    }
}

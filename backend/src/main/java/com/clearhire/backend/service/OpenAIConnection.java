package com.clearhire.backend.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

// import io.github.cdimascio.dotenv.Dotenv;

@Service
public class OpenAIConnection {
    private static final String API_URL = "https://models.github.ai/inference";
    private static final String API_KEY = System.getenv("OPENAI_API_KEY");
    private static final String MODEL_NAME = "openai/gpt-4.1";
    public  Map<String,Object> extractResumeData(String resumeText) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
       JSONObject body = new JSONObject();
        body.put("model", MODEL_NAME);
        body.put("temperature", 0.7);
        body.put("max_tokens", 4000);
        body.put("top_p", 0.9);
        JSONArray messages = new JSONArray();
        messages.put(new JSONObject().put("role", "system").put("content", "You are a resume parser that extracts structured data from resumes. Return valid JSON only."));
       messages.put(new JSONObject().put("role", "user").put("content",
            "Here is a raw resume text:\n\n---\n" + resumeText + "\n---\n\n" +
            "Dont include experience that is not real or does not have start and end date and just random dont show much and if any of the field not found state not found.\n\n" +
            "Convert this resume into a JSON object with the following keys:\n\n" +
            "- name (string)\n" +
            "- email (string)\n" +
            "- phone (string)\n" +
            "- skills (array of strings)\n" +
            "- experience (array of strings)\n" +
            "- education (array of strings)\n\n" +
            "Return **only** valid, complete JSON. Make sure all strings are properly terminated and if experience is too big only show the highlighted part of the experience. If the resume is too long, summarize the key points in each section and alsoo  if the experience is not real(not having start and end date) and just random dont show much and if any of the field not found state not found. Also bold the headers(like experience roles) with start date and end date\n\n" 
        ));
        body.put("messages", messages);
          HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL + "/chat/completions")) 
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(body.toString()))
                .build();
         HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
         
        
         if (response.statusCode() != 200) {
             throw new Exception("API request failed with status code: " + response.statusCode() + 
                               " and body: " + response.body());
         }
         
         JSONObject jsonResponse = new JSONObject(response.body());
      
        if (!jsonResponse.has("choices") || jsonResponse.getJSONArray("choices").isEmpty()) {
            throw new Exception("Invalid API response format: missing choices");
        }
        
        String content = jsonResponse
                            .getJSONArray("choices")
                            .getJSONObject(0)
                            .getJSONObject("message")
                            .getString("content");

        try {

            JSONObject data = new JSONObject(content);
            Map<String, Object> result = new HashMap<>();
        
            for (String key : data.keySet()) {
                Object value = data.get(key);
              
                if (value instanceof JSONArray) {
                    result.put(key, ((JSONArray)value).toList());
                } else {
                    result.put(key, value);
                }
            }
            return result;
        } catch (Exception e) {
          
            try {
            
                String jsonContent = content;
              
                if (!content.trim().startsWith("{")) {
                    int startIndex = content.indexOf('{');
                    if (startIndex >= 0) {
                        jsonContent = content.substring(startIndex);
                    }
                }
                
             
                int endIndex = jsonContent.lastIndexOf('}');
                if (endIndex >= 0 && endIndex < jsonContent.length() - 1) {
                    jsonContent = jsonContent.substring(0, endIndex + 1);
                }
                
                JSONObject recoveredData = new JSONObject(jsonContent);
                Map<String, Object> result = new HashMap<>();
                
             
                for (String key : recoveredData.keySet()) {
                    Object value = recoveredData.get(key);
                 
                    if (value instanceof JSONArray) {
                        result.put(key, ((JSONArray)value).toList());
                    } else {
                        result.put(key, value);
                    }
                }
                return result;
            } catch (Exception recoverException) {
                Map<String, Object> fallbackResult = new HashMap<>();
                fallbackResult.put("name", "Unknown");
                fallbackResult.put("email", "");
                fallbackResult.put("phone", "");
                
               
                JSONArray emptySkills = new JSONArray();
                JSONArray emptyExperience = new JSONArray();
                JSONArray emptyEducation = new JSONArray();
                fallbackResult.put("skills", emptySkills.toList());
                fallbackResult.put("experience", emptyExperience.toList());
                fallbackResult.put("education", emptyEducation.toList());
                
                fallbackResult.put("parseError", "Failed to parse resume: " + e.getMessage());
                fallbackResult.put("rawContent", content.length() > 1000 ? content.substring(0, 1000) + "..." : content);
                
                return fallbackResult;
            }
        }
    }
}

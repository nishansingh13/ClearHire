import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AIInterviewer = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `
You are a technical interviewer focused on Data Structures and Algorithms (DSA).
Your task is to:

1. Ask **one concise DSA question** at a time. No greetings or explanations — start directly with the question.
2. After the candidate answers:
   - **Carefully check their logic and time complexity.**
   - If it's incorrect or not optimal, **point it out clearly** and ask how they would improve it.
   - If they say O(n) but the correct is O(n log n), correct them.
3. Never say "Great" or "Well done" unless the answer is truly correct and optimal.
4. Ask follow-up questions if necessary to probe deeper understanding.
5. Be strict, technical, and focused. Don't be friendly or polite. Just do your job as a tough interviewer.
`
    },
    {
      role: "user",
      content: "Ask a DSA question now. Keep it under 100 characters."
    }
  ]);

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("Click \"Start Interview\" to begin your technical interview...");
  const [userResponse, setUserResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioRef = useRef(new Audio());
  const playerRef = useRef(null);

  const getNextQuestion = async () => {
    try {
      setIsLoading(true);
      setCurrentQuestion("Thinking of next question...");
      
      const res = await axios.post('http://localhost:3000/ask-gpt', { messages });

      if (res.status === 200) {
        const question = res.data.question;
        const updatedMessages = [...messages, { role: "assistant", content: question }];
        setMessages(updatedMessages);

        // Text-to-speech
        const ttsRes = await axios.post('http://localhost:3000/speak', { text: question }, {
          responseType: 'blob'
        });

        const audioBlob = ttsRes.data;
        const audioUrl = URL.createObjectURL(audioBlob);
        audioRef.current.src = audioUrl;

        audioRef.current.onloadeddata = () => {
          setCurrentQuestion(question);
          audioRef.current.play();
        };

        setUserResponse('');
        return question;
      } else {
        throw new Error("Failed to get question from GPT");
      }
    } catch (error) {
      console.error('Error:', error);
      setCurrentQuestion(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const submitUserResponse = async () => {
    const response = userResponse.trim();
    if (!response) {
      alert('Please enter your response before submitting.');
      return;
    }
    
    const updatedMessages = [...messages, { role: "user", content: response }];
    setMessages(updatedMessages);
    await getNextQuestion();
  };

  const startInterview = async () => {
    setInterviewStarted(true);
    setCurrentQuestion("Getting your first question...");
    await getNextQuestion();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        if (playerRef.current) {
          playerRef.current.src = URL.createObjectURL(blob);
          playerRef.current.style.display = 'block';
        }

        const formData = new FormData();
        formData.append('audio', blob, 'response.webm');

        try {
          const response = await axios.post('http://localhost:3000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          console.log('Audio uploaded successfully:', response.data);

          if (response.data.transcript) {
            setUserResponse(response.data.transcript);
            // Auto-submit after transcript is received
            const updatedMessages = [...messages, { role: "user", content: response.data.transcript }];
            setMessages(updatedMessages);
            await getNextQuestion();
          } else {
            console.warn('No transcript returned from server');
          }
        } catch (error) {
          console.error('Error uploading audio:', error);
          alert('Failed to transcribe audio. Please try again.');
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop all audio tracks to release microphone
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      submitUserResponse();
    }
  };

  return (
    <div>
      <h1>AI Interviewer</h1>
      
      {!interviewStarted && (
        <div>
          <button onClick={startInterview} disabled={isLoading}>
            Start Interview
          </button>
        </div>
      )}
      
      <div>
        <strong>Interviewer:</strong> {currentQuestion}
      </div>
      
      {interviewStarted && (
        <div>
          <div>
            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your response here... (Ctrl+Enter to submit)"
              rows={4}
              cols={50}
            />
          </div>
          
          <div>
            <button onClick={submitUserResponse} disabled={isLoading}>
              Submit Response
            </button>
            
            <button onClick={getNextQuestion} disabled={isLoading}>
              Next Question
            </button>
          </div>
          
          <div>
            <button 
              onClick={startRecording} 
              disabled={isRecording || isLoading}
            >
              {isRecording ? 'Recording...' : 'Start Recording'}
            </button>
            
            <button 
              onClick={stopRecording} 
              disabled={!isRecording}
            >
              Stop Recording
            </button>
          </div>
          
          <audio ref={playerRef} controls style={{ display: 'none' }} />
        </div>
      )}
    </div>
  );
};

export default AIInterviewer;

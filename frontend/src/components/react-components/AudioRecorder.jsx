import React, { useState, useRef } from 'react';
import axios from 'axios';

const AudioRecorder = ({ onTranscriptReceived, disabled = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const playerRef = useRef(null);

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
        setIsProcessing(true);
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        
        // Show audio player
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

          if (response.data.transcript) {
            onTranscriptReceived(response.data.transcript);
          } else {
            console.warn('No transcript returned from server');
            alert('No transcript received. Please try again.');
          }
        } catch (error) {
          console.error('Error uploading audio:', error);
          alert('Failed to transcribe audio. Please try again.');
        } finally {
          setIsProcessing(false);
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

  return (
    <div>
      <button 
        onClick={startRecording} 
        disabled={isRecording || disabled || isProcessing}
      >
        {isRecording ? 'Recording...' : 'Start Recording'}
      </button>
      
      <button 
        onClick={stopRecording} 
        disabled={!isRecording}
      >
        Stop Recording
      </button>

      {isProcessing && <div>Processing audio...</div>}
      
      <audio ref={playerRef} controls style={{ display: 'none' }} />
    </div>
  );
};

export default AudioRecorder;

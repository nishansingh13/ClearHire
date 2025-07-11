import React, { useRef, useEffect } from 'react';
import axios from 'axios';

const TextToSpeech = ({ text, onAudioReady, autoPlay = false }) => {
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (text) {
      generateSpeech();
    }
  }, [text]);

  const generateSpeech = async () => {
    try {
      const response = await axios.post('http://localhost:3000/speak', { text }, {
        responseType: 'blob'
      });

      const audioBlob = response.data;
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;

      if (autoPlay) {
        audioRef.current.onloadeddata = () => {
          audioRef.current.play();
        };
      }

      if (onAudioReady) {
        onAudioReady(audioRef.current);
      }
    } catch (error) {
      console.error('TTS Error:', error);
    }
  };

  const playAudio = () => {
    if (audioRef.current.src) {
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };

  return (
    <div>
      <button onClick={playAudio}>Play Audio</button>
      <button onClick={pauseAudio}>Pause Audio</button>
      <audio ref={audioRef} controls style={{ display: 'none' }} />
    </div>
  );
};

export default TextToSpeech;

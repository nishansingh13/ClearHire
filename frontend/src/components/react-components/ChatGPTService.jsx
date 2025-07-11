import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTService = ({ messages, onQuestionReceived, onError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getNextQuestion = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:3000/ask-gpt', { messages });

      if (response.status === 200) {
        const question = response.data.question;
        if (onQuestionReceived) {
          onQuestionReceived(question);
        }
        return question;
      } else {
        throw new Error("Failed to get question from GPT");
      }
    } catch (error) {
      console.error('Error:', error);
      if (onError) {
        onError(error.message);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getNextQuestion,
    isLoading
  };
};

export default ChatGPTService;

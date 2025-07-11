import React, { useState } from 'react';
import AIInterviewer from './AIInterviewer';
import AudioRecorder from './AudioRecorder';
import TextToSpeech from './TextToSpeech';

// Main component that combines all functionality
const InterviewApp = () => {
  return (
    <div>
      <AIInterviewer />
    </div>
  );
};

// Individual components for more granular use
export { 
  AIInterviewer,
  AudioRecorder, 
  TextToSpeech,
  InterviewApp as default
};

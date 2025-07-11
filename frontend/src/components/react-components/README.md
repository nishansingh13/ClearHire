# React AI Interviewer Components

This folder contains React components converted from the vanilla JavaScript AI Interviewer app.

## Components

### 1. `AIInterviewer.jsx` 
Main component that handles the entire interview flow including:
- Starting interviews
- Managing conversation state
- Text-to-speech for questions
- Speech-to-text for responses
- User input handling

### 2. `AudioRecorder.jsx`
Standalone component for audio recording functionality:
- Records user audio
- Uploads to transcription service
- Returns transcript via callback

### 3. `TextToSpeech.jsx`
Component for converting text to speech:
- Generates audio from text
- Auto-play option
- Audio controls

### 4. `ChatGPTService.jsx`
Service component for AI question generation:
- Handles API calls to GPT
- Manages conversation context
- Error handling

## Usage

### Use the complete interview app:
```jsx
import InterviewApp from './react-components';

function App() {
  return <InterviewApp />;
}
```

### Use individual components:
```jsx
import { AudioRecorder, TextToSpeech } from './react-components';

function MyComponent() {
  const handleTranscript = (transcript) => {
    console.log('Received:', transcript);
  };

  return (
    <div>
      <AudioRecorder onTranscriptReceived={handleTranscript} />
      <TextToSpeech text="Hello world" autoPlay={true} />
    </div>
  );
}
```

## Dependencies Required

Add these to your React project's package.json:

```bash
npm install axios
```

## Backend Requirements

These components expect a backend server running on `http://localhost:3000` with the following endpoints:

- `POST /ask-gpt` - For AI question generation
- `POST /speak` - For text-to-speech
- `POST /upload` - For speech-to-text transcription

Make sure your existing server.js is running for the components to work properly.

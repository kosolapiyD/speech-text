import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';

import './App.css';

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [isListening, setIsListening] = useState(listening);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleListen = () => {
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  };

  const handleListenClick = () => {
    setIsListening(!isListening);
  };

  console.log('isListening APP :>> ', isListening);

  return (
    <div className='App'>
      <div className='container'>
        <div className='app-box'>
          <span>Microphone: {isListening ? 'on' : 'off'}</span>
          <div className='button-box'>
            <Button
              onClick={handleListenClick}
              variant='outlined'
              startIcon={isListening ? <SettingsVoiceIcon /> : <MicIcon />}
            >
              {isListening ? 'Listening...' : 'Start Listening'}
            </Button>
          </div>
          <div className='result-box'>
            <div className='result-title'>
              <span>Result:</span>
            </div>
            <div className='text-result'>
              <span>{transcript}</span>
            </div>
          </div>
          <Button variant='outlined' size='small' onClick={resetTranscript}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;

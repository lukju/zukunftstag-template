import React, { useCallback, useState } from 'react';

import { Container } from 'reactstrap';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';


const speechsdk = require('microsoft-cognitiveservices-speech-sdk')
const SPEECH_KEY = "61f98fede878429c970ec31e68c51184";
const SPEECH_REGION = "westeurope";

export const SpeechToText = () => {
    const [displayText, setDisplayText] = useState("Bereit...");
    const [isRecording, setIsRecording] = useState(false);

    const sttFromMic = useCallback(() => {
        setIsRecording(true);
        const speechConfig = speechsdk.SpeechConfig.fromSubscription (SPEECH_KEY, SPEECH_REGION);
        speechConfig.speechRecognitionLanguage = 'de-DE';
        
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        setDisplayText('Mic ist aktiv...');

        recognizer.recognizeOnceAsync((result: any) => {
            let displayText;
            if (result.reason === ResultReason.RecognizedSpeech) {
                displayText = `RECOGNIZED: Text=${result.text}`
            } else {
                displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            setIsRecording(false);
            setDisplayText(displayText);
        });
    }, []);

    return (
        <Container className="app-container">
            <h1 className="display-4 mb-3">Speech sample app</h1>

            <div className="row main-container">
                <div className="col-6">
                    <i className="fas fa-microphone fa-lg mr-2" style={{color: isRecording ? 'red': 'green'}} onClick={() => sttFromMic()}></i>
                    { isRecording && <i className="fas fa-circle-notch fa-spin"></i> }
                </div>
                <div className="col-6 output-display rounded">
                    <code>{displayText}</code>
                </div>
            </div>
        </Container>
    );
}
import React, { useCallback, useState } from 'react';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';


const speechsdk = require('microsoft-cognitiveservices-speech-sdk')
const SPEECH_KEY = "61f98fede878429c970ec31e68c51184";
const SPEECH_REGION = "westeurope";

export const SpeechToText = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [hint, setHint] = useState<string>("Bereit...");
    const [recognizedText, setRecognizedText] = useState<string>();

    const sttFromMic = useCallback(() => {
        const speechConfig = speechsdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
        speechConfig.speechRecognitionLanguage = 'de-DE';

        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        setIsRecording(true);
        setRecognizedText("");
        setHint('Mikrophon ist aktiv...');

        recognizer.recognizeOnceAsync((result: any) => {
            if (result.reason === ResultReason.RecognizedSpeech) {
                setRecognizedText(result.text);
                setHint("");
            } else {
                setHint('Die Spracherkennung wurde abgebrochen oder konnte nichts erkennen. Stellen Sie sicher, dass das Mikrophon funktioniert.');
            }
            setIsRecording(false);
        });
    }, []);

    return (
        <div className="row" style={{ margin: 0 }}>
            <div className="col-3" style={{ fontSize: '2.5em' }}>
                <i className="fas fa-microphone fa-lg mr-2" style={{ color: isRecording ? 'red' : 'green' }} onClick={() => sttFromMic()}></i>
                {isRecording && <i style={{ marginLeft: '20px' }} className="fas fa-circle-notch fa-spin"></i>}
            </div>
            <div className="col-9 output-display rounded" style={{ padding: '20px' }}>
                {hint && <code>{hint}</code>}
                {recognizedText && <div style={{ color: 'white' }}>{recognizedText}</div>}
            </div>
        </div>
    );
}
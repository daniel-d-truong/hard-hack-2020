import React from 'react';
import './style.css';

// Represents the speech recognition object.
const recognition = new window.webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

// Represents the current status of whether the microphone is currently listening to sound.
let recognizing = false;

recognition.onstart = () => {
    recognizing = true;
}

recognition.onend = () => {
    recognizing = false;
}

recognition.onresult = (event) => {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        console.log(event.results[i][0].transcript);
    }
}

const makeRecognition = (event) => {
    if (recognizing) {
        recognition.stop();
    } else {
        recognition.start();
    }
  }

const Button = () => {
    return (
        <div onClick={makeRecognition} className="button">
            <p>Microphone</p>
        </div>
    )
}

export default Button;
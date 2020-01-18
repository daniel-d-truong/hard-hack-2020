import React from 'react';
import './App.css';
import Button from './components/Button';

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
        const word = event.results[i][0].transcript;
        console.log(word);
        if (word.indexOf(' ') < 0) {
            // const request = new Request('/send', {method: 'POST', body: `{"word": "oof"}`});
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "word": word
                })
            };
            const url = '/sendtodragon';
            fetch(url, request)
                .then(response => response.json())
                .then((data) => {
                    if (!data["wordSent"]) {
                        recognition.stop();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }
}

const makeRecognition = (event) => {
    console.log("button pressed");
    if (recognizing) {
        recognition.stop();
    } else {
        recognition.start();
    }
}

function App() {
  return (
    <div className="App">
      <h1>Blind Help</h1>
      <Button recogFunc={makeRecognition}/>
    </div>
  );
}

export default App;

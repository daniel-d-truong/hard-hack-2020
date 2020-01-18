const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

// Needed to process body parameters for POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Variables storing where each object is located in which quadrant (1-4)
const quadrantList = ["", "", "", ""];

// List indicating where each quadrant is: [top left, top right, bottom right, bottom left].
// The top left corner will always be where items are placed and/or dropped off.
const quadrantLocations = [1, 2, 3, 4];

app.post('/sendtodragon', (req, res) => {
    const word = req.body.word;
    const response = {
        "wordReceived": word,
        "wordSent": false
    };
    if (word in quadrantList) {
        // Logic to send the object name and the amount of times the place should rotate
        const quadrantWordIdx = quadrantList.indexOf(word);
        const quadrantLocation = quadrantLocations.indexOf(quadrantWordIdx);
        const numOfRotations = (quadrantLocation) ? 4 - quadrantLocation : 0;
        repsonse["wordSent"] = true;

        // TODO: Logic to send object name to the dragonboard.
    } else {

    }
    res.status(200).send(response);
});

app.get('/getquadrants', (req, res) => {
    res.json({
        "locations": quadrantLocations,
        "order": quadrantList
    });
});

// Post reqeust for data sent from the dragon board
app.post('/receivedfromdragon', (req, res) => {

});
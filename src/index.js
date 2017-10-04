const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

// No worries with X references
app.use(cors());

// TODO to deploy on heroku, uncomment this line
// const SERVER_PORT = process.env.PORT;

const SERVER_PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Used when receiving a get request. Reads the file and gives it back
   to the service asking for it */
app.get('/data', (req, res) => {
  fs.readFile('data.txt', (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

// TODO Must have application/json as a Content-Type header
/* Used when getting a post request from the module updating the data.
*  Saves the content into a file for later use */
app.post('/data', (req, res) => {
  fs.writeFile('data.txt', JSON.stringify(req.body), (err) => {
    // If there is an error reading the file, return the error code
    if (err) {
      res.sendStatus(500);
    }

    // Otherwise send the response code corresponding
    res.sendStatus(200);
    console.log('Successfully saved');
  });
});

// Listening port for the app
app.listen(SERVER_PORT);

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/data', (req, res) => {
  console.log('Get Data');
  res.send('Hello World');
});

app.post('/data', (req, res) => {
  console.log('Post Data');
  console.log(req.body);
  res.send(req.body.entreprise);
});

app.listen(3000);

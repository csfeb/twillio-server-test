const express = require('express');
const app = express();
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  // Create TwiML response
  const twiml = new VoiceResponse();

  if (req.body) {
    console.log('Incoming call...');
    twiml.say('Hello Consumer team! This is a Twilio server.');
    twiml.say(`You're calling from ${req.body.From} located in ${req.body.FromState}`);
  } else {
    twiml.say('Hello world');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

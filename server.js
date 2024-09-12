const http = require('http');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const port = process.env.PORT;

http
  .createServer((req, res) => {
    console.log(`Incoming call with params; ${req.parameters}`);
    const caller = req.parameters.from;
    const callerState = req.parameters.from_state;

    // Create TwiML response
    const twiml = new VoiceResponse();

    twiml.say('Hello Consumer team! This is a Twilio server.');
    twiml.say(`You're calling from ${caller} located in ${callerState}`);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  })
  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

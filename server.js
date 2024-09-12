const http = require('http');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const port = process.env.PORT;

http
  .createServer((req, res) => {
    // Create TwiML response
    const twiml = new VoiceResponse();

    if (req.parameters) {
      console.log(`Incoming call with params; ${req.parameters}`);
      const caller = req.parameters.from;
      const callerState = req.parameters.from_state;

      twiml.say('Hello Consumer team! This is a Twilio server.');
      twiml.say(`You're calling from ${caller} located in ${callerState}`);
    } else {
      twiml.say('Hello world');
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  })
  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

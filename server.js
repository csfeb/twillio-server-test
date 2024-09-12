const http = require('http');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const port = process.env.PORT;

http
  .createServer((req, res) => {
    // Create TwiML response
    const twiml = new VoiceResponse();

    twiml.say('Hello Consumer team! This is Feb\'s Twilio server.');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  })
  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

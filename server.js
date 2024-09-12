const http = require('http');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const port = process.env.PORT;

function respond(body, res) {
  // Create TwiML response
  const twiml = new VoiceResponse();

  if (body.from) {
    console.log('Incoming call...');
    const caller = body.from;
    const callerState = body.from_state;

    twiml.say('Hello Consumer team! This is a Twilio server.');
    twiml.say(`You're calling from ${caller} located in ${callerState}`);
  } else {
    twiml.say('Hello world');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
}

http
  .createServer((req, res) => {
    let body = [];
    req
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        if (body) {
          json = JSON.parse(body);
          console.log(json);
          respond(json, res);
        } else {
          respond({}, res);
        }
      });
  })
  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

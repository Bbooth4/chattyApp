const express = require('express');
const SocketServer = require('ws').Server;
const uuidV4 = require('uuid/v4');

// Set the port to 5000
const PORT = 5000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


// Create the WebSockets server
const wss = new SocketServer({ server });

// console.log(wss);
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');

  const clientId = uuid();

  ws.on('message', incomingMessage = (message) => {
    console.log('message ' + message)
    let parsedMessage = JSON.parse(message); 
    let id = parsedMessage.clientId = uuid; 
    let finalMessage = {
      id: id, 
      username: message.username, 
      content: message.content
    }

    ws.send('message', JSON.stringify(finalMessage));
  });

  ws.on('close', () => console.log('Client disconnected'));
});

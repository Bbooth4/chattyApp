const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

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

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  const clientId = uuid();
  // broadcast to everyone else 
  ws.on('message', incomingMessage = (message) => {
    console.log(message)
    wss.clients.forEach(function each(client) {
      let parsedMessage = JSON.parse(message); 
      console.log('reached the pasrsedMessage before the switch')

      switch (parsedMessage.type) {
        case 'post-new-message':
          let id = clientId; 
          let fullMessage = {
            id: id, 
            username: parsedMessage.username, 
            content: parsedMessage.content
          }
          client.send(JSON.stringify(fullMessage));
          break; 
        case 'post-new-user':
          let newUsername = {
            currentUser: parsedMessage
          }
          client.send(JSON.stringify(newUsername));
          break; 
        default:
          console.error('Failed to send back');
       }
    })
  });

  ws.on('close', () => console.log('Client disconnected'));
});

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
// let totalOnlineUsers = 0; 

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (client) => {
  console.log('Client connected');
  let loggedInUsers = {
    type: 'connected',
    onlineUsers: wss.clients.size
  }
  client.send(JSON.stringify(loggedInUsers));

  const clientId = uuid();
  // broadcast to everyone else 
  client.on('message', incomingMessage = (message) => {
    console.log(message)
    wss.clients.forEach(function each(client) {
      let parsedMessage = JSON.parse(message); 
      console.log('reached the parsedMessage before the switch')
      let id = clientId; 

      switch (parsedMessage.type) {
        case 'post-new-message':
          console.log('entered post-new-message');
          let fullMessage = {
            type: 'post-new-message',
            id: id, 
            username: parsedMessage.username, 
            content: parsedMessage.content
          }
          client.send(JSON.stringify(fullMessage));
          break; 

        case 'post-notification':
          console.log('entered post-notification');
          let notification = {
            type: 'incoming-notification',
            id: id, 
            name: parsedMessage.name,
            notification: parsedMessage.notification
          }
          client.send(JSON.stringify(notification));
          break; 

        default:
          console.error('Failed to send back');
       }
    })
  });

  client.on('close', (message) => {
    // totalOnlineUsers--;
    console.log('Client disconnected');
    // let loggedInUsers = {
    //   type: 'disconnected',
    //   onlineUsers: totalOnlineUsers
    // }
    // client.send(JSON.stringify(loggedInUsers));
  });
});

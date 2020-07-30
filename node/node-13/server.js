const express = require('express');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const WebSocket = require('ws');

const NOTIFICATION = 'This is notification';
const NOTIFY_TIMEOUT = 7000;
const THIN_OUT_TIMEOUT = 30000;
const WSS_PORT = 8080;
const SERVER_PORT = 9000;

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server, port: WSS_PORT });

wss.on('connection', onNewConnection);

function onNewConnection(ws) {
  ws.id = uuidv4();
  console.log(`New client: ${ws.id}`);

  ws.isAlive = true;
  ws.on('pong', () => (ws.isAlive = true));

  ws.on('message', message => {
    console.log(`Message from ${ws.id}: ${message}`);
  });

  ws.send(JSON.stringify({ type: 'info', text: 'Connected' }));
}

const thinOut = () => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) {
      ws.terminate();
      return;
    }

    ws.isAlive = false;
    ws.ping(null, false, true);
  });
};

setInterval(thinOut, THIN_OUT_TIMEOUT);

const notify = () => {
  wss.clients.forEach(ws => {
    ws.send(JSON.stringify({ type: 'message', text: NOTIFICATION }));
  });
};

setInterval(notify, NOTIFY_TIMEOUT);

server.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${server.address().port}`);
});

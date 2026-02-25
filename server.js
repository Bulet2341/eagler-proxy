const http = require('http');
const WebSocket = require('ws');

const VPS_HOST = '193.149.164.160';
const VPS_PORT = 8081;

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  const proxy = new WebSocket(`ws://${VPS_HOST}:${VPS_PORT}`);

  ws.on('message', (msg) => proxy.send(msg));
  proxy.on('message', (msg) => ws.send(msg));

  ws.on('close', () => proxy.close());
  proxy.on('close', () => ws.close());
});

server.listen(process.env.PORT || 443, () => {
  console.log('Eaglercraft proxy running');
});

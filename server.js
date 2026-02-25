const http = require('http');
const WebSocket = require('ws');
const url = require('url');

const VPS_HOST = 'YOUR_VPS_IP'; // public IPv4 of your VPS
const VPS_PORT = 8081;

const server = http.createServer();

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  // Connect to EaglerXServer on VPS
  const proxy = new WebSocket(`ws://${VPS_HOST}:${VPS_PORT}`);

  // Forward messages both ways
  ws.on('message', (msg) => proxy.send(msg));
  proxy.on('message', (msg) => ws.send(msg));

  ws.on('close', () => proxy.close());
  proxy.on('close', () => ws.close());
});

server.listen(process.env.PORT || 8080, () => {
  console.log('Reverse proxy running');
});

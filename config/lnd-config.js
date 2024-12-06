// lnd-config.js
const { Client } = require('ln-service');

const lnd = new Client({
  socket: process.env.LND_SOCKET || '127.0.0.1:10004',  // The gRPC server address of your Polar node
  macaroon: process.env.LND_MACAROON || './path_to_macaroon_file',
  cert: process.env.LND_CERT || './path_to_tls_certificate',
});

module.exports = lnd;

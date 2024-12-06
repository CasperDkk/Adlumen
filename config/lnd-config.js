// lnd-config.js
const { authenticatedLndGrpc } = require('ln-service');

// Lightning Network Node Configuration
const config = {
  socket: process.env.LND_SOCKET || '127.0.0.1:10004', // The gRPC server address of your Polar node
  macaroon: process.env.LND_MACAROON || './path_to_macaroon_file', // Path to admin macaroon
  cert: process.env.LND_CERT || './path_to_tls_certificate', // Path to TLS certificate
};

// Create an authenticated LND instance
const { lnd } = authenticatedLndGrpc(config);

module.exports = lnd;


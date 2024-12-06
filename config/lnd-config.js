// lnd-config.js
const { authenticatedLndGrpc } = require('ln-service');

// Lightning Network Node Configuration using the config object
const lndConfig = {
  socket: config.lndHost,  // The gRPC server address of your Polar node
  macaroon: config.macaroonPath,  // Path to admin macaroon
  cert: config.lndCertPath,  // Path to TLS certificate
};

// Create an authenticated LND instance
const { lnd } = authenticatedLndGrpc(config);

module.exports = lnd;


const { authenticatedLndGrpc } = require('ln-service');

const config = {
  cert: process.env.LND_CERT_PATH,  // Path to your LND TLS certificate
  macaroon: process.env.LND_MACAROON_PATH,  // Path to your macaroon
  socket: process.env.LND_SOCKET 
};

const { lnd } = authenticatedLndGrpc(config);

module.exports = { lnd };

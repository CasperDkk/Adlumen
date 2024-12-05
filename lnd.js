const { authenticatedLndGrpc } = require('ln-service');

const lndConfig = {
  cert: process.env.LND_CERT_PATH,          // Path to TLS cert
  macaroon: process.env.LND_MACAROON_PATH,  // Path to admin macaroon
  socket: process.env.LND_SOCKET,          // LND RPC host
};

const { lnd } = authenticatedLndGrpc(lndConfig);

module.exports = lnd;

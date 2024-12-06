const { authenticatedLndGrpc } = require('ln-service');
const fs = require('fs');
const path = require('path');

const cert = fs.readFileSync(path.join(__dirname, 'path/to/tls.cert'));
const macaroon = fs.readFileSync(path.join(__dirname, 'path/to/admin.macaroon')).toString('hex');

const lnd = authenticatedLndGrpc({
  cert: cert.toString(),
  macaroon,
  socket: '127.0.0.1:10009', // Node's IP and port
  server_name: 'localhost', // Match your node's hostname
}).lnd;

module.exports = lnd;

module.exports = {
    serverPort: 8280,
    serverHost: 'localhost',
    lndProto: path.join(__dirname, 'rpc.proto'),  // Path to your gRPC proto file
    lndHost: 'localhost:8084',  // The gRPC server address of your Polar node
    lndCertPath: path.join(__dirname, '..', 'lnd.cert'),  // Path to TLS certificate
    macaroonPath: path.join(__dirname, '..', 'admin.macaroon'),  // Path to macaroon file
    dataPath: path.join(__dirname, '..', 'data'),  // Path to data directory
    loglevel: 'info',  // Log level
    logfile: 'lncliweb.log',  // Log file name
    lndLogFile: path.join(os.homedir(), '.lnd', 'logs', 'bitcoin', 'testnet', 'lnd.log'),  // Path to LND log file
  };
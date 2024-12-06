const express = require('express');
const bodyParser = require('body-parser');
const adRoutes = require('./routes/adRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const logger = require('./utils/logger'); 
const { fetchWalletInfo } = require('./services/lightningService');
const config = require('./config/defaults');  // Import the config

require('dotenv').config();

const app = express();

// Log .env variables
console.log('LND Configuration:');
console.log(`LND Cert Path: ${config.lndCertPath}`);
console.log(`LND Macaroon Path: ${config.macaroonPath}`);
console.log(`LND Host: ${config.lndHost}`);
console.log(`Server Port: ${config.serverPort}`);

// Middleware
app.use(express.json());  

// Routes
app.use('/api/ads', adRoutes); // API routes to have prefix /api
app.use('/api/payments', paymentRoutes);

// Start the server
const PORT = process.env.PORT || config.serverPort;
app.listen(PORT, async () => {
  try {
    await fetchWalletInfo(); // Test the Lightning Network connection
    logger.info(`Server running on http://localhost:${PORT}`); 
  } catch (error) {
    logger.error('Error connecting to the Lightning node:', error);
    process.exit(1); // Exit process if Lightning connection fails
  }
});

const express = require('express');
const bodyParser = require('body-parser');
const adRoutes = require('./routes/adRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const logger = require('./utils/logger'); 
const { getWalletInfo } = require('./services/lightningService');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());  

// Routes
app.use('/api/ads', adRoutes); // API routes to have prefix /api
app.use('/api/payments', paymentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await getWalletInfo(); // Test the Lightning Network connection
    logger.info(`Server running on http://localhost:${PORT}`); 
  } catch (error) {
    logger.error('Error connecting to the Lightning node:', error);
    process.exit(1); // Exit process if Lightning connection fails
  }
});

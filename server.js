const express = require('express');
const bodyParser = require('body-parser');
const adRoutes = require('./routes/adRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { connectDB } = require('./config/db-config');
const logger = require('./utils/logger'); 

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
    await connectDB(); 
    logger.info(`Server running on http://localhost:${PORT}`); 
  } catch (error) {
    logger.error('Error connecting to the database:', error);
    process.exit(1); // Exit process if DB connection fails
  }
});

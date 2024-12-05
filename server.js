const express = require('express');
const bodyParser = require('body-parser');
const adRoutes = require('./routes/adRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { connectDB } = require('./config/db-config');
const logger = require ('./utils/logger')

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/ads', adRoutes);
app.use('/api/payments', paymentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB(); // Initialize DB connection
  console.log(`Server running on http://localhost:${PORT}`);
});



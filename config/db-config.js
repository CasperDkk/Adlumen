const { Sequelize } = require('sequelize');

// Load the DB path from environment variables
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH || './db/database.sqlite',  
});

// Test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();  // Test connection to DB
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);  // Exit the process if DB connection fails
  }
};

module.exports = { sequelize, connectDB };

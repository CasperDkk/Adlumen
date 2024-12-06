const sqlite3 = require('sqlite3').verbose();

const connectDB = () => {
  const dbPath = process.env.DB_PATH || './db/database.sqlite';
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });
  return db;
};

module.exports = { connectDB };

//db schema for payment API

const db = require('./database');

// Create Payments Table
db.run(`
  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    adId TEXT,
    paymentId TEXT,
    amount INTEGER,
    status TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Function to log a payment
async function logPayment(adId, paymentId, amount, status) {
  const query = `INSERT INTO payments (adId, paymentId, amount, status) VALUES (?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(query, [adId, paymentId, amount, status], function (err) {
      if (err) reject(err);
      resolve({ id: this.lastID });
    });
  });
}

// Get payments by Ad ID
async function getPaymentsByAdId(adId) {
  const query = `SELECT * FROM payments WHERE adId = ?`;
  return new Promise((resolve, reject) => {
    db.all(query, [adId], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

module.exports = { logPayment, getPaymentsByAdId };

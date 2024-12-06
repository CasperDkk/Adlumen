const db = require('../config/db-config');

// Create the Impressions table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS impressions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    adId TEXT NOT NULL,
    userId TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Function to add a new impression
async function createImpression(adId, userId) {
  const query = `INSERT INTO impressions (adId, userId) VALUES (?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(query, [adId, userId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
}

// Function to get impressions by adId
async function getImpressionsByAdId(adId) {
  const query = `SELECT * FROM impressions WHERE adId = ?`;
  return new Promise((resolve, reject) => {
    db.all(query, [adId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Function to get all impressions
async function getAllImpressions() {
  const query = `SELECT * FROM impressions`;
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  createImpression,
  getImpressionsByAdId,
  getAllImpressions,
};

//db schema for ads

const db = require('../config/db-config');

// Create Ads Table
db.run(`
  CREATE TABLE IF NOT EXISTS ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    adId TEXT UNIQUE,
    advertiser TEXT,
    impressions INTEGER DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Function to create a new ad
async function createAd(adId, advertiser) {
  const query = `INSERT INTO ads (adId, advertiser) VALUES (?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(query, [adId, advertiser], function (err) {
      if (err) reject(err);
      resolve({ id: this.lastID });
    });
  });
}

// Function to track an impression
async function trackImpression(adId) {
  const query = `UPDATE ads SET impressions = impressions + 1 WHERE adId = ?`;
  return new Promise((resolve, reject) => {
    db.run(query, [adId], function (err) {
      if (err) reject(err);
      resolve({ changes: this.changes });
    });
  });
}

// Get ad by ID
async function getAd(adId) {
  const query = `SELECT * FROM ads WHERE adId = ?`;
  return new Promise((resolve, reject) => {
    db.get(query, [adId], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

module.exports = { createAd, trackImpression, getAd };

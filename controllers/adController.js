//logic for managing ads and impressions

const Impression = require('../models/impressionModel');

// Track ad impression
async function trackImpression(req, res) {
  const { adId, userId } = req.body;

  try {
    const impression = await Impression.create({ adId, userId, timestamp: new Date() });
    res.status(201).json({ success: true, data: impression });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { trackImpression };

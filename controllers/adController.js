// logic for managing ads and impressions

const adModel = require('../models/adModel'); // Import the in-memory ad model

// Track ad impression
async function trackImpression(req, res) {
  const { adId, userId } = req.body;

  try {
    // Find the ad by adId or create a new one if not exists
    let ad = adModel.getAd(adId);
    if (!ad) {
      ad = adModel.createAd(adId, 'default_advertiser');  // Or provide the advertiser dynamically
    }

    // Track the impression (in-memory)
    adModel.trackImpression(adId);

    // Return the updated ad with the impression count
    res.status(200).json({ success: true, data: ad });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { trackImpression };

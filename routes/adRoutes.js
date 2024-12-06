const express = require('express');
const { createAd, trackImpression, getAd } = require('./adModel');
const router = express.Router();

// Create a new ad
router.post('/create', async (req, res) => {
  const { adId, advertiser } = req.body;
  try {
    const ad = await createAd(adId, advertiser);
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Track an impression
router.post('/track', async (req, res) => {
  const { adId } = req.body;
  try {
    await trackImpression(adId);
    res.status(200).json({ message: 'Impression tracked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get ad details
router.get('/:adId', async (req, res) => {
  const { adId } = req.params;
  try {
    const ad = await getAd(adId);
    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

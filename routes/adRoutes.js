const express = require('express');
const { createAd, trackImpression, getAd } = require('../models/adModel');
const router = express.Router();

// Create a new ad
router.post('/create', async (req, res) => {
  const { adId, advertiser } = req.body;
  if (!adId || !advertiser) {
    return res.status(400).json({ error: 'Missing adId or advertiser' });
  }
  try {
    const ad = await createAd(adId, advertiser);
    res.status(201).json(ad);
  } catch (error) {
    console.error('Error creating ad:', error.message);
    res.status(500).json({ error: 'Failed to create ad' });
  }
});

// Track an impression
router.post('/track', async (req, res) => {
  const { adId } = req.body;
  if (!adId) {
    return res.status(400).json({ error: 'Missing adId' });
  }
  try {
    const result = await trackImpression(adId);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.status(200).json({ message: 'Impression tracked' });
  } catch (error) {
    console.error('Error tracking impression:', error.message);
    res.status(500).json({ error: 'Failed to track impression' });
  }
});

// Get ad details
router.get('/:adId', async (req, res) => {
  const { adId } = req.params;
  try {
    const ad = await getAd(adId);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.status(200).json(ad);
  } catch (error) {
    console.error('Error fetching ad:', error.message);
    res.status(500).json({ error: 'Failed to fetch ad' });
  }
});

module.exports = router;

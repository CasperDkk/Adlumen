const express = require('express');
const { logPayment, getPaymentsByAdId } = require('./paymentModel');
const router = express.Router();

// Log a payment
router.post('/log', async (req, res) => {
  const { adId, paymentId, amount, status } = req.body;
  try {
    const payment = await logPayment(adId, paymentId, amount, status);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get payments for an ad
router.get('/:adId', async (req, res) => {
  const { adId } = req.params;
  try {
    const payments = await getPaymentsByAdId(adId);
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

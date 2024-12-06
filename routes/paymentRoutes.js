const express = require('express');
const { logPayment, getPaymentsByAdId, getInvoiceStatus, createInvoice } = require('../controllers/paymentController');
const router = express.Router();

// POST /invoice - Create a Lightning Network invoice.
router.post('/invoice', async (req, res) => {
  try {
    console.log(`Creating invoice with data: ${JSON.stringify(req.body)}`);
    await createInvoice(req, res);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// GET /invoice/:id/status - Check the status of a Lightning invoice.
router.get('/invoice/:id/status', async (req, res) => {
  const { id } = req.params;

  // Validate invoice ID parameter
  if (!id) {
    return res.status(400).json({ error: 'Invoice ID is required' });
  }

  try {
    console.log(`Checking status of invoice with ID: ${id}`);
    await getInvoiceStatus(req, res);
  } catch (error) {
    console.error('Error checking invoice status:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// POST /log - Log a payment.
router.post('/log', async (req, res) => {
  const { adId, paymentId, amount, status } = req.body;

  // Validate required fields
  if (!adId || !paymentId || !amount || !status) {
    return res.status(400).json({ error: 'Missing required fields: adId, paymentId, amount, status' });
  }

  try {
    console.log(`Logging payment for adId: ${adId}, paymentId: ${paymentId}, amount: ${amount}, status: ${status}`);
    const payment = await logPayment(adId, paymentId, amount, status);
    res.status(201).json(payment);
  } catch (error) {
    console.error('Error logging payment:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// GET /:adId - Get all payments associated with a specific ad.
router.get('/:adId', async (req, res) => {
  const { adId } = req.params;

  // Validate adId parameter
  if (!adId) {
    return res.status(400).json({ error: 'Missing adId parameter' });
  }

  try {
    console.log(`Fetching payments for adId: ${adId}`);
    const payments = await getPaymentsByAdId(adId);
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments for ad:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

module.exports = router;

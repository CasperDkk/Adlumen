//logic for payments

const { generateInvoice } = require('../services/lightningService');

// Create payment invoice
async function createPayment(req, res) {
  const { amount, description } = req.body;

  try {
    const invoice = await generateInvoice(amount, description);
    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { createPayment };





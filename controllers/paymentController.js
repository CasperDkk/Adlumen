const { generateInvoice, checkInvoice } = require('../services/lightningService');

// Controller to generate an invoice
async function createInvoice(req, res) {
  const { amount, description } = req.body;

  // Validate input data
  if (!amount || !description) {
    return res.status(400).json({ error: 'Missing required fields: amount, description' });
  }

  try {
    console.log(`Creating invoice for ${amount} with description: ${description}`);
    const invoice = await generateInvoice(amount, description);
    res.status(200).json(invoice);
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

// Controller to check invoice status
async function getInvoiceStatus(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Invoice ID is required' });
  }

  try {
    console.log(`Checking invoice status for ID: ${id}`);
    const isPaid = await checkInvoice(id);
    res.status(200).json({ isPaid });
  } catch (error) {
    console.error('Error checking invoice status:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

module.exports = { createInvoice, getInvoiceStatus };

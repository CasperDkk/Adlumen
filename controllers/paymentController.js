const { createLightningInvoice, checkInvoiceStatus } = require('../services/lightningService');

// Controller to generate an invoice
async function createInvoice(req, res) {
  const { amount, description } = req.body;

  try {
    const invoice = await createLightningInvoice(amount, description);
    res.status(200).json(invoice);  // Send back the invoice request and id
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller to check invoice status
async function getInvoiceStatus(req, res) {
  const { id } = req.params;

  try {
    const isPaid = await checkInvoiceStatus(id);
    res.status(200).json({ isPaid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createInvoice, getInvoiceStatus };

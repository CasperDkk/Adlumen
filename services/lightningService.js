const { createInvoice, getInvoice } = require('ln-service');
const lnd = require('../config/lnd-config');

// Create an invoice
async function generateInvoice(amount, description) {
  try {
    const { request, id } = await createInvoice({ lnd, tokens: amount, description });
    return { request, id };
  } catch (error) {
    throw new Error(`Failed to create invoice: ${error.message}`);
  }
}

// Check invoice status
async function checkInvoice(id) {
  try {
    const invoice = await getInvoice({ lnd, id });
    return invoice.is_confirmed;
  } catch (error) {
    throw new Error(`Failed to fetch invoice status: ${error.message}`);
  }
}

module.exports = { generateInvoice, checkInvoice };




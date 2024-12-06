const lnd = require('../config/lnd-config'); // Import the lnd config
const { getWalletInfo, createInvoice, getInvoice, settleInvoice } = require('ln-service'); // Import methods from ln-service

// Fetch wallet info to check the connection
async function fetchWalletInfo() {
  try {
    const walletInfo = await getWalletInfo({ lnd }); // Pass the lnd object as an argument
    console.log('Connected to Polar Lightning Node:', walletInfo);
    return walletInfo;
  } catch (error) {
    console.error('Error connecting to Lightning node:', error);
    throw new Error('Connection failed');
  }
}

// Create an Invoice
async function createLightningInvoice(amount, description) {
  try {
    const { request, id } = await createInvoice({
      lnd,
      tokens: amount, // Amount in satoshis
      description, // Invoice description
    });
    console.log(`Invoice created: ${request}`);
    return { request, id };
  } catch (error) {
    console.error(`Error creating invoice: ${error.message}`);
    throw error;
  }
}

// Check Invoice Status
async function checkInvoiceStatus(id) {
  try {
    const invoice = await getInvoice({ lnd, id });
    return invoice.is_confirmed; // Returns true if paid, else false
  } catch (error) {
    console.error(`Error fetching invoice: ${error.message}`);
    throw error;
  }
}

// Settle an Invoice (if required)
async function settleLightningInvoice(id) {
  try {
    await settleInvoice({ lnd, id });
    console.log('Invoice settled successfully');
  } catch (error) {
    console.error(`Error settling invoice: ${error.message}`);
    throw error;
  }
}

module.exports = {
  fetchWalletInfo, // Correctly export the function
  createLightningInvoice,
  checkInvoiceStatus,
  settleLightningInvoice,
};

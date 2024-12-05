const { authenticatedLndGrpc, createInvoice, getInvoice, settleInvoice } = require('ln-service');

// Lightning Network Node Configuration
const config = {
  cert: process.env.LND_CERT_PATH, // Path to TLS cert
  macaroon: process.env.LND_MACAROON_PATH, // Path to admin macaroon
  socket: process.env.LND_SOCKET, // LND RPC host
};

// Connect to LND
const { lnd } = authenticatedLndGrpc(config);

// Create an Invoice
async function createLightningInvoice(amount, description) {
  try {
    const { request, id } = await createInvoice({
      lnd,
      tokens: amount,  // Amount in satoshis
      description,     // Invoice description
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
    return invoice.is_confirmed;  // Returns true if paid, else false
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
  createLightningInvoice,
  checkInvoiceStatus,
  settleLightningInvoice,
};

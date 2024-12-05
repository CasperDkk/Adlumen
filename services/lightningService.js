const { authenticatedLndGrpc, createInvoice, getInvoice } = require('ln-service');

// Fetch configuration from environment variables or config file
const lndConfig = {
  cert: process.env.LND_CERT_PATH,          // Path to TLS cert
  macaroon: process.env.LND_MACAROON_PATH, // Path to admin macaroon
  socket: process.env.LND_SOCKET,          // LND RPC host
};

// Authenticate and initialize the LND instance
const { lnd } = authenticatedLndGrpc(lndConfig);

/**
 * Create an invoice on the Lightning Network.
 * @param {number} amount - Amount in satoshis.
 * @param {string} description - Description for the invoice.
 * @returns {Promise<Object>} - Lightning invoice request and ID.
 */
async function generateInvoice(amount, description) {
  try {
    const { request, id } = await createInvoice({ lnd, tokens: amount, description });
    return { request, id };
  } catch (error) {
    throw new Error(`Failed to create invoice: ${error.message}`);
  }
}

/**
 * Check the status of a Lightning Network invoice.
 * @param {string} id - Invoice ID.
 * @returns {Promise<boolean>} - Whether the invoice is confirmed (paid).
 */
async function checkInvoice(id) {
  try {
    const invoice = await getInvoice({ lnd, id });
    return invoice.is_confirmed;
  } catch (error) {
    throw new Error(`Failed to fetch invoice status: ${error.message}`);
  }
}

/**
 * Fetch basic information about the Lightning node.
 * @returns {Promise<Object>} - Node information.
 */
async function getNodeInfo() {
  try {
    const { alias, color, active_channels_count } = await lnd.getInfo();
    return { alias, color, active_channels_count };
  } catch (error) {
    throw new Error(`Failed to fetch node info: ${error.message}`);
  }
}

module.exports = {
  generateInvoice,
  checkInvoice,
  getNodeInfo,
};

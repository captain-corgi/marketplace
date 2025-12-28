/**
 * Jira Authentication Utilities
 * Handles environment variable-based authentication for Jira Cloud API
 */

/**
 * Get base64-encoded Basic Auth header for Jira API
 * @returns {Object} Headers object with Authorization
 */
function getAuthHeaders() {
  const email = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_KEY;

  if (!email || !apiToken) {
    throw new Error('JIRA_EMAIL and JIRA_API_KEY environment variables must be set');
  }

  const credentials = Buffer.from(`${email}:${apiToken}`).toString('base64');
  return {
    'Authorization': `Basic ${credentials}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
}

/**
 * Get the Jira base URL from environment
 * @returns {string} Jira base URL without trailing slash
 */
function getJiraUrl() {
  const url = process.env.JIRA_URL;
  if (!url) {
    throw new Error('JIRA_URL environment variable must be set');
  }
  return url.replace(/\/$/, '');
}

/**
 * Get all Jira configuration values
 * @returns {Object} Configuration object with url, email, and apiKey
 */
function getConfig() {
  return {
    url: getJiraUrl(),
    email: process.env.JIRA_EMAIL,
    apiKey: process.env.JIRA_API_KEY
  };
}

/**
 * Validate that all required environment variables are set
 * @returns {Object} Validation result with detailed configuration info
 */
function validateConfig() {
  const missing = [];
  if (!process.env.JIRA_URL) missing.push('JIRA_URL');
  if (!process.env.JIRA_EMAIL) missing.push('JIRA_EMAIL');
  if (!process.env.JIRA_API_KEY) missing.push('JIRA_API_KEY');

  return {
    valid: missing.length === 0,
    missing,
    url: process.env.JIRA_URL,
    email: process.env.JIRA_EMAIL,
    apiKeyLength: process.env.JIRA_API_KEY ? process.env.JIRA_API_KEY.length : 0
  };
}

module.exports = {
  getAuthHeaders,
  getJiraUrl,
  validateConfig,
  getConfig
};

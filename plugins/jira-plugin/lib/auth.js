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
 * Validate that all required environment variables are set
 * @returns {Object} Validation result with success flag and errors array
 */
function validateConfig() {
  const errors = [];
  if (!process.env.JIRA_URL) errors.push('JIRA_URL is not set');
  if (!process.env.JIRA_EMAIL) errors.push('JIRA_EMAIL is not set');
  if (!process.env.JIRA_API_KEY) errors.push('JIRA_API_KEY is not set');
  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  getAuthHeaders,
  getJiraUrl,
  validateConfig
};

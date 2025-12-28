/**
 * GitHub CLI Authentication Utilities
 * Handles validation and status checking for GitHub CLI (gh) authentication
 */

const { execSync } = require('child_process');

/**
 * Execute a gh CLI command and return the result
 * @param {string} command - The gh command to execute (without 'gh' prefix)
 * @param {Object} options - Options for execSync
 * @returns {string} Command output
 */
function execGh(command, options = {}) {
  try {
    const result = execSync(`gh ${command}`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      ...options
    });
    return result.trim();
  } catch (error) {
    if (error.stderr) {
      throw new Error(error.stderr.toString().trim());
    }
    throw error;
  }
}

/**
 * Check if GitHub CLI is installed
 * @returns {boolean} True if gh is installed
 */
function isGhInstalled() {
  try {
    execSync('gh --version', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get the GitHub CLI version
 * @returns {string|null} Version string or null if not installed
 */
function getGhVersion() {
  try {
    const output = execSync('gh --version', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
    const match = output.match(/gh version ([\d.]+)/);
    return match ? match[1] : output.trim().split('\n')[0];
  } catch (error) {
    return null;
  }
}

/**
 * Check if user is authenticated with GitHub CLI
 * @returns {boolean} True if authenticated
 */
function isAuthenticated() {
  try {
    execGh('auth status');
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get current authentication status details
 * @returns {Object} Auth status with account info
 */
function getAuthStatus() {
  try {
    const output = execGh('auth status 2>&1');
    const lines = output.split('\n');
    
    const status = {
      authenticated: true,
      account: null,
      protocol: null,
      host: 'github.com'
    };

    for (const line of lines) {
      if (line.includes('Logged in to')) {
        const hostMatch = line.match(/Logged in to ([^\s]+)/);
        if (hostMatch) status.host = hostMatch[1];
      }
      if (line.includes('account')) {
        const accountMatch = line.match(/account ([^\s]+)/);
        if (accountMatch) status.account = accountMatch[1];
      }
      if (line.includes('git operations')) {
        if (line.includes('HTTPS')) status.protocol = 'HTTPS';
        else if (line.includes('SSH')) status.protocol = 'SSH';
      }
    }

    return status;
  } catch (error) {
    return {
      authenticated: false,
      error: error.message
    };
  }
}

/**
 * Get the currently authenticated user
 * @returns {Object} User object with login, name, email
 */
function getCurrentUser() {
  try {
    const output = execGh('api user --jq "{login: .login, name: .name, email: .email, id: .id}"');
    return JSON.parse(output);
  } catch (error) {
    throw new Error(`Failed to get current user: ${error.message}`);
  }
}

/**
 * Validate that GitHub CLI is installed and authenticated
 * @returns {Object} Validation result with detailed status info
 */
function validateConfig() {
  const result = {
    valid: false,
    ghInstalled: false,
    ghVersion: null,
    authenticated: false,
    account: null,
    host: null,
    errors: []
  };

  // Check if gh is installed
  result.ghInstalled = isGhInstalled();
  if (!result.ghInstalled) {
    result.errors.push('GitHub CLI (gh) is not installed. Install from https://cli.github.com/');
    return result;
  }

  result.ghVersion = getGhVersion();

  // Check authentication
  const authStatus = getAuthStatus();
  result.authenticated = authStatus.authenticated;
  
  if (!authStatus.authenticated) {
    result.errors.push('Not authenticated with GitHub CLI. Run: gh auth login');
    return result;
  }

  result.account = authStatus.account;
  result.host = authStatus.host;
  result.valid = true;

  return result;
}

/**
 * Get the current repository context (if in a git repo)
 * @returns {Object|null} Repository info with owner and name, or null
 */
function getCurrentRepo() {
  try {
    const output = execGh('repo view --json owner,name');
    return JSON.parse(output);
  } catch (error) {
    return null;
  }
}

/**
 * Parse owner/repo string into components
 * @param {string} repoString - Repository in "owner/repo" format
 * @returns {Object} Object with owner and repo properties
 */
function parseRepoString(repoString) {
  if (!repoString || !repoString.includes('/')) {
    throw new Error('Repository must be in "owner/repo" format');
  }
  const [owner, ...repoParts] = repoString.split('/');
  const repo = repoParts.join('/');
  return { owner, repo };
}

module.exports = {
  execGh,
  isGhInstalled,
  getGhVersion,
  isAuthenticated,
  getAuthStatus,
  getCurrentUser,
  validateConfig,
  getCurrentRepo,
  parseRepoString
};

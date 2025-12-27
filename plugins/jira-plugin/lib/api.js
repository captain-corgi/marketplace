/**
 * Jira REST API Client
 * Lightweight HTTP wrapper for Jira Cloud REST API v3
 */

const https = require('https');
const { getJiraUrl, getAuthHeaders } = require('./auth.js');

/**
 * Make an HTTP request to Jira API
 * @param {string} endpoint - API endpoint path (e.g., /rest/api/3/issue/PROJ-123)
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Object|null} body - Request body for POST/PUT
 * @returns {Promise<Object>} Parsed JSON response
 */
function jiraRequest(endpoint, method = 'GET', body = null) {
  const baseUrl = getJiraUrl();
  const url = `${baseUrl}${endpoint}`;
  const headers = getAuthHeaders();

  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method,
      headers
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`Jira API error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

// ===== Issue Management =====

/**
 * Create a new Jira issue
 * POST /rest/api/3/issue
 */
function createIssue(fields) {
  return jiraRequest('/rest/api/3/issue', 'POST', { fields });
}

/**
 * Get issue details by key or ID
 * GET /rest/api/3/issue/{issueIdOrKey}
 */
function getIssue(issueKey) {
  return jiraRequest(`/rest/api/3/issue/${issueKey}`, 'GET');
}

/**
 * Edit an issue
 * PUT /rest/api/3/issue/{issueIdOrKey}
 */
function updateIssue(issueKey, fields) {
  return jiraRequest(`/rest/api/3/issue/${issueKey}`, 'PUT', { fields });
}

/**
 * Search issues using JQL
 * POST /rest/api/3/search
 */
function searchIssues(jql, maxResults = 50, startAt = 0) {
  return jiraRequest('/rest/api/3/search', 'POST', {
    jql,
    maxResults,
    startAt
  });
}

/**
 * Get available transitions for an issue
 * GET /rest/api/3/issue/{issueIdOrKey}/transitions
 */
function getTransitions(issueKey) {
  return jiraRequest(`/rest/api/3/issue/${issueKey}/transitions`, 'GET');
}

/**
 * Transition an issue to a new status
 * POST /rest/api/3/issue/{issueIdOrKey}/transitions
 */
function transitionIssue(issueKey, transitionId, fields = {}) {
  return jiraRequest(`/rest/api/3/issue/${issueKey}/transitions`, 'POST', {
    transition: { id: transitionId },
    fields
  });
}

// ===== Comments =====

/**
 * Get comments for an issue
 * GET /rest/api/3/issue/{issueIdOrKey}/comment
 */
function getComments(issueKey) {
  return jiraRequest(`/rest/api/3/issue/${issueKey}/comment`, 'GET');
}

/**
 * Add a comment to an issue
 * POST /rest/api/3/issue/{issueIdOrKey}/comment
 */
function addComment(issueKey, body) {
  return jiraRequest(`/rest/api/3/issue/${issueKey}/comment`, 'POST', {
    body: {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: body }]
        }
      ]
    }
  });
}

// ===== Agile/Scrum (Jira Software API) =====

/**
 * Get all boards
 * GET /rest/agile/1.0/board
 */
function getBoards(boardType = null, maxResults = 50) {
  let endpoint = `/rest/agile/1.0/board?maxResults=${maxResults}`;
  if (boardType) {
    endpoint += `&type=${boardType}`;
  }
  return jiraRequest(endpoint, 'GET');
}

/**
 * Get sprints for a board
 * GET /rest/agile/1.0/board/{boardId}/sprint
 */
function getSprints(boardId, state = null) {
  let endpoint = `/rest/agile/1.0/board/${boardId}/sprint`;
  if (state) {
    endpoint += `?state=${state}`;
  }
  return jiraRequest(endpoint, 'GET');
}

/**
 * Get issues in a sprint
 * GET /rest/agile/1.0/sprint/{sprintId}/issue
 */
function getSprintIssues(sprintId) {
  return jiraRequest(`/rest/agile/1.0/sprint/${sprintId}/issue`, 'GET');
}

/**
 * Create a new sprint
 * POST /rest/agile/1.0/sprint
 */
function createSprint(name, boardId, startDate = null, endDate = null) {
  const payload = { name, originBoardId: boardId };
  if (startDate) payload.startDate = startDate;
  if (endDate) payload.endDate = endDate;
  return jiraRequest('/rest/agile/1.0/sprint', 'POST', payload);
}

/**
 * Move issues to a sprint
 * POST /rest/agile/1.0/sprint/{sprintId}/issue
 */
function moveIssuesToSprint(sprintId, issueKeys) {
  return jiraRequest(`/rest/agile/1.0/sprint/${sprintId}/issue`, 'POST', {
    issues: issueKeys
  });
}

// ===== Projects =====

/**
 * Get all projects
 * GET /rest/api/3/project
 */
function getProjects() {
  return jiraRequest('/rest/api/3/project', 'GET');
}

/**
 * Get project details
 * GET /rest/api/3/project/{keyOrId}
 */
function getProject(keyOrId) {
  return jiraRequest(`/rest/api/3/project/${keyOrId}`, 'GET');
}

module.exports = {
  // Issue Management
  createIssue,
  getIssue,
  updateIssue,
  searchIssues,
  getTransitions,
  transitionIssue,
  // Comments
  getComments,
  addComment,
  // Agile/Scrum
  getBoards,
  getSprints,
  getSprintIssues,
  createSprint,
  moveIssuesToSprint,
  // Projects
  getProjects,
  getProject
};

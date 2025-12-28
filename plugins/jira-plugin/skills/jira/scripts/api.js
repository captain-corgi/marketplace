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
 * Fetch multiple issues in parallel by their IDs
 * @param {Array<string>} issueIds - Array of issue IDs to fetch
 * @param {number} concurrency - Maximum parallel requests (default: 10)
 * @returns {Promise<Array>} Array of successfully fetched issue objects
 */
function batchFetchIssues(issueIds, concurrency = 10) {
  if (!issueIds || issueIds.length === 0) {
    return Promise.resolve([]);
  }

  const results = [];
  const errors = [];

  // Process in batches
  function processBatch(index) {
    if (index >= issueIds.length) {
      // Log warnings for failed fetches
      if (errors.length > 0) {
        console.warn(`Warning: Failed to fetch ${errors.length} issue(s):`);
        errors.forEach(({ issueId, error }) => {
          console.warn(`  - Issue ${issueId}: ${error}`);
        });
      }
      return Promise.resolve(results);
    }

    const batch = issueIds.slice(index, index + concurrency);
    const batchPromises = batch.map(issueId =>
      getIssue(issueId).catch(err => {
        errors.push({ issueId, error: err.message });
        return null;
      })
    );

    return Promise.all(batchPromises).then(batchResults => {
      results.push(...batchResults.filter(issue => issue !== null));
      return processBatch(index + concurrency);
    });
  }

  return processBatch(0);
}

/**
 * Edit an issue
 * PUT /rest/api/3/issue/{issueIdOrKey}
 */
function updateIssue(issueKey, fields) {
  return jiraRequest(`/rest/api/3/issue/${issueKey}`, 'PUT', { fields });
}

/**
 * Search issues using JQL with new API endpoint
 * Uses GET /rest/api/3/search/jql which returns only IDs,
 * then fetches full issue details in parallel
 */
function searchIssues(jql, maxResults = 50, startAt = 0) {
  const encodedJql = encodeURIComponent(jql);
  const searchEndpoint = `/rest/api/3/search/jql?jql=${encodedJql}&maxResults=${maxResults}&startAt=${startAt}`;

  return jiraRequest(searchEndpoint, 'GET')
    .then(searchResponse => {
      const issueIds = searchResponse.issues.map(issue => issue.id);
      return batchFetchIssues(issueIds)
        .then(fullIssues => {
          // New API only returns 'issues' and 'isLast'
          return {
            issues: fullIssues,
            isLast: searchResponse.isLast
          };
        });
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
 * Get board configuration
 * GET /rest/agile/1.0/board/{boardId}/configuration
 */
function getBoardConfiguration(boardId) {
  return jiraRequest(`/rest/agile/1.0/board/${boardId}/configuration`, 'GET');
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
 * Get all issues in a sprint
 * GET /rest/agile/1.0/sprint/{sprintId}/issue
 */
function getSprintIssues(sprintId) {
  return jiraRequest(`/rest/agile/1.0/sprint/${sprintId}/issue`, 'GET')
    .then(result => result.issues || []);
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
 * Update sprint details (full update)
 * PUT /rest/agile/1.0/sprint/{sprintId}
 */
function updateSprint(sprintId, updates) {
  return jiraRequest(`/rest/agile/1.0/sprint/${sprintId}`, 'PUT', updates);
}

/**
 * Partially update sprint
 * POST /rest/agile/1.0/sprint/{sprintId}
 * Only updates the fields provided in the request body
 */
function partiallyUpdateSprint(sprintId, updates) {
  return jiraRequest(`/rest/agile/1.0/sprint/${sprintId}`, 'POST', updates);
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

// ===== Bulk Operations =====

/**
 * Bulk move issues - convert issue types, move to different projects, or set parent
 * POST /rest/api/3/bulk/issues/move
 * 
 * @param {Object} options - Bulk move options
 * @param {Array<string>} options.issueIdsOrKeys - Array of issue keys to move
 * @param {string} options.projectKey - Target project key
 * @param {string} options.issueTypeId - Target issue type ID
 * @param {string} [options.parentKey] - Parent issue key (for sub-tasks)
 * @param {boolean} [options.sendNotification] - Send bulk notification (default: false)
 * @param {boolean} [options.inferFieldDefaults] - Infer field defaults (default: true)
 * @param {boolean} [options.inferStatusDefaults] - Infer status defaults (default: true)
 * @returns {Promise<Object>} Response with taskId for tracking progress
 */
function bulkMoveIssues(options) {
  const {
    issueIdsOrKeys,
    projectKey,
    issueTypeId,
    parentKey = null,
    sendNotification = false,
    inferFieldDefaults = true,
    inferStatusDefaults = true
  } = options;

  // Build key format: "projectKey,issueTypeId,parentKey" or "projectKey,issueTypeId"
  const mappingKey = parentKey 
    ? `${projectKey},${issueTypeId},${parentKey}`
    : `${projectKey},${issueTypeId}`;

  const payload = {
    sendBulkNotification: sendNotification,
    targetToSourcesMapping: {
      [mappingKey]: {
        inferClassificationDefaults: true,
        inferFieldDefaults,
        inferStatusDefaults,
        inferSubtaskTypeDefault: true,
        issueIdsOrKeys
      }
    }
  };

  return jiraRequest('/rest/api/3/bulk/issues/move', 'POST', payload);
}

/**
 * Get bulk operation task status
 * GET /rest/api/3/bulk/tasks/{taskId}
 * 
 * @param {string} taskId - The task ID from bulk move response
 * @returns {Promise<Object>} Task status with progress information
 */
function getBulkTaskStatus(taskId) {
  return jiraRequest(`/rest/api/3/bulk/tasks/${taskId}`, 'GET');
}

/**
 * Convert issues to sub-tasks of a parent issue
 * Convenience wrapper for bulkMoveIssues
 * 
 * @param {Array<string>} issueKeys - Array of issue keys to convert
 * @param {string} parentKey - Parent issue key
 * @param {string} projectKey - Project key (default: extracted from parentKey)
 * @returns {Promise<Object>} Response with taskId for tracking progress
 */
function convertToSubtasks(issueKeys, parentKey, projectKey = null) {
  // Extract project key from parent key if not provided
  if (!projectKey) {
    projectKey = parentKey.split('-')[0];
  }

  // Sub-task issue type ID is typically 10002, but we should get it dynamically
  // For now, use the common ID - in production, you'd fetch from /rest/api/3/issuetype
  const subtaskTypeId = '10002';

  return bulkMoveIssues({
    issueIdsOrKeys: issueKeys,
    projectKey,
    issueTypeId: subtaskTypeId,
    parentKey
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

// ===== User & Assignment =====

/**
 * Get current user information
 * GET /rest/api/3/myself
 */
function getCurrentUser() {
  return jiraRequest('/rest/api/3/myself', 'GET');
}

/**
 * Search for users by query (email or name)
 * GET /rest/api/3/user/search
 * @param {string} query - Email address or display name
 * @param {number} maxResults - Maximum results (default: 10)
 */
function searchUsers(query, maxResults = 10) {
  return jiraRequest(`/rest/api/3/user/search?query=${encodeURIComponent(query)}&maxResults=${maxResults}`, 'GET');
}

/**
 * Assign an issue to a user
 * PUT /rest/api/3/issue/{issueIdOrKey}/assignee
 * @param {string} issueKey - Issue key (e.g., PROJ-123)
 * @param {string|null} emailOrAccount - Email address to assign to, or null for current user
 * @returns {Promise<Object>} Response
 */
function assignIssue(issueKey, emailOrAccount = null) {
  // If null or undefined, assign to current user
  if (!emailOrAccount) {
    // Get current user's accountId first (more reliable than null for next-gen projects)
    return getCurrentUser()
      .then(user => {
        return jiraRequest(`/rest/api/3/issue/${issueKey}/assignee`, 'PUT', {
          accountId: user.accountId
        });
      });
  }

  // If email is provided, first find the accountId
  return searchUsers(emailOrAccount, 1)
    .then(users => {
      if (!users || users.length === 0) {
        throw new Error(`User not found with email: ${emailOrAccount}`);
      }
      const accountId = users[0].accountId;
      return jiraRequest(`/rest/api/3/issue/${issueKey}/assignee`, 'PUT', {
        accountId
      });
    });
}

module.exports = {
  // Issue Management
  createIssue,
  getIssue,
  updateIssue,
  searchIssues,
  batchFetchIssues,
  getTransitions,
  transitionIssue,
  // Comments
  getComments,
  addComment,
  // Agile/Scrum
  getBoards,
  getBoardConfiguration,
  getSprints,
  getSprintIssues,
  createSprint,
  updateSprint,
  partiallyUpdateSprint,
  moveIssuesToSprint,
  // Bulk Operations
  bulkMoveIssues,
  getBulkTaskStatus,
  convertToSubtasks,
  // Projects
  getProjects,
  getProject,
  // User & Assignment
  getCurrentUser,
  searchUsers,
  assignIssue
};

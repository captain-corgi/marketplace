/**
 * GitHub REST API Client
 * Uses GitHub CLI (gh) for all GitHub operations
 */

const { execSync } = require('child_process');

/**
 * Execute a gh CLI command and return parsed JSON result
 * @param {string} command - The gh command to execute (without 'gh' prefix)
 * @param {boolean} parseJson - Whether to parse output as JSON (default: true)
 * @returns {Object|string} Parsed JSON or raw output
 */
function execGh(command, parseJson = true) {
  try {
    const result = execSync(`gh ${command}`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      maxBuffer: 10 * 1024 * 1024 // 10MB buffer for large responses
    });
    if (parseJson && result.trim()) {
      return JSON.parse(result.trim());
    }
    return result.trim();
  } catch (error) {
    const stderr = error.stderr ? error.stderr.toString().trim() : '';
    const stdout = error.stdout ? error.stdout.toString().trim() : '';
    throw new Error(stderr || stdout || error.message);
  }
}

/**
 * Execute gh command without JSON parsing
 * @param {string} command - The gh command
 * @returns {string} Raw output
 */
function execGhRaw(command) {
  return execGh(command, false);
}

// ===== Repository Operations =====

/**
 * List repositories for a user or organization
 * @param {string} owner - Username or organization name (optional, defaults to authenticated user)
 * @param {Object} options - Optional filters
 * @param {number} options.limit - Maximum number of repos (default: 30)
 * @param {string} options.visibility - Filter by visibility: public, private, internal
 * @param {string} options.type - Filter by type: owner, member, all (for user), or public, private, forks, sources, member (for org)
 * @returns {Array} List of repositories
 */
function listRepos(owner = null, options = {}) {
  const { limit = 30, visibility, type } = options;
  let cmd = 'repo list';
  
  if (owner) {
    cmd += ` ${owner}`;
  }
  
  cmd += ` --limit ${limit}`;
  cmd += ' --json name,owner,description,visibility,isPrivate,isFork,stargazerCount,forkCount,url,pushedAt,primaryLanguage';
  
  if (visibility) {
    cmd += ` --visibility ${visibility}`;
  }
  
  return execGh(cmd);
}

/**
 * Search GitHub repositories
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @param {number} options.limit - Maximum results (default: 30)
 * @param {string} options.sort - Sort by: stars, forks, updated, help-wanted-issues
 * @param {string} options.order - Order: asc, desc
 * @returns {Array} Search results
 */
function searchRepos(query, options = {}) {
  const { limit = 30, sort, order } = options;
  let cmd = `search repos "${query.replace(/"/g, '\\"')}"`;
  
  cmd += ` --limit ${limit}`;
  cmd += ' --json fullName,description,visibility,isPrivate,stargazerCount,forkCount,url,pushedAt,primaryLanguage';
  
  if (sort) {
    cmd += ` --sort ${sort}`;
  }
  if (order) {
    cmd += ` --order ${order}`;
  }
  
  return execGh(cmd);
}

/**
 * Get repository details
 * @param {string} repo - Repository in "owner/repo" format
 * @returns {Object} Repository details
 */
function getRepo(repo) {
  const cmd = `repo view ${repo} --json name,owner,description,visibility,isPrivate,isFork,isArchived,stargazerCount,forkCount,watchers,url,homepageUrl,pushedAt,createdAt,primaryLanguage,licenseInfo,defaultBranchRef,issues,pullRequests,hasIssuesEnabled,hasWikiEnabled,hasProjectsEnabled`;
  return execGh(cmd);
}

/**
 * Create a new repository
 * @param {string} name - Repository name
 * @param {Object} options - Creation options
 * @param {string} options.description - Repository description
 * @param {string} options.visibility - public, private, or internal
 * @param {boolean} options.clone - Clone the repository after creation
 * @param {string} options.gitignore - Gitignore template
 * @param {string} options.license - License template
 * @returns {Object} Created repository info
 */
function createRepo(name, options = {}) {
  const { description, visibility = 'private', clone = false, gitignore, license } = options;
  let cmd = `repo create ${name}`;
  
  cmd += ` --${visibility}`;
  
  if (description) {
    cmd += ` --description "${description.replace(/"/g, '\\"')}"`;
  }
  if (gitignore) {
    cmd += ` --gitignore ${gitignore}`;
  }
  if (license) {
    cmd += ` --license ${license}`;
  }
  if (clone) {
    cmd += ' --clone';
  }
  
  // Create the repo and then fetch its details
  execGhRaw(cmd);
  
  // Get the created repo details
  return getRepo(name);
}

/**
 * Fork a repository
 * @param {string} repo - Repository in "owner/repo" format
 * @param {Object} options - Fork options
 * @param {string} options.org - Organization to fork to
 * @param {string} options.name - Custom name for the fork
 * @param {boolean} options.clone - Clone the fork after creation
 * @returns {Object} Forked repository info
 */
function forkRepo(repo, options = {}) {
  const { org, name, clone = false } = options;
  let cmd = `repo fork ${repo}`;
  
  if (org) {
    cmd += ` --org ${org}`;
  }
  if (name) {
    cmd += ` --fork-name ${name}`;
  }
  if (clone) {
    cmd += ' --clone';
  }
  
  const output = execGhRaw(cmd);
  
  // Parse the forked repo URL from output
  const match = output.match(/github\.com\/([^\/]+\/[^\s]+)/);
  if (match) {
    return getRepo(match[1].replace('.git', ''));
  }
  
  return { message: output };
}

/**
 * Delete a repository
 * @param {string} repo - Repository in "owner/repo" format
 * @returns {boolean} True if deleted
 */
function deleteRepo(repo) {
  execGhRaw(`repo delete ${repo} --yes`);
  return true;
}

// ===== Issue Operations =====

/**
 * List issues for a repository
 * @param {string} repo - Repository in "owner/repo" format
 * @param {Object} options - Filter options
 * @param {string} options.state - open, closed, or all
 * @param {string} options.assignee - Filter by assignee
 * @param {string} options.author - Filter by author
 * @param {string} options.label - Filter by label
 * @param {number} options.limit - Maximum results
 * @returns {Array} List of issues
 */
function listIssues(repo, options = {}) {
  const { state = 'open', assignee, author, label, limit = 30 } = options;
  let cmd = `issue list -R ${repo}`;
  
  cmd += ` --state ${state}`;
  cmd += ` --limit ${limit}`;
  cmd += ' --json number,title,state,author,assignees,labels,milestone,createdAt,updatedAt,url,body';
  
  if (assignee) {
    cmd += ` --assignee ${assignee}`;
  }
  if (author) {
    cmd += ` --author ${author}`;
  }
  if (label) {
    cmd += ` --label "${label}"`;
  }
  
  return execGh(cmd);
}

/**
 * Get issue details
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} number - Issue number
 * @returns {Object} Issue details
 */
function getIssue(repo, number) {
  const cmd = `issue view ${number} -R ${repo} --json number,title,state,author,assignees,labels,milestone,createdAt,updatedAt,closedAt,url,body,comments`;
  return execGh(cmd);
}

/**
 * Create a new issue
 * @param {string} repo - Repository in "owner/repo" format
 * @param {string} title - Issue title
 * @param {Object} options - Issue options
 * @param {string} options.body - Issue body
 * @param {Array<string>} options.labels - Labels to add
 * @param {Array<string>} options.assignees - Users to assign
 * @param {string} options.milestone - Milestone name or number
 * @returns {Object} Created issue
 */
function createIssue(repo, title, options = {}) {
  const { body, labels, assignees, milestone } = options;
  let cmd = `issue create -R ${repo} --title "${title.replace(/"/g, '\\"')}"`;
  
  if (body) {
    cmd += ` --body "${body.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  }
  if (labels && labels.length > 0) {
    cmd += ` --label "${labels.join(',')}"`;
  }
  if (assignees && assignees.length > 0) {
    cmd += ` --assignee "${assignees.join(',')}"`;
  }
  if (milestone) {
    cmd += ` --milestone "${milestone}"`;
  }
  
  const output = execGhRaw(cmd);
  
  // Extract issue number from URL
  const match = output.match(/\/issues\/(\d+)/);
  if (match) {
    return getIssue(repo, parseInt(match[1]));
  }
  
  return { message: output };
}

/**
 * Update an issue
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} number - Issue number
 * @param {Object} fields - Fields to update
 * @param {string} fields.title - New title
 * @param {string} fields.body - New body
 * @param {Array<string>} fields.addLabels - Labels to add
 * @param {Array<string>} fields.removeLabels - Labels to remove
 * @param {Array<string>} fields.addAssignees - Assignees to add
 * @param {Array<string>} fields.removeAssignees - Assignees to remove
 * @returns {Object} Updated issue
 */
function updateIssue(repo, number, fields) {
  const { title, body, addLabels, removeLabels, addAssignees, removeAssignees } = fields;
  let cmd = `issue edit ${number} -R ${repo}`;
  
  if (title) {
    cmd += ` --title "${title.replace(/"/g, '\\"')}"`;
  }
  if (body) {
    cmd += ` --body "${body.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  }
  if (addLabels && addLabels.length > 0) {
    cmd += ` --add-label "${addLabels.join(',')}"`;
  }
  if (removeLabels && removeLabels.length > 0) {
    cmd += ` --remove-label "${removeLabels.join(',')}"`;
  }
  if (addAssignees && addAssignees.length > 0) {
    cmd += ` --add-assignee "${addAssignees.join(',')}"`;
  }
  if (removeAssignees && removeAssignees.length > 0) {
    cmd += ` --remove-assignee "${removeAssignees.join(',')}"`;
  }
  
  execGhRaw(cmd);
  return getIssue(repo, number);
}

/**
 * Close an issue
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} number - Issue number
 * @param {string} reason - Close reason: completed or not_planned
 * @returns {Object} Closed issue
 */
function closeIssue(repo, number, reason = 'completed') {
  let cmd = `issue close ${number} -R ${repo}`;
  if (reason === 'not_planned') {
    cmd += ' --reason "not planned"';
  }
  execGhRaw(cmd);
  return getIssue(repo, number);
}

/**
 * Reopen an issue
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} number - Issue number
 * @returns {Object} Reopened issue
 */
function reopenIssue(repo, number) {
  execGhRaw(`issue reopen ${number} -R ${repo}`);
  return getIssue(repo, number);
}

/**
 * Add a comment to an issue
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} number - Issue number
 * @param {string} body - Comment body
 * @returns {Object} Updated issue with comments
 */
function addIssueComment(repo, number, body) {
  execGhRaw(`issue comment ${number} -R ${repo} --body "${body.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`);
  return getIssue(repo, number);
}

/**
 * Search issues across GitHub
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @param {number} options.limit - Maximum results
 * @returns {Array} Search results
 */
function searchIssues(query, options = {}) {
  const { limit = 30 } = options;
  const cmd = `search issues "${query.replace(/"/g, '\\"')}" --limit ${limit} --json number,title,state,repository,author,assignees,labels,createdAt,updatedAt,url`;
  return execGh(cmd);
}

// ===== Pull Request Operations =====

/**
 * List pull requests for a repository
 * @param {string} repo - Repository in "owner/repo" format
 * @param {Object} options - Filter options
 * @param {string} options.state - open, closed, merged, or all
 * @param {string} options.base - Filter by base branch
 * @param {string} options.head - Filter by head branch
 * @param {string} options.author - Filter by author
 * @param {number} options.limit - Maximum results
 * @returns {Array} List of pull requests
 */
function listPRs(repo, options = {}) {
  const { state = 'open', base, head, author, limit = 30 } = options;
  let cmd = `pr list -R ${repo}`;
  
  cmd += ` --state ${state}`;
  cmd += ` --limit ${limit}`;
  cmd += ' --json number,title,state,author,assignees,labels,baseRefName,headRefName,isDraft,mergeable,createdAt,updatedAt,url,body';
  
  if (base) {
    cmd += ` --base ${base}`;
  }
  if (head) {
    cmd += ` --head ${head}`;
  }
  if (author) {
    cmd += ` --author ${author}`;
  }
  
  return execGh(cmd);
}

/**
 * Get pull request details
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} number - PR number
 * @returns {Object} PR details
 */
function getPR(repo, number) {
  const cmd = `pr view ${number} -R ${repo} --json number,title,state,author,assignees,labels,baseRefName,headRefName,isDraft,mergeable,mergeStateStatus,reviewDecision,reviewRequests,reviews,additions,deletions,changedFiles,commits,createdAt,updatedAt,mergedAt,closedAt,url,body`;
  return execGh(cmd);
}

/**
 * Create a pull request
 * @param {string} repo - Repository in "owner/repo" format
 * @param {Object} options - PR options
 * @param {string} options.title - PR title
 * @param {string} options.body - PR body
 * @param {string} options.base - Base branch (default: default branch)
 * @param {string} options.head - Head branch
 * @param {boolean} options.draft - Create as draft
 * @param {Array<string>} options.labels - Labels to add
 * @param {Array<string>} options.assignees - Users to assign
 * @param {Array<string>} options.reviewers - Reviewers to request
 * @returns {Object} Created PR
 */
function createPR(repo, options = {}) {
  const { title, body, base, head, draft = false, labels, assignees, reviewers } = options;
  let cmd = `pr create -R ${repo}`;
  
  if (title) {
    cmd += ` --title "${title.replace(/"/g, '\\"')}"`;
  }
  if (body) {
    cmd += ` --body "${body.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  }
  if (base) {
    cmd += ` --base ${base}`;
  }
  if (head) {
    cmd += ` --head ${head}`;
  }
  if (draft) {
    cmd += ' --draft';
  }
  if (labels && labels.length > 0) {
    cmd += ` --label "${labels.join(',')}"`;
  }
  if (assignees && assignees.length > 0) {
    cmd += ` --assignee "${assignees.join(',')}"`;
  }
  if (reviewers && reviewers.length > 0) {
    cmd += ` --reviewer "${reviewers.join(',')}"`;
  }
  
  const output = execGhRaw(cmd);
  
  // Extract PR number from URL
  const match = output.match(/\/pull\/(\d+)/);
  if (match) {
    return getPR(repo, parseInt(match[1]));
  }
  
  return { message: output };
}

/**
 * Merge a pull request
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} number - PR number
 * @param {Object} options - Merge options
 * @param {string} options.method - merge, squash, or rebase
 * @param {boolean} options.deleteBranch - Delete branch after merge
 * @param {string} options.subject - Custom merge commit subject
 * @param {string} options.body - Custom merge commit body
 * @returns {Object} Merged PR
 */
function mergePR(repo, number, options = {}) {
  const { method = 'merge', deleteBranch = false, subject, body } = options;
  let cmd = `pr merge ${number} -R ${repo}`;
  
  cmd += ` --${method}`;
  
  if (deleteBranch) {
    cmd += ' --delete-branch';
  }
  if (subject) {
    cmd += ` --subject "${subject.replace(/"/g, '\\"')}"`;
  }
  if (body) {
    cmd += ` --body "${body.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  }
  
  execGhRaw(cmd);
  return getPR(repo, number);
}

/**
 * Close a pull request without merging
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} number - PR number
 * @returns {Object} Closed PR
 */
function closePR(repo, number) {
  execGhRaw(`pr close ${number} -R ${repo}`);
  return getPR(repo, number);
}

/**
 * Reopen a closed pull request
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} number - PR number
 * @returns {Object} Reopened PR
 */
function reopenPR(repo, number) {
  execGhRaw(`pr reopen ${number} -R ${repo}`);
  return getPR(repo, number);
}

/**
 * Add a review to a pull request
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} number - PR number
 * @param {Object} options - Review options
 * @param {string} options.event - approve, request-changes, or comment
 * @param {string} options.body - Review body/comment
 * @returns {Object} Updated PR
 */
function addPRReview(repo, number, options = {}) {
  const { event = 'comment', body } = options;
  let cmd = `pr review ${number} -R ${repo}`;
  
  cmd += ` --${event}`;
  
  if (body) {
    cmd += ` --body "${body.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  }
  
  execGhRaw(cmd);
  return getPR(repo, number);
}

/**
 * Add a comment to a pull request
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} number - PR number
 * @param {string} body - Comment body
 * @returns {Object} Updated PR
 */
function addPRComment(repo, number, body) {
  execGhRaw(`pr comment ${number} -R ${repo} --body "${body.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`);
  return getPR(repo, number);
}

/**
 * Request reviewers for a pull request
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} number - PR number
 * @param {Array<string>} reviewers - List of reviewers
 * @returns {Object} Updated PR
 */
function requestReviewers(repo, number, reviewers) {
  execGhRaw(`pr edit ${number} -R ${repo} --add-reviewer "${reviewers.join(',')}"`);
  return getPR(repo, number);
}

/**
 * Search pull requests across GitHub
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @param {number} options.limit - Maximum results
 * @returns {Array} Search results
 */
function searchPRs(query, options = {}) {
  const { limit = 30 } = options;
  const cmd = `search prs "${query.replace(/"/g, '\\"')}" --limit ${limit} --json number,title,state,repository,author,baseRefName,headRefName,isDraft,createdAt,updatedAt,url`;
  return execGh(cmd);
}

// ===== GitHub Actions / Workflows =====

/**
 * List workflows for a repository
 * @param {string} repo - Repository in "owner/repo" format
 * @returns {Array} List of workflows
 */
function listWorkflows(repo) {
  const cmd = `workflow list -R ${repo} --json id,name,state,path`;
  return execGh(cmd);
}

/**
 * Get workflow runs
 * @param {string} repo - Repository in "owner/repo" format
 * @param {Object} options - Filter options
 * @param {string} options.workflow - Workflow name or ID
 * @param {string} options.status - queued, in_progress, completed
 * @param {string} options.branch - Filter by branch
 * @param {number} options.limit - Maximum results
 * @returns {Array} List of workflow runs
 */
function getWorkflowRuns(repo, options = {}) {
  const { workflow, status, branch, limit = 20 } = options;
  let cmd = `run list -R ${repo}`;
  
  cmd += ` --limit ${limit}`;
  cmd += ' --json databaseId,displayTitle,name,status,conclusion,workflowName,headBranch,event,createdAt,updatedAt,url';
  
  if (workflow) {
    cmd += ` --workflow "${workflow}"`;
  }
  if (status) {
    cmd += ` --status ${status}`;
  }
  if (branch) {
    cmd += ` --branch ${branch}`;
  }
  
  return execGh(cmd);
}

/**
 * Get a specific workflow run
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} runId - Run ID
 * @returns {Object} Workflow run details
 */
function getWorkflowRun(repo, runId) {
  const cmd = `run view ${runId} -R ${repo} --json databaseId,displayTitle,name,status,conclusion,workflowName,headBranch,headSha,event,createdAt,updatedAt,url,jobs`;
  return execGh(cmd);
}

/**
 * Trigger a workflow
 * @param {string} repo - Repository in "owner/repo" format
 * @param {string} workflow - Workflow name or filename
 * @param {Object} options - Run options
 * @param {string} options.ref - Branch or tag to run on
 * @param {Object} options.inputs - Input parameters for the workflow
 * @returns {Object} Result message
 */
function runWorkflow(repo, workflow, options = {}) {
  const { ref = 'main', inputs = {} } = options;
  let cmd = `workflow run "${workflow}" -R ${repo} --ref ${ref}`;
  
  // Add workflow inputs
  for (const [key, value] of Object.entries(inputs)) {
    cmd += ` -f ${key}="${String(value).replace(/"/g, '\\"')}"`;
  }
  
  const output = execGhRaw(cmd);
  return { 
    message: output || `Workflow "${workflow}" triggered successfully on ${ref}`,
    workflow,
    ref
  };
}

/**
 * Watch a workflow run (get status updates)
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} runId - Run ID
 * @returns {Object} Final run status
 */
function watchWorkflowRun(repo, runId) {
  return getWorkflowRun(repo, runId);
}

/**
 * Cancel a workflow run
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} runId - Run ID
 * @returns {Object} Result
 */
function cancelWorkflowRun(repo, runId) {
  execGhRaw(`run cancel ${runId} -R ${repo}`);
  return { message: `Run ${runId} cancelled`, runId };
}

/**
 * Re-run a workflow
 * @param {string} repo - Repository in "owner/repo" format
 * @param {number} runId - Run ID
 * @returns {Object} Result
 */
function rerunWorkflow(repo, runId) {
  execGhRaw(`run rerun ${runId} -R ${repo}`);
  return { message: `Run ${runId} restarted`, runId };
}

// ===== Branch Operations =====

/**
 * List branches for a repository
 * @param {string} repo - Repository in "owner/repo" format
 * @returns {Array} List of branches
 */
function listBranches(repo) {
  const cmd = `api repos/${repo}/branches --jq '[.[] | {name: .name, protected: .protected, commit: .commit.sha}]'`;
  return execGh(cmd);
}

/**
 * Create a new branch
 * @param {string} repo - Repository in "owner/repo" format
 * @param {string} name - New branch name
 * @param {string} source - Source branch or commit SHA (default: default branch)
 * @returns {Object} Created branch info
 */
function createBranch(repo, name, source = null) {
  // First get the source SHA
  let sha;
  if (source) {
    // Try to get the SHA of the source branch
    try {
      const result = execGh(`api repos/${repo}/git/ref/heads/${source} --jq '.object.sha'`, false);
      sha = result.trim();
    } catch {
      // Assume it's already a SHA
      sha = source;
    }
  } else {
    // Get default branch SHA
    const repoInfo = getRepo(repo);
    const defaultBranch = repoInfo.defaultBranchRef?.name || 'main';
    const result = execGh(`api repos/${repo}/git/ref/heads/${defaultBranch} --jq '.object.sha'`, false);
    sha = result.trim();
  }
  
  // Create the branch
  const cmd = `api repos/${repo}/git/refs -f ref="refs/heads/${name}" -f sha="${sha}"`;
  execGh(cmd);
  
  return { name, sha, source: source || 'default branch' };
}

/**
 * Delete a branch
 * @param {string} repo - Repository in "owner/repo" format
 * @param {string} name - Branch name
 * @returns {Object} Result
 */
function deleteBranch(repo, name) {
  execGhRaw(`api -X DELETE repos/${repo}/git/refs/heads/${name}`);
  return { message: `Branch "${name}" deleted`, branch: name };
}

/**
 * Get branch protection rules
 * @param {string} repo - Repository in "owner/repo" format
 * @param {string} branch - Branch name
 * @returns {Object} Protection rules
 */
function getBranchProtection(repo, branch) {
  const cmd = `api repos/${repo}/branches/${branch}/protection`;
  return execGh(cmd);
}

// ===== Notifications =====

/**
 * List notifications
 * @param {Object} options - Filter options
 * @param {boolean} options.all - Include read notifications
 * @param {boolean} options.participating - Only show participating
 * @param {string} options.repo - Filter by repository
 * @returns {Array} List of notifications
 */
function listNotifications(options = {}) {
  const { all = false, participating = false, repo } = options;
  let endpoint = 'notifications';
  const params = [];
  
  if (all) params.push('all=true');
  if (participating) params.push('participating=true');
  
  if (params.length > 0) {
    endpoint += '?' + params.join('&');
  }
  
  let cmd = `api ${endpoint}`;
  
  if (repo) {
    cmd = `api repos/${repo}/notifications`;
    if (params.length > 0) {
      cmd += '?' + params.join('&');
    }
  }
  
  return execGh(cmd);
}

/**
 * Mark notification as read
 * @param {string} threadId - Notification thread ID
 * @returns {Object} Result
 */
function markNotificationRead(threadId) {
  execGhRaw(`api -X PATCH notifications/threads/${threadId}`);
  return { message: `Notification ${threadId} marked as read`, threadId };
}

/**
 * Mark all notifications as read
 * @param {string} repo - Optional repository to scope (owner/repo format)
 * @returns {Object} Result
 */
function markAllNotificationsRead(repo = null) {
  const lastReadAt = new Date().toISOString();
  
  if (repo) {
    execGhRaw(`api -X PUT repos/${repo}/notifications -f last_read_at="${lastReadAt}"`);
    return { message: `All notifications for ${repo} marked as read` };
  }
  
  execGhRaw(`api -X PUT notifications -f last_read_at="${lastReadAt}"`);
  return { message: 'All notifications marked as read' };
}

// ===== User Operations =====

/**
 * Get the authenticated user
 * @returns {Object} User info
 */
function getCurrentUser() {
  return execGh('api user');
}

/**
 * Get a user profile
 * @param {string} username - GitHub username
 * @returns {Object} User profile
 */
function getUser(username) {
  return execGh(`api users/${username}`);
}

/**
 * Search users
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @param {number} options.limit - Maximum results
 * @returns {Array} Search results
 */
function searchUsers(query, options = {}) {
  const { limit = 30 } = options;
  const cmd = `search users "${query.replace(/"/g, '\\"')}" --limit ${limit} --json login,name,type,followers,repos,location,email,bio,url`;
  return execGh(cmd);
}

module.exports = {
  // Repository Operations
  listRepos,
  searchRepos,
  getRepo,
  createRepo,
  forkRepo,
  deleteRepo,
  // Issue Operations
  listIssues,
  getIssue,
  createIssue,
  updateIssue,
  closeIssue,
  reopenIssue,
  addIssueComment,
  searchIssues,
  // Pull Request Operations
  listPRs,
  getPR,
  createPR,
  mergePR,
  closePR,
  reopenPR,
  addPRReview,
  addPRComment,
  requestReviewers,
  searchPRs,
  // GitHub Actions / Workflows
  listWorkflows,
  getWorkflowRuns,
  getWorkflowRun,
  runWorkflow,
  watchWorkflowRun,
  cancelWorkflowRun,
  rerunWorkflow,
  // Branch Operations
  listBranches,
  createBranch,
  deleteBranch,
  getBranchProtection,
  // Notifications
  listNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  // User Operations
  getCurrentUser,
  getUser,
  searchUsers
};

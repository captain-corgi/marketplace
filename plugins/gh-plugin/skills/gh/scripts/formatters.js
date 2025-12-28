/**
 * Output Formatters for GitHub Data
 * Format GitHub API responses into readable markdown
 */

/**
 * Truncate string to specified length with ellipsis
 * @param {string} str - String to truncate
 * @param {number} maxLen - Maximum length
 * @returns {string} Truncated string
 */
function truncate(str, maxLen) {
  if (!str) return '';
  if (str.length <= maxLen) return str;
  return str.substring(0, maxLen - 3) + '...';
}

/**
 * Format date string to readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

/**
 * Format relative time (e.g., "2 days ago")
 * @param {string} dateStr - ISO date string
 * @returns {string} Relative time string
 */
function formatRelativeTime(dateStr) {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return formatDate(dateStr);
}

/**
 * Format number with K/M suffix
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatCount(num) {
  if (num === undefined || num === null) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return String(num);
}

// ===== Repository Formatters =====

/**
 * Format a list of repositories as a markdown table
 * @param {Array} repos - List of repository objects
 * @returns {string} Markdown table
 */
function formatRepoList(repos) {
  if (!repos || repos.length === 0) {
    return 'No repositories found.';
  }

  const headers = '| Repository | Description | Stars | Forks | Language |';
  const separator = '|------------|-------------|-------|-------|----------|';
  const rows = repos.map(repo => {
    const name = repo.fullName || `${repo.owner?.login || repo.owner}/${repo.name}`;
    const desc = truncate(repo.description || '', 40);
    const stars = formatCount(repo.stargazerCount);
    const forks = formatCount(repo.forkCount);
    const lang = repo.primaryLanguage?.name || '-';
    const visibility = repo.isPrivate ? '🔒' : '';
    return `| ${visibility}${name} | ${desc} | ⭐${stars} | 🍴${forks} | ${lang} |`;
  });

  return [headers, separator, ...rows].join('\n');
}

/**
 * Format repository details
 * @param {Object} repo - Repository object
 * @returns {string} Formatted details
 */
function formatRepoDetail(repo) {
  const name = `${repo.owner?.login || repo.owner}/${repo.name}`;
  const visibility = repo.isPrivate ? '🔒 Private' : '🌐 Public';
  const archived = repo.isArchived ? ' (Archived)' : '';
  const fork = repo.isFork ? ' (Fork)' : '';

  let output = `## ${name}${archived}${fork}

**Visibility**: ${visibility}
**Description**: ${repo.description || 'No description'}

**Statistics**:
- ⭐ Stars: ${formatCount(repo.stargazerCount)}
- 🍴 Forks: ${formatCount(repo.forkCount)}
- 👀 Watchers: ${formatCount(repo.watchers?.totalCount || repo.watchers)}

**Details**:
- Primary Language: ${repo.primaryLanguage?.name || 'N/A'}
- License: ${repo.licenseInfo?.name || 'None'}
- Default Branch: ${repo.defaultBranchRef?.name || 'main'}
- Created: ${formatDate(repo.createdAt)}
- Last Push: ${formatDate(repo.pushedAt)}

**Features**:
- Issues: ${repo.hasIssuesEnabled ? '✅' : '❌'}
- Wiki: ${repo.hasWikiEnabled ? '✅' : '❌'}
- Projects: ${repo.hasProjectsEnabled ? '✅' : '❌'}
`;

  if (repo.homepageUrl) {
    output += `\n**Homepage**: ${repo.homepageUrl}`;
  }

  output += `\n\n**URL**: ${repo.url}`;

  return output;
}

// ===== Issue Formatters =====

/**
 * Format a list of issues as a markdown table
 * @param {Array} issues - List of issue objects
 * @returns {string} Markdown table
 */
function formatIssueList(issues) {
  if (!issues || issues.length === 0) {
    return 'No issues found.';
  }

  const headers = '| # | Title | State | Author | Labels | Updated |';
  const separator = '|---|-------|-------|--------|--------|---------|';
  const rows = issues.map(issue => {
    const num = `#${issue.number}`;
    const title = truncate(issue.title, 45);
    const state = issue.state === 'OPEN' ? '🟢 Open' : '🔴 Closed';
    const author = issue.author?.login || 'N/A';
    const labels = (issue.labels || []).slice(0, 2).map(l => l.name).join(', ') || '-';
    const updated = formatRelativeTime(issue.updatedAt);
    return `| ${num} | ${title} | ${state} | @${author} | ${labels} | ${updated} |`;
  });

  return [headers, separator, ...rows].join('\n');
}

/**
 * Format issue details
 * @param {Object} issue - Issue object
 * @returns {string} Formatted details
 */
function formatIssueDetail(issue) {
  const state = issue.state === 'OPEN' ? '🟢 Open' : '🔴 Closed';
  const assignees = (issue.assignees || []).map(a => `@${a.login}`).join(', ') || 'None';
  const labels = (issue.labels || []).map(l => `\`${l.name}\``).join(' ') || 'None';

  let output = `## Issue #${issue.number}: ${issue.title}

**State**: ${state}
**Author**: @${issue.author?.login || 'N/A'}
**Assignees**: ${assignees}
**Labels**: ${labels}
**Milestone**: ${issue.milestone?.title || 'None'}

**Created**: ${formatDate(issue.createdAt)}
**Updated**: ${formatDate(issue.updatedAt)}
${issue.closedAt ? `**Closed**: ${formatDate(issue.closedAt)}` : ''}

---

${issue.body || '*No description provided*'}

**URL**: ${issue.url}
`;

  if (issue.comments && issue.comments.length > 0) {
    output += `\n\n### Comments (${issue.comments.length})\n`;
    issue.comments.slice(0, 5).forEach(comment => {
      output += `\n**@${comment.author?.login}** (${formatRelativeTime(comment.createdAt)}):\n${truncate(comment.body, 200)}\n`;
    });
    if (issue.comments.length > 5) {
      output += `\n*...and ${issue.comments.length - 5} more comments*`;
    }
  }

  return output;
}

// ===== Pull Request Formatters =====

/**
 * Format a list of pull requests as a markdown table
 * @param {Array} prs - List of PR objects
 * @returns {string} Markdown table
 */
function formatPRList(prs) {
  if (!prs || prs.length === 0) {
    return 'No pull requests found.';
  }

  const headers = '| # | Title | State | Author | Base ← Head | Updated |';
  const separator = '|---|-------|-------|--------|-------------|---------|';
  const rows = prs.map(pr => {
    const num = `#${pr.number}`;
    const title = truncate(pr.title, 40);
    let state = pr.state === 'OPEN' ? '🟢 Open' : pr.state === 'MERGED' ? '🟣 Merged' : '🔴 Closed';
    if (pr.isDraft) state = '📝 Draft';
    const author = pr.author?.login || 'N/A';
    const branches = `${pr.baseRefName} ← ${truncate(pr.headRefName, 15)}`;
    const updated = formatRelativeTime(pr.updatedAt);
    return `| ${num} | ${title} | ${state} | @${author} | ${branches} | ${updated} |`;
  });

  return [headers, separator, ...rows].join('\n');
}

/**
 * Format pull request details
 * @param {Object} pr - Pull request object
 * @returns {string} Formatted details
 */
function formatPRDetail(pr) {
  let state = pr.state === 'OPEN' ? '🟢 Open' : pr.state === 'MERGED' ? '🟣 Merged' : '🔴 Closed';
  if (pr.isDraft) state = '📝 Draft';
  
  const assignees = (pr.assignees || []).map(a => `@${a.login}`).join(', ') || 'None';
  const labels = (pr.labels || []).map(l => `\`${l.name}\``).join(' ') || 'None';
  const reviewers = (pr.reviewRequests || []).map(r => `@${r.login}`).join(', ') || 'None requested';
  
  let reviewStatus = 'No reviews';
  if (pr.reviewDecision) {
    const decisions = {
      'APPROVED': '✅ Approved',
      'CHANGES_REQUESTED': '🔄 Changes Requested',
      'REVIEW_REQUIRED': '⏳ Review Required'
    };
    reviewStatus = decisions[pr.reviewDecision] || pr.reviewDecision;
  }

  let mergeStatus = 'N/A';
  if (pr.mergeable) {
    mergeStatus = pr.mergeable === 'MERGEABLE' ? '✅ Can be merged' : 
                  pr.mergeable === 'CONFLICTING' ? '❌ Has conflicts' : pr.mergeable;
  }

  let output = `## PR #${pr.number}: ${pr.title}

**State**: ${state}
**Author**: @${pr.author?.login || 'N/A'}
**Assignees**: ${assignees}
**Labels**: ${labels}

**Branches**: \`${pr.headRefName}\` → \`${pr.baseRefName}\`
**Merge Status**: ${mergeStatus}
**Review Status**: ${reviewStatus}
**Requested Reviewers**: ${reviewers}

**Changes**:
- 📝 ${pr.changedFiles || 0} files changed
- ➕ ${pr.additions || 0} additions
- ➖ ${pr.deletions || 0} deletions
- 🔨 ${pr.commits?.totalCount || pr.commits || 0} commits

**Created**: ${formatDate(pr.createdAt)}
**Updated**: ${formatDate(pr.updatedAt)}
${pr.mergedAt ? `**Merged**: ${formatDate(pr.mergedAt)}` : ''}
${pr.closedAt && !pr.mergedAt ? `**Closed**: ${formatDate(pr.closedAt)}` : ''}

---

${pr.body || '*No description provided*'}

**URL**: ${pr.url}
`;

  if (pr.reviews && pr.reviews.length > 0) {
    output += `\n\n### Reviews (${pr.reviews.length})\n`;
    pr.reviews.slice(0, 5).forEach(review => {
      const reviewState = {
        'APPROVED': '✅',
        'CHANGES_REQUESTED': '🔄',
        'COMMENTED': '💬',
        'DISMISSED': '❌'
      };
      output += `\n${reviewState[review.state] || '•'} **@${review.author?.login}** - ${review.state}\n`;
    });
  }

  return output;
}

// ===== Workflow / Actions Formatters =====

/**
 * Format a list of workflows as a markdown table
 * @param {Array} workflows - List of workflow objects
 * @returns {string} Markdown table
 */
function formatWorkflowList(workflows) {
  if (!workflows || workflows.length === 0) {
    return 'No workflows found.';
  }

  const headers = '| ID | Name | State | Path |';
  const separator = '|----|------|-------|------|';
  const rows = workflows.map(wf => {
    const state = wf.state === 'active' ? '✅ Active' : '❌ Disabled';
    return `| ${wf.id} | ${wf.name} | ${state} | ${wf.path} |`;
  });

  return [headers, separator, ...rows].join('\n');
}

/**
 * Format a list of workflow runs as a markdown table
 * @param {Array} runs - List of workflow run objects
 * @returns {string} Markdown table
 */
function formatWorkflowRunList(runs) {
  if (!runs || runs.length === 0) {
    return 'No workflow runs found.';
  }

  const headers = '| ID | Workflow | Status | Branch | Event | Started |';
  const separator = '|----|----------|--------|--------|-------|---------|';
  const rows = runs.map(run => {
    const statusIcons = {
      'completed': run.conclusion === 'success' ? '✅' : run.conclusion === 'failure' ? '❌' : '⚪',
      'in_progress': '🔄',
      'queued': '⏳',
      'waiting': '⏳'
    };
    const status = `${statusIcons[run.status] || '•'} ${run.status}`;
    return `| ${run.databaseId} | ${truncate(run.workflowName, 25)} | ${status} | ${run.headBranch} | ${run.event} | ${formatRelativeTime(run.createdAt)} |`;
  });

  return [headers, separator, ...rows].join('\n');
}

/**
 * Format workflow run details
 * @param {Object} run - Workflow run object
 * @returns {string} Formatted details
 */
function formatWorkflowRunDetail(run) {
  const statusIcons = {
    'completed': run.conclusion === 'success' ? '✅ Success' : run.conclusion === 'failure' ? '❌ Failed' : `⚪ ${run.conclusion}`,
    'in_progress': '🔄 In Progress',
    'queued': '⏳ Queued',
    'waiting': '⏳ Waiting'
  };
  const status = statusIcons[run.status] || run.status;

  let output = `## Workflow Run #${run.databaseId}

**Workflow**: ${run.workflowName}
**Title**: ${run.displayTitle || run.name}
**Status**: ${status}

**Branch**: ${run.headBranch}
**Commit**: ${run.headSha?.substring(0, 7) || 'N/A'}
**Event**: ${run.event}

**Started**: ${formatDate(run.createdAt)}
**Updated**: ${formatDate(run.updatedAt)}

**URL**: ${run.url}
`;

  if (run.jobs && run.jobs.length > 0) {
    output += `\n### Jobs\n`;
    run.jobs.forEach(job => {
      const jobStatus = job.conclusion === 'success' ? '✅' : 
                       job.conclusion === 'failure' ? '❌' : 
                       job.status === 'in_progress' ? '🔄' : '⏳';
      output += `- ${jobStatus} ${job.name}\n`;
    });
  }

  return output;
}

// ===== Branch Formatters =====

/**
 * Format a list of branches as a markdown table
 * @param {Array} branches - List of branch objects
 * @returns {string} Markdown table
 */
function formatBranchList(branches) {
  if (!branches || branches.length === 0) {
    return 'No branches found.';
  }

  const headers = '| Branch | Protected | Last Commit |';
  const separator = '|--------|-----------|-------------|';
  const rows = branches.map(branch => {
    const protected_ = branch.protected ? '🔒 Yes' : 'No';
    const commit = branch.commit?.substring(0, 7) || 'N/A';
    return `| ${branch.name} | ${protected_} | ${commit} |`;
  });

  return [headers, separator, ...rows].join('\n');
}

// ===== Notification Formatters =====

/**
 * Format a list of notifications as a markdown table
 * @param {Array} notifications - List of notification objects
 * @returns {string} Markdown table
 */
function formatNotificationList(notifications) {
  if (!notifications || notifications.length === 0) {
    return 'No notifications found.';
  }

  const headers = '| Type | Repository | Title | Reason | Updated |';
  const separator = '|------|------------|-------|--------|---------|';
  const rows = notifications.map(notif => {
    const typeIcons = {
      'Issue': '🟢',
      'PullRequest': '🔀',
      'Release': '📦',
      'Discussion': '💬',
      'Commit': '📝'
    };
    const type = `${typeIcons[notif.subject?.type] || '•'} ${notif.subject?.type || 'N/A'}`;
    const repo = notif.repository?.full_name || 'N/A';
    const title = truncate(notif.subject?.title || '', 35);
    const reason = notif.reason || 'N/A';
    const updated = formatRelativeTime(notif.updated_at);
    return `| ${type} | ${repo} | ${title} | ${reason} | ${updated} |`;
  });

  return [headers, separator, ...rows].join('\n');
}

// ===== User Formatters =====

/**
 * Format user profile
 * @param {Object} user - User object
 * @returns {string} Formatted profile
 */
function formatUserProfile(user) {
  const type = user.type === 'Organization' ? '🏢 Organization' : '👤 User';
  
  return `## ${user.name || user.login}

**Username**: @${user.login}
**Type**: ${type}
${user.bio ? `**Bio**: ${user.bio}` : ''}
${user.location ? `**Location**: 📍 ${user.location}` : ''}
${user.email ? `**Email**: ✉️ ${user.email}` : ''}
${user.company ? `**Company**: 🏢 ${user.company}` : ''}

**Statistics**:
- 👥 Followers: ${formatCount(user.followers)}
- 👤 Following: ${formatCount(user.following)}
- 📁 Public Repos: ${formatCount(user.public_repos)}
- 📝 Public Gists: ${formatCount(user.public_gists)}

**Joined**: ${formatDate(user.created_at)}

**Profile**: ${user.html_url || user.url}
`;
}

/**
 * Format a list of users as a markdown table
 * @param {Array} users - List of user objects
 * @returns {string} Markdown table
 */
function formatUserList(users) {
  if (!users || users.length === 0) {
    return 'No users found.';
  }

  const headers = '| Username | Name | Type | Followers | Repos |';
  const separator = '|----------|------|------|-----------|-------|';
  const rows = users.map(user => {
    const type = user.type === 'Organization' ? '🏢' : '👤';
    return `| @${user.login} | ${user.name || '-'} | ${type} | ${formatCount(user.followers)} | ${formatCount(user.repos)} |`;
  });

  return [headers, separator, ...rows].join('\n');
}

// ===== Auth Status Formatter =====

/**
 * Format authentication status
 * @param {Object} status - Auth status object from validateConfig
 * @returns {string} Formatted status
 */
function formatAuthStatus(status) {
  if (!status.valid) {
    return `## ❌ GitHub CLI Status

**Status**: Not configured

**Issues**:
${status.errors.map(e => `- ${e}`).join('\n')}

**Setup Instructions**:
1. Install GitHub CLI: https://cli.github.com/
2. Run: \`gh auth login\`
`;
  }

  return `## ✅ GitHub CLI Status

**Status**: Connected
**Version**: ${status.ghVersion}
**Account**: @${status.account}
**Host**: ${status.host}
`;
}

module.exports = {
  // Utilities
  truncate,
  formatDate,
  formatRelativeTime,
  formatCount,
  // Repository
  formatRepoList,
  formatRepoDetail,
  // Issues
  formatIssueList,
  formatIssueDetail,
  // Pull Requests
  formatPRList,
  formatPRDetail,
  // Workflows
  formatWorkflowList,
  formatWorkflowRunList,
  formatWorkflowRunDetail,
  // Branches
  formatBranchList,
  // Notifications
  formatNotificationList,
  // Users
  formatUserProfile,
  formatUserList,
  // Auth
  formatAuthStatus
};

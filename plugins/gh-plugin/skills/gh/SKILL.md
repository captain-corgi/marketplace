---
name: gh
description: This skill should be used when the user asks to "create a GitHub issue", "list repositories", "create a pull request", "merge a PR", "trigger a workflow", "list branches", or performs any GitHub operations. Provides comprehensive GitHub API integration via GitHub CLI.
---

# GitHub Integration Skill

## Overview

This skill provides comprehensive GitHub integration through the GitHub CLI (gh). Access GitHub REST API for repository management, issue tracking, pull requests, GitHub Actions, branches, and notifications.

## Environment Requirements

GitHub CLI must be installed and authenticated:

1. Install GitHub CLI: https://cli.github.com/
2. Authenticate: `gh auth login`

No environment variables needed - uses gh's stored authentication.

Validate configuration with `auth.validateConfig()` before making API calls.

## Skill Scripts

### scripts/auth.js

Authentication and configuration utilities:

- `validateConfig()` - Verify gh CLI is installed and authenticated
- `getAuthStatus()` - Get current auth info (account, host, protocol)
- `getCurrentUser()` - Get authenticated user details
- `isGhInstalled()` - Check if gh CLI is available
- `isAuthenticated()` - Check authentication status
- `getCurrentRepo()` - Get current repository context (if in a git repo)
- `parseRepoString(repoString)` - Parse "owner/repo" format

### scripts/api.js

GitHub API client with 40+ functions organized by category:

**Repository Operations:**

- `listRepos(owner, options)` - List repos for user/org. Options: `{limit, visibility, type}`
- `searchRepos(query, options)` - Search repositories. Options: `{limit, sort, order}`
- `getRepo(repo)` - Get repo details by "owner/repo"
- `createRepo(name, options)` - Create new repo. Options: `{description, visibility, clone, gitignore, license}`
- `forkRepo(repo, options)` - Fork a repo. Options: `{org, name, clone}`
- `deleteRepo(repo)` - Delete a repository (requires confirmation)

**Issue Operations:**

- `listIssues(repo, options)` - List issues. Options: `{state, assignee, author, label, limit}`
- `getIssue(repo, number)` - Get issue details
- `createIssue(repo, title, options)` - Create issue. Options: `{body, labels, assignees, milestone}`
- `updateIssue(repo, number, fields)` - Update issue. Fields: `{title, body, addLabels, removeLabels, addAssignees, removeAssignees}`
- `closeIssue(repo, number, reason)` - Close issue. Reason: "completed" or "not_planned"
- `reopenIssue(repo, number)` - Reopen a closed issue
- `addIssueComment(repo, number, body)` - Add comment to issue
- `searchIssues(query, options)` - Search issues across GitHub

**Pull Request Operations:**

- `listPRs(repo, options)` - List PRs. Options: `{state, base, head, author, limit}`
- `getPR(repo, number)` - Get PR details
- `createPR(repo, options)` - Create PR. Options: `{title, body, base, head, draft, labels, assignees, reviewers}`
- `mergePR(repo, number, options)` - Merge PR. Options: `{method, deleteBranch, subject, body}`. Methods: merge, squash, rebase
- `closePR(repo, number)` - Close PR without merging
- `reopenPR(repo, number)` - Reopen a closed PR
- `addPRReview(repo, number, options)` - Add review. Options: `{event, body}`. Events: approve, request-changes, comment
- `addPRComment(repo, number, body)` - Add comment to PR
- `requestReviewers(repo, number, reviewers)` - Request reviewers
- `searchPRs(query, options)` - Search PRs across GitHub

**GitHub Actions / Workflows:**

- `listWorkflows(repo)` - List repository workflows
- `getWorkflowRuns(repo, options)` - Get workflow runs. Options: `{workflow, status, branch, limit}`
- `getWorkflowRun(repo, runId)` - Get specific run details
- `runWorkflow(repo, workflow, options)` - Trigger workflow. Options: `{ref, inputs}`
- `cancelWorkflowRun(repo, runId)` - Cancel a running workflow
- `rerunWorkflow(repo, runId)` - Re-run a workflow

**Branch Operations:**

- `listBranches(repo)` - List all branches
- `createBranch(repo, name, source)` - Create branch from source (branch name or SHA)
- `deleteBranch(repo, name)` - Delete a branch
- `getBranchProtection(repo, branch)` - Get protection rules

**Notifications:**

- `listNotifications(options)` - List notifications. Options: `{all, participating, repo}`
- `markNotificationRead(threadId)` - Mark notification as read
- `markAllNotificationsRead(repo)` - Mark all as read (optionally scoped to repo)

**User Operations:**

- `getCurrentUser()` - Get authenticated user
- `getUser(username)` - Get user profile
- `searchUsers(query, options)` - Search users

### scripts/formatters.js

Output formatting functions for consistent markdown output:

**Repository:**
- `formatRepoList(repos)` - Markdown table: Name, Description, Stars, Forks, Language
- `formatRepoDetail(repo)` - Full repo details with stats, features, and links

**Issues:**
- `formatIssueList(issues)` - Issue table: Number, Title, State, Author, Labels, Updated
- `formatIssueDetail(issue)` - Full issue details with comments

**Pull Requests:**
- `formatPRList(prs)` - PR table: Number, Title, State, Author, Branches, Updated
- `formatPRDetail(pr)` - Full PR details with reviews and changes

**Workflows:**
- `formatWorkflowList(workflows)` - Workflow table: ID, Name, State, Path
- `formatWorkflowRunList(runs)` - Run table: ID, Workflow, Status, Branch, Event
- `formatWorkflowRunDetail(run)` - Full run details with jobs

**Other:**
- `formatBranchList(branches)` - Branch table: Name, Protected, Last Commit
- `formatNotificationList(notifications)` - Notification table
- `formatUserProfile(user)` - User profile details
- `formatUserList(users)` - User table
- `formatAuthStatus(status)` - Auth status display

All formatters handle empty arrays gracefully with "No X found" messages.

## Domain Knowledge

### Repository Visibility

- `public` - Anyone can see
- `private` - Only you and collaborators
- `internal` - Only organization members (Enterprise)

### Issue States

- `open` - Active issue
- `closed` - Resolved issue (completed or not_planned)

### Pull Request States

- `open` - Active PR awaiting merge
- `closed` - Closed without merging
- `merged` - Successfully merged

### PR Merge Methods

- `merge` - Create merge commit (preserves all commits)
- `squash` - Squash into single commit
- `rebase` - Rebase and merge (linear history)

### Workflow Run Status

- `queued` - Waiting to run
- `in_progress` - Currently running
- `completed` - Finished (check conclusion for result)

### Workflow Conclusions

- `success` - All steps passed
- `failure` - One or more steps failed
- `cancelled` - Run was cancelled
- `skipped` - Run was skipped
- `timed_out` - Run exceeded time limit

### PR Review Events

- `approve` - Approve the changes
- `request-changes` - Request modifications
- `comment` - Leave a comment without approval/rejection

### Search Qualifiers

GitHub search supports qualifiers for precise results:

**Repository Search:**
```
language:javascript stars:>1000 pushed:>2024-01-01
user:microsoft topic:api
```

**Issue Search:**
```
is:open is:issue label:bug author:username
repo:owner/repo assignee:username
```

**PR Search:**
```
is:pr is:open review:required
is:pr is:merged merged:>2024-01-01
```

## API Endpoints Reference

| Endpoint | Purpose |
|----------|---------|
| `gh repo list` | List repositories |
| `gh repo view` | Get repository |
| `gh repo create` | Create repository |
| `gh repo fork` | Fork repository |
| `gh issue list` | List issues |
| `gh issue view` | Get issue |
| `gh issue create` | Create issue |
| `gh issue edit` | Edit issue |
| `gh issue close` | Close issue |
| `gh issue comment` | Add comment |
| `gh pr list` | List pull requests |
| `gh pr view` | Get pull request |
| `gh pr create` | Create pull request |
| `gh pr merge` | Merge pull request |
| `gh pr review` | Add review |
| `gh pr comment` | Add comment |
| `gh workflow list` | List workflows |
| `gh workflow run` | Trigger workflow |
| `gh run list` | List workflow runs |
| `gh run view` | Get run details |
| `gh api` | Direct API calls |

## Error Handling

| Error | Meaning | Action |
|-------|---------|--------|
| gh not installed | CLI not available | Install from https://cli.github.com/ |
| Not authenticated | No valid session | Run `gh auth login` |
| 404 Not Found | Resource doesn't exist | Verify repo/issue/PR exists |
| 403 Forbidden | No permission | Check repo access |
| 422 Validation Failed | Invalid input | Check required fields |

Common error scenarios:
- Repository not found: Verify "owner/repo" format
- Permission denied: Check if you have write access
- Branch conflicts: Pull latest changes before merging
- Protected branch: Review branch protection rules

## Command Workflows

This skill supports 24 commands:

**Repository Operations:**
- `/gh-repos [owner]` - List repositories
- `/gh-search-repos <query>` - Search repositories
- `/gh-get-repo <owner/repo>` - Get repository details
- `/gh-create-repo <name> [options]` - Create repository
- `/gh-fork <owner/repo>` - Fork repository

**Issue Operations:**
- `/gh-issues <owner/repo> [state]` - List issues
- `/gh-get-issue <owner/repo> <number>` - Get issue details
- `/gh-create-issue <owner/repo> title="<text>" [body="<text>"]` - Create issue
- `/gh-edit-issue <owner/repo> <number> [field=value...]` - Edit issue
- `/gh-close-issue <owner/repo> <number>` - Close issue
- `/gh-comment-issue <owner/repo> <number> "<comment>"` - Add comment

**Pull Request Operations:**
- `/gh-prs <owner/repo> [state]` - List pull requests
- `/gh-get-pr <owner/repo> <number>` - Get PR details
- `/gh-create-pr <owner/repo> [options]` - Create pull request
- `/gh-merge-pr <owner/repo> <number> [method]` - Merge PR
- `/gh-review-pr <owner/repo> <number> <event> [body]` - Add review

**Actions Operations:**
- `/gh-actions <owner/repo>` - List workflows
- `/gh-run-workflow <owner/repo> <workflow> [ref]` - Trigger workflow
- `/gh-workflow-status <owner/repo> [workflow]` - Get run status

**Branch Operations:**
- `/gh-branches <owner/repo>` - List branches
- `/gh-create-branch <owner/repo> <name> [source]` - Create branch
- `/gh-delete-branch <owner/repo> <name>` - Delete branch

**Other:**
- `/gh-notifications` - List notifications
- `/gh-status` - Test connection and show auth status

## Usage Examples

### Listing Repositories

```javascript
const api = require('${CLAUDE_PLUGIN_ROOT}/skills/gh/scripts/api.js');
const formatters = require('${CLAUDE_PLUGIN_ROOT}/skills/gh/scripts/formatters.js');

// List your repos
const repos = await api.listRepos(null, { limit: 10 });
console.log(formatters.formatRepoList(repos));

// List org repos
const orgRepos = await api.listRepos('microsoft', { limit: 20 });
console.log(formatters.formatRepoList(orgRepos));
```

### Working with Issues

```javascript
const api = require('${CLAUDE_PLUGIN_ROOT}/skills/gh/scripts/api.js');
const formatters = require('${CLAUDE_PLUGIN_ROOT}/skills/gh/scripts/formatters.js');

// Create an issue
const issue = await api.createIssue('owner/repo', 'Bug: Login fails', {
  body: 'Steps to reproduce...',
  labels: ['bug', 'high-priority'],
  assignees: ['developer']
});
console.log(`Created issue #${issue.number}`);

// List open issues
const issues = await api.listIssues('owner/repo', { state: 'open' });
console.log(formatters.formatIssueList(issues));

// Close an issue
await api.closeIssue('owner/repo', 123);
```

### Creating and Merging PRs

```javascript
const api = require('${CLAUDE_PLUGIN_ROOT}/skills/gh/scripts/api.js');

// Create a PR
const pr = await api.createPR('owner/repo', {
  title: 'Add new feature',
  body: 'This PR adds...',
  head: 'feature-branch',
  base: 'main',
  reviewers: ['reviewer1', 'reviewer2']
});

// Merge with squash
await api.mergePR('owner/repo', pr.number, {
  method: 'squash',
  deleteBranch: true
});
```

### Triggering Workflows

```javascript
const api = require('${CLAUDE_PLUGIN_ROOT}/skills/gh/scripts/api.js');

// Trigger a workflow with inputs
await api.runWorkflow('owner/repo', 'deploy.yml', {
  ref: 'main',
  inputs: {
    environment: 'production',
    version: '1.2.3'
  }
});

// Check workflow status
const runs = await api.getWorkflowRuns('owner/repo', { 
  workflow: 'deploy.yml',
  limit: 5 
});
```

### Branch Management

```javascript
const api = require('${CLAUDE_PLUGIN_ROOT}/skills/gh/scripts/api.js');

// Create a feature branch from main
await api.createBranch('owner/repo', 'feature/new-feature', 'main');

// List all branches
const branches = await api.listBranches('owner/repo');

// Delete a merged branch
await api.deleteBranch('owner/repo', 'feature/old-feature');
```

## Progressive Disclosure

For detailed GitHub search patterns and advanced query examples, see `references/gh-cli-patterns.md`.

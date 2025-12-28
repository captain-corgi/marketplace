---
name: jira
description: This skill should be used when the user asks to "create a Jira issue", "search Jira", "get issue details", "manage sprints", "list boards", "transition issue status", "add Jira comment", "convert to subtasks", or performs any Jira Cloud operations. Provides comprehensive Jira API integration with issue tracking, sprint management, Agile/Scrum workflows, and bulk operations.
---

# Jira Cloud Integration Skill

## Overview

This skill provides comprehensive Jira Cloud API integration through a unified interface to bundled scripts. Access Jira Cloud REST API v3 and Agile API v1.0 for issue tracking, sprint management, and Agile/Scrum workflows.

## Environment Requirements

Set these environment variables before using this skill:

- `JIRA_URL` - Jira instance URL (e.g., https://your-domain.atlassian.net)
- `JIRA_EMAIL` - Account email for authentication
- `JIRA_API_KEY` - API token from id.atlassian.com/manage-profile/security/api-tokens

Validate configuration with `auth.validateConfig()` before making API calls.

## Skill Scripts

### scripts/auth.js

Authentication and configuration utilities:

- `validateConfig()` - Verify environment variables are set and JIRA_URL format is valid
- `getJiraUrl()` - Get configured JIRA_URL
- `getAuthHeaders()` - Get Basic Auth headers for API requests (email + API key)

### scripts/api.js

Jira REST API client with 22 functions organized by category:

**Issue Management:**

- `createIssue(fields)` - Create new issue. Fields object: `{project: {key}, summary, issuetype: {name}, priority: {name}, assignee: {name}, description}`
- `getIssue(issueKey)` - Get issue details by key (e.g., PROJ-123)
- `updateIssue(issueKey, fields)` - Edit issue with partial fields object
- `searchIssues(jql, maxResults, startAt)` - Search with JQL. Uses new /search/jql endpoint + batch fetch for full details
- `batchFetchIssues(issueIds, concurrency)` - Parallel issue fetching (max 10 concurrent)
- `getTransitions(issueKey)` - Get available workflow transitions for current status
- `transitionIssue(issueKey, transitionId, fields)` - Change status using transition ID

**Comments:**

- `getComments(issueKey)` - Get all comments for an issue
- `addComment(issueKey, body)` - Add comment. Automatically converts plain text to Atlassian Document Format (ADF)

**Agile/Scrum:**

- `getBoards(boardType, maxResults)` - List boards. Optional type filter: "scrum" or "kanban"
- `getSprints(boardId, state)` - List sprints for a board. Optional state filter: "active", "closed", "future"
- `getSprintIssues(sprintId)` - Get all issues in a sprint
- `createSprint(name, boardId, startDate, endDate)` - Create new sprint. Dates optional (ISO 8601: YYYY-MM-DD)
- `moveIssuesToSprint(sprintId, issueKeys)` - Move issues to sprint. Max 1000 issues

**Bulk Operations:**

- `bulkMoveIssues(options)` - Bulk move/convert issues. Returns taskId for async tracking. Options: `{issueIdsOrKeys, projectKey, issueTypeId, parentKey, sendNotification}`
- `getBulkTaskStatus(taskId)` - Check async operation progress by taskId
- `convertToSubtasks(issueKeys, parentKey, projectKey)` - Convert issues to sub-tasks. Wrapper for bulkMoveIssues

**Projects:**

- `getProjects()` - List all accessible projects
- `getProject(keyOrId)` - Get project details by key or ID

**User & Assignment:**

- `getCurrentUser()` - Get authenticated user (returns accountId)
- `searchUsers(query, maxResults)` - Search users by email or display name
- `assignIssue(issueKey, emailOrAccount)` - Assign issue. Converts email to accountId automatically

### scripts/formatters.js

Output formatting functions for consistent markdown output:

- `formatIssueList(issues)` - Markdown table: Key, Summary, Status, Priority, Assignee
- `formatIssueDetail(issue)` - Full issue details with URL, status, priority, type, assignee, reporter, created/updated dates, description
- `formatSprintList(sprints)` - Sprint table: ID, Name, State, Start Date, End Date
- `formatBoardList(boards)` - Board table: ID, Name, Type
- `formatProjectList(projects)` - Project table: Key, Name, Type, Lead

All formatters handle empty arrays gracefully with "No X found" messages.

## Domain Knowledge

### Issue Key Format

PROJ-123 (project key + number). Project keys are case-sensitive and typically uppercase.

### Issue Types

Common types (project-specific): Bug, Story, Task, Epic, Sub-task, Spike

Sub-tasks require a parent issue. Epic is a large body of work. Spike is for research/investigation.

### Priority Levels

Common levels (varies by config): Critical, High, Medium, Low, Trivial

Priority names are case-insensitive when setting.

### Board Types

- `scrum` - Iterative development with sprints
- `kanban` - Continuous flow with columns

### Sprint States

- `active` - Currently running sprint
- `closed` - Completed sprint
- `future` - Planned but not started

### Project Types

- `Software` - Jira Software (Agile/Scrum)
- `Business` - Jira Work Management
- `Service Desk` - Jira Service Management

### JQL (Jira Query Language)

JQL enables flexible issue searching.

**Operators:** `=`, `!=`, `>`, `<`, `>=`, `<=`, `IN`, `NOT IN`, `AND`, `OR`, `NOT`, `ORDER BY`

**Functions:** `currentUser()`, `openSprints()`, `closedSprints()`

**Relative Dates:** `-7d` (7 days ago), `-2w` (2 weeks ago), `-1m` (1 month ago)

**Common Patterns:**

```sql
-- Issues in project with specific status
project = PROJ AND status = "In Progress"

-- Assigned to current user, not done
assignee = currentUser() AND status != Done

-- In active sprints, to do status
sprint = openSprints() AND status = "To Do"

-- Created recently, ordered by priority
created >= -7d ORDER BY priority DESC

-- Bugs with high priority
issuetype = Bug AND priority in (High, Critical)

-- Issues with specific labels
labels in (urgent, frontend)
```

### Workflow Transitions

Important: Status cannot be edited directly using `updateIssue()`. Must use transition API.

1. Call `getTransitions(issueKey)` to get available transitions
2. Find matching transition by name (case-insensitive) or ID
3. Call `transitionIssue(issueKey, transitionId, fields)` to execute

Available transitions depend on current status and workflow configuration. Some transitions require additional fields (resolution, fixVersion).

### Async Bulk Operations

The Bulk Move API runs asynchronously:

1. Call `bulkMoveIssues()` or `convertToSubtasks()` - returns taskId
2. Poll with `getBulkTaskStatus(taskId)` to check progress
3. Max 1000 issues per operation

Sub-task conversion requires Bulk Move API - it's the only way to set a parent issue.

## API Endpoints Reference

| Endpoint | Purpose |
|----------|---------|
| GET /rest/api/3/issue/{key} | Get issue |
| POST /rest/api/3/issue | Create issue |
| PUT /rest/api/3/issue/{key} | Update issue |
| GET /rest/api/3/search/jql | Search issues (returns IDs only) |
| GET /rest/api/3/issue/{key}/transitions | Get available transitions |
| POST /rest/api/3/issue/{key}/transitions | Execute transition |
| GET /rest/api/3/issue/{key}/comment | Get comments |
| POST /rest/api/3/issue/{key}/comment | Add comment |
| GET /rest/api/3/project | List projects |
| GET /rest/api/3/project/{key} | Get project details |
| GET /rest/api/3/myself | Get current user |
| GET /rest/api/3/user/search | Search users |
| PUT /rest/api/3/issue/{key}/assignee | Assign issue |
| GET /rest/agile/1.0/board | List boards |
| GET /rest/agile/1.0/board/{id}/sprint | List board sprints |
| GET /rest/agile/1.0/sprint/{id}/issue | Get sprint issues |
| POST /rest/agile/1.0/sprint | Create sprint |
| POST /rest/agile/1.0/sprint/{id}/issue | Move issues to sprint |
| POST /rest/api/3/bulk/issues/move | Bulk operations |
| GET /rest/api/3/bulk/tasks/{id} | Get bulk task status |

## Error Handling

| HTTP Status | Meaning | Action |
|-------------|---------|--------|
| 200 | Success | Continue |
| 400 | Bad Request | Invalid input or field value |
| 401 | Unauthorized | Check credentials (email/API key) |
| 403 | Forbidden | Permission denied for operation |
| 404 | Not Found | Issue/project/board doesn't exist |

Common error scenarios:
- Missing required fields: Include project, summary, issuetype for issue creation
- Invalid project key: Use `/jira-projects` to list valid keys
- Invalid issue type: Types vary by project configuration
- Invalid transition: Use `getTransitions()` to get available transitions
- Already in target status: Check current status before transitioning

## Command Workflows

This skill supports 15 commands:

**Simple Queries:**

- `/jira-projects` - List all projects
- `/jira-boards [boardType]` - List boards (optional: scrum or kanban)
- `/jira-get-issue <issueKey>` - Get issue details
- `/jira-get-comments <issueKey>` - Get all comments
- `/jira-sprints <boardId> [state]` - List sprints (optional: active, closed, future)
- `/jira-sprint-issues <sprintId>` - Get issues in sprint
- `/jira-status` - Test connection and verify configuration

**Issue Operations:**

- `/jira-create-issue project=<key> summary="<text>" issuetype=<type> [priority=<level>] [assignee=<email>] [description="<text>"]`
- `/jira-edit-issue <issueKey> field=value ...`
- `/jira-transition <issueKey> <statusName>`

**Search:**

- `/jira-search "<jql>" [maxResults=<n>]`

**Comments:**

- `/jira-comment <issueKey> "<comment text>"`

**Sprint Operations:**

- `/jira-create-sprint name="<name>" boardId=<id> [startDate=<YYYY-MM-DD>] [endDate=<YYYY-MM-DD>]`
- `/jira-move-to-sprint sprintId=<id> issues=<key1>,<key2>,...`

**Bulk Operations:**

- `/jira-convert-to-subtasks <parentKey> <childKey1> [<childKey2> ...]`

## Usage Examples

### Creating an Issue

```javascript
const api = require('${CLAUDE_PLUGIN_ROOT}/skills/jira/scripts/api.js');

const fields = {
  project: { key: "PROJ" },
  summary: "Fix login bug",
  issuetype: { name: "Bug" },
  priority: { name: "High" }
};

const result = await api.createIssue(fields);
console.log(`Created: ${result.key}`);
```

### Searching Issues

```javascript
const api = require('${CLAUDE_PLUGIN_ROOT}/skills/jira/scripts/api.js');
const formatters = require('${CLAUDE_PLUGIN_ROOT}/skills/jira/scripts/formatters.js');

const jql = 'project = PROJ AND status = "In Progress"';
const result = await api.searchIssues(jql, 50);
console.log(formatters.formatIssueList(result.issues));
```

### Transitioning Status

```javascript
const api = require('${CLAUDE_PLUGIN_ROOT}/skills/jira/scripts/api.js');

const transitions = await api.getTransitions("PROJ-123");
const transition = transitions.transitions.find(t =>
  t.name.toLowerCase() === "In Progress".toLowerCase()
);
await api.transitionIssue("PROJ-123", transition.id);
```

### Working with Sprints

```javascript
const api = require('${CLAUDE_PLUGIN_ROOT}/skills/jira/scripts/api.js');
const formatters = require('${CLAUDE_PLUGIN_ROOT}/skills/jira/scripts/formatters.js');

// List active sprints
const sprints = await api.getSprints(123, "active");
console.log(formatters.formatSprintList(sprints.values));

// Move issues to sprint
await api.moveIssuesToSprint(456, ["PROJ-1", "PROJ-2"]);
```

## Progressive Disclosure

For detailed JQL patterns, advanced query examples, and use case-specific queries, see `references/jql-patterns.md`.

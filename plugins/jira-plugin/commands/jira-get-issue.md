---
description: <issueKey> - Get detailed information about a Jira issue
---

# Get Jira Issue Details

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Extract the issue key from the user's request
4. Call `api.getIssue(issueKey)`
5. Format the response using `formatters.formatIssueDetail(issue)`
6. Display the formatted result

## Example Usage

### Basic Examples

```
/jira-get-issue PROJ-123
```

### Real-World Workflows

**Check Issue Before Working:**
```
/jira-get-issue PROJ-456
# Use case: Review full issue details before starting implementation
```

**Verify Bug Status:**
```
/jira-get-issue PROJ-789
# Use case: Check if a bug has been fixed and deployed
```

**Review Acceptance Criteria:**
```
/jira-get-issue PROJ-101
# Use case: Get full description and acceptance criteria before starting a story
```

**Check Assignment:**
```
/jira-get-issue PROJ-202
# Use case: See who is assigned to an issue and current status
```

**Get Issue URL:**
```
/jira-get-issue PROJ-305
# Use case: Get the Jira URL to share with team members
```

## Output

```
┌─────────────────────────────────────────────────────────────────┐
│ PROJ-123: Fix login bug - add password reset validation        │
├─────────────────────────────────────────────────────────────────┤
│ Status:        In Progress                                      │
│ Priority:      High                                             │
│ Assignee:      jane.doe@example.com                             │
│ Issue Type:    Bug                                              │
│ Created:       2025-01-10                                       │
│ Updated:       2025-01-15                                       │
├─────────────────────────────────────────────────────────────────┤
│ Description                                                        │
│                                                                    │
│ Users report being unable to login after completing password    │
│ reset flow. Error message: "Invalid credentials"                │
│                                                                    │
│ Steps to reproduce:                                              │
│ 1. Request password reset                                        │
│ 2. Click email link                                              │
│ 3. Set new password                                              │
│ 4. Attempt to login                                              │
├─────────────────────────────────────────────────────────────────┤
│ URL: https://your-domain.atlassian.net/browse/PROJ-123          │
└─────────────────────────────────────────────────────────────────┘
```

## Error Scenarios

**Issue Not Found:**
```
Error: Issue PROJ-999 does not exist or you don't have permission to view it
```

**No Permission:**
```
Error: You don't have permission to view this issue
```

## Notes

- Full issue details including summary, status, priority, assignee, description, and link to Jira
- Use this command when you need complete information about a single issue
- The URL provided can be opened in a browser to view the issue in Jira's web interface
- All fields you have permission to view will be displayed

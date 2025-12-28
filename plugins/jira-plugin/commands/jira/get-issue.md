---
description: <issueKey> - Get detailed information about a Jira issue
---

# Get Jira Issue Details

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `getIssue(issueKey)` function
- Use `scripts/formatters.js` for `formatIssueDetail(issue)` function
- Parse issue key from user input
- Handle not found and permission errors

## Example Usage

```
/jira-get-issue PROJ-123
```

### Use Cases

- **Before Working** - Review full details before starting implementation
- **Verify Bug Status** - Check if a bug has been fixed and deployed
- **Review Acceptance Criteria** - Get full description before starting a story
- **Check Assignment** - See who is assigned and current status
- **Get Issue URL** - Obtain the Jira URL to share with team

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
├─────────────────────────────────────────────────────────────────┤
│ URL: https://your-domain.atlassian.net/browse/PROJ-123          │
└─────────────────────────────────────────────────────────────────┘
```

## Error Handling

| Error | Handling |
|-------|----------|
| Issue not found | "Issue does not exist or you don't have permission" |
| No permission | "You don't have permission to view this issue" |

## Notes

- Displays all fields you have permission to view
- URL opens issue in Jira web interface

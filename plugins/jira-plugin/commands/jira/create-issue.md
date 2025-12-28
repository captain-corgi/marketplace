---
description: project=<key> summary="<text>" issuetype=<type> [priority=<level>] [assignee=<email>] [description="<text>"] - Create a Jira issue
---

# Create a Jira Issue

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `createIssue(fields)` function
- Parse key-value pairs: project, summary (required), issuetype (required)
- Handle optional fields: priority, assignee, description
- Construct fields object with proper nesting: `{project: {key}, summary, issuetype: {name}, ...}`
- Display success with issue key and Jira URL

## Example Usage

```
/jira-create-issue project=PROJ summary="Fix login bug" issuetype=Bug priority=High
/jira-create-issue project=WEB summary="As a user, I want dark mode" issuetype=Story assignee=jane@example.com
```

### Use Cases

- **Report Bug** - Create bug report with priority and description
- **Create Story** - Add user story with acceptance criteria
- **Track Task** - Create technical task for implementation work
- **Plan Spike** - Create research/investigation task
- **Quick Entry** - Fast bug tracking with minimal fields

## Output

```
✓ Issue Created
Key: PROJ-456
Summary: Fix login bug
URL: https://your-domain.atlassian.net/browse/PROJ-456
```

## Error Handling

| Error | Handling |
|-------|----------|
| Missing required | List required fields: project, summary, issuetype |
| Invalid project | "Project does not exist - use /jira-projects to list" |
| Invalid issue type | Show available types for project |
| No permission | "You don't have permission to create issues" |

## Common Issue Types

Bug, Story, Task, Epic, Sub-task, Spike (varies by project)

## Notes

- Use quotes for summary and description with spaces
- Priority names are case-insensitive
- Find project keys with `/jira-projects`

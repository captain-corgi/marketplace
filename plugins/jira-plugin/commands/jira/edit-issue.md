---
description: <issueKey> <field>=<value> [<field>=<value> ...] - Update a Jira issue
---

# Edit a Jira Issue

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `updateIssue(issueKey, fields)` function
- Parse issue key and field=value pairs
- Build fields object with only changed fields
- Display confirmation with changed fields

## Example Usage

```
/jira-edit-issue PROJ-123 summary="New summary" priority=High
/jira-edit-issue PROJ-123 assignee=john.doe@example.com
```

### Common Editable Fields

| Field | Example |
|-------|---------|
| summary | "Fix login bug" |
| description | "Detailed description" |
| priority | High, Medium, Low |
| assignee | email@example.com |

## Output

```
✓ Issue Updated
Key: PROJ-123
Fields Changed:
  - summary: "New summary"
  - priority: "High"
```

## Error Handling

| Error | Handling |
|-------|----------|
| Issue not found | "Issue does not exist" |
| Invalid field value | Show valid values for field |
| Read-only field | "Status cannot be edited - use /jira-transition" |
| No permission | "You don't have permission to edit" |

## Important Notes

- Only include fields being changed
- **Status requires /jira-transition** - cannot edit directly
- Priority names are case-insensitive
- Assignee format varies by Jira config

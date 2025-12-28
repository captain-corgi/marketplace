---
description: <issueKey> <field>=<value> [<field>=<value> ...] - Update a Jira issue
---

# Edit a Jira Issue

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Extract the issue key and fields to update from user input
3. Build the fields object with only the fields being updated
4. Call `api.updateIssue(issueKey, fields)`
5. Display confirmation with the issue key and updated fields

## Example Usage

### Basic Examples

```
/jira-edit-issue PROJ-123 summary="New summary" priority=High
/jira-edit-issue PROJ-123 assignee=john.doe@example.com
```

### Real-World Workflows

**Update Summary:**
```
/jira-edit-issue PROJ-123 summary="Fix login bug - add password reset validation"
```

**Change Priority:**
```
/jira-edit-issue PROJ-456 priority=Critical
# Use: Critical, High, Medium, Low, Trivial (depending on Jira config)
```

**Reassign Issue:**
```
/jira-edit-issue PROJ-789 assignee=jane.smith@example.com
# Or use assignee=username (depends on Jira configuration)
```

**Update Multiple Fields:**
```
/jira-edit-issue PROJ-101 summary="Add dark mode" priority=High assignee=dev@example.com
```

**Add Description:**
```
/jira-edit-issue PROJ-202 description="## Acceptance Criteria\n- Dark mode toggle in settings\n- Persists across sessions\n- Follows iOS design guidelines"
```

**Update with Detailed Description:**
```
/jira-edit-issue PROJ-305 description="Reproduce steps:\n1. Login to app\n2. Navigate to profile\n3. Click upload avatar\n4. Select large image (>5MB)\n\nExpected: Image uploads successfully\nActual: App crashes with OOM error"
```

**Lower Priority After Investigation:**
```
/jira-edit-issue PROJ-404 priority=Low description="After investigation, this only affects legacy browsers. Will fix in tech debt sprint."
```

## Output

```
✓ Issue Updated
Key: PROJ-123
Fields Changed:
  - summary: "New summary"
  - priority: "High"
```

## Error Scenarios

**Issue Not Found:**
```
Error: Issue PROJ-999 does not exist
```

**Invalid Field Value:**
```
Error: Priority "Urgent" is not valid. Valid values: Critical, High, Medium, Low, Trivial
```

**Read-Only Field:**
```
Error: Field 'status' cannot be edited directly. Use /jira-transition to change status
```

**Workflow Restriction:**
```
Error: Cannot edit assignee due to workflow security restrictions
```

**Missing Permission:**
```
Error: You don't have permission to edit this issue
```

## Common Editable Fields

| Field | Example Values | Notes |
|-------|---------------|-------|
| summary | "Fix login bug" | Issue title |
| description | "Detailed description" | Multi-line text |
| priority | High, Medium, Low | Case-insensitive |
| assignee | email@example.com | Depends on Jira config |
| components | "Backend", "Frontend" | Must exist in project |
| labels | "urgent", "bug" | Comma-separated for multiple |

## Important Notes

- Only include fields that are being changed
- Use the same field names as in create issue
- Some fields may not be editable due to workflow or screen configuration
- **Status cannot be edited directly** - use `/jira-transition` instead
- **Assignee** may require email or username depending on Jira configuration
- **Components** and **labels** vary by project configuration
- Changes are logged in the issue's activity history

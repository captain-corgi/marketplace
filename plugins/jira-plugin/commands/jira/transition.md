---
description: <issueKey> <statusName> - Transition a Jira issue to a new status
---

# Transition Jira Issue Status

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `getTransitions(issueKey)` and `transitionIssue()` functions
- Parse issue key and target status name (case-insensitive)
- First get available transitions, find matching transition ID
- Call `transitionIssue()` with the transition ID
- Handle workflow restrictions and required fields

## Example Usage

```
/jira-transition PROJ-123 "In Progress"
/jira-transition PROJ-123 Done
/jira-transition PROJ-123 "In Review"
```

### Use Cases

- **Start Work** - Move from "To Do" to "In Progress"
- **Submit Review** - Move to "In Review" after implementing
- **Mark Complete** - Move to "Done" after deployment
- **Send to QA** - Move to "Ready for QA"
- **Return to Backlog** - Move back to "To Do" if blocked

## Output

```
✓ Issue Transitioned
Key: PROJ-123
New Status: In Progress
```

## Common Workflow Transitions

| From | To | Purpose |
|------|-----|---------|
| To Do | In Progress | Starting work |
| In Progress | In Review | Ready for code review |
| In Review | Done | Approved and merged |
| In Progress | Done | Direct completion |
| Any | Closed | Resolved/cancelled |

## Error Handling

| Error | Handling |
|-------|----------|
| Invalid transition | Show available transitions |
| Already in status | Warning message |
| Workflow restriction | Explain reason (e.g., sub-tasks must complete) |
| Missing fields | List required fields for transition |
| No permission | "You don't have permission to transition" |

## Notes

- Status names are case-insensitive
- Available transitions depend on workflow configuration
- Cannot edit status directly - must use transition API

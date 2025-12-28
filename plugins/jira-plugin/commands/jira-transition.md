---
description: <issueKey> <statusName> - Transition a Jira issue to a new status
---

# Transition Jira Issue Status

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Extract issue key and target status from user input
3. First call `api.getTransitions(issueKey)` to get available transitions
4. Find the transition ID matching the target status name (case-insensitive)
5. Call `api.transitionIssue(issueKey, transitionId)`
6. Display confirmation with new status

## Example Usage

### Basic Examples

```
/jira-transition PROJ-123 "In Progress"
/jira-transition PROJ-123 Done
/jira-transition PROJ-123 "To Do"
```

### Real-World Workflows

**Start Working on Issue:**
```
/jira-transition PROJ-101 "In Progress"
# Use case: Move issue from "To Do" to "In Progress" when starting work
```

**Submit for Code Review:**
```
/jira-transition PROJ-202 "In Review"
# Use case: Move issue to review state after implementing changes
```

**Mark as Complete:**
```
/jira-transition PROJ-305 Done
# Use case: Mark issue as completed after deployment
```

**Send to QA:**
```
/jira-transition PROJ-404 "Ready for QA"
# Use case: Move issue to QA when ready for testing
```

**Return to To Do:**
```
/jira-transition PROJ-501 "To Do"
# Use case: Move issue back if blocked or deprioritized
```

**Report Bug Fixed:**
```
/jira-transition PROJ-601 "Ready for Testing"
# Use case: Notify QA that a bug fix is ready to verify
```

## Output

```
✓ Issue Transitioned
Key: PROJ-123
New Status: In Progress
```

## Error Scenarios

**Invalid Transition:**
```
Error: No transition found matching status "Invalid Status"

Available transitions for PROJ-123:
• In Progress
• In Review
• Resolve Issue
• To Do
```

**Workflow Restriction:**
```
Error: Cannot transition PROJ-123 to "Done"
Reason: All sub-tasks must be completed first
```

**Permission Denied:**
```
Error: You don't have permission to transition this issue
```

**Issue Already in Target Status:**
```
Warning: PROJ-123 is already in "In Progress" status
```

**Missing Required Fields:**
```
Error: Transition requires additional fields
Required: Resolution, Fix Version
```

## Common Workflow Transitions

| From | To | Use Case |
|------|-----|----------|
| To Do | In Progress | Starting work on an issue |
| In Progress | In Review | Ready for code review |
| In Review | Done | Approved and merged |
| In Progress | Done | Directly complete (no review needed) |
| In Progress | To Do | Blocked or deprioritized |
| Any | Closed | Issue resolved/cancelled |

## Notes

- Transition names are case-insensitive ("in progress" = "In Progress")
- Available transitions depend on your Jira workflow configuration
- Not all status changes may be valid transitions
- Some workflows require fields (resolution, fix version) for certain transitions
- Use `/jira-get-issue` to see current status before transitioning
- Transitions are logged in the issue's activity history
- Some workflows may have restrictions (e.g., can't close if sub-tasks are open)

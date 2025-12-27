# /jira-transition - Transition Jira Issue Status

Move an issue through its workflow to a new status.

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Extract issue key and target status from user input
3. First call `api.getTransitions(issueKey)` to get available transitions
4. Find the transition ID matching the target status name (case-insensitive)
5. Call `api.transitionIssue(issueKey, transitionId)`
6. Display confirmation with new status

## Example Usage

```
/jira-transition PROJ-123 "In Progress"
/jira-transition PROJ-123 Done
/jira-transition PROJ-123 "To Do"
```

## Error Handling

- If no matching transition found, list available transitions
- If workflow validation fails, show the error from Jira
- Transition names are case-insensitive but must match exactly

# /jira-move-to-sprint - Move Issues to a Sprint

Move one or more issues to a sprint.

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Extract parameters from user input:
   - `sprintId` (required): Target sprint ID
   - `issues` (required): Array of issue keys (comma-separated)
3. Parse the issue keys into an array
4. Call `api.moveIssuesToSprint(sprintId, issueKeys)`
5. Display confirmation with count of moved issues

## Example Usage

```
/jira-move-to-sprint sprintId=42 issues=PROJ-123,PROJ-456
/jira-move-to-sprint sprintId=42 issues="PROJ-123, PROJ-456, PROJ-789"
```

## Notes

- Issues can only be in one active sprint at a time
- Moving an issue from one sprint to another will remove it from the original
- The sprint must be in "active" or "future" state

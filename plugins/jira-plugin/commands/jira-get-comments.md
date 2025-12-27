# /jira-get-comments - Get Comments for a Jira Issue

Retrieve and display all comments for a Jira issue.

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Extract the issue key from user input
3. Call `api.getComments(issueKey)`
4. Format comments showing:
   - Author name
   - Created date
   - Comment body
   - Display in reverse chronological order (newest first)

## Example Usage

```
/jira-get-comments PROJ-123
```

## Output Format

```
Comments for PROJ-123

[2025-01-15] John Doe:
This is the latest comment

[2025-01-14] Jane Smith:
This is an earlier comment
```

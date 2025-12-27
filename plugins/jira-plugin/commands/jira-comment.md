# /jira-comment - Add a Comment to a Jira Issue

Add a comment to an existing Jira issue.

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Extract the issue key and comment text from user input
3. Call `api.addComment(issueKey, commentText)`
4. Display confirmation with the issue key and comment preview

## Example Usage

```
/jira-comment PROJ-123 "This fix has been tested and is ready for review"
/jira-comment PROJ-123 Verified the issue is resolved
```

## Notes

- Comments support plain text formatting
- The comment will be attributed to the authenticated user
- You can mention users using @[username] syntax if supported by your Jira instance

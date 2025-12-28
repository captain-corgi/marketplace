---
description: <issueKey> - Get all comments for a Jira issue
---

# Get Comments for a Jira Issue

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `getComments(issueKey)` function
- Parse issue key from user input
- Format comments with author, timestamp, and body
- Display in reverse chronological order (newest first)

## Example Usage

```
/jira-get-comments PROJ-123
```

### Use Cases

- **Review Bug History** - Understand what has been tried
- **Check Review Feedback** - See all review comments
- **Monitor Progress** - Check latest updates
- **Standup Prep** - Get context for standup
- **Investigate Blockers** - Understand dependencies

## Output

```
Comments for PROJ-123 (3 comments)

[2025-01-15 16:45] Jane Smith:
Tested and confirmed working. The fix resolves the issue. Ready for QA.

[2025-01-15 15:10] John Doe:
Thanks for investigating. I've added a 15-minute buffer to the token expiration.

[2025-01-15 14:32] Jane Smith:
I've reproduced this issue on Chrome. The error occurs when the password reset token expires.
```

## Error Handling

| Error | Handling |
|-------|----------|
| Issue not found | "Issue does not exist or no permission" |
| No comments | "No comments found for issue" |

## Notes

- Comments shown newest first
- Use `/jira-comment` to add new comment

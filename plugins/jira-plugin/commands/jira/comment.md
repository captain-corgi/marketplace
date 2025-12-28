---
description: <issueKey> <comment text> - Add a comment to an existing Jira issue
---

# Add a Comment to a Jira Issue

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `addComment(issueKey, commentText)` function
- Parse issue key and comment text (supports quotes for multi-word)
- Display confirmation with issue key and comment preview

## Example Usage

```
/jira-comment PROJ-123 "This fix has been tested and is ready for review"
/jira-comment PROJ-123 Verified the issue is resolved
/jira-comment PROJ-123 "@john.smith Can you review this?"
```

### Use Cases

- **Code Review** - Leave review feedback
- **QA Testing** - Report test results
- **Bug Verification** - Confirm fix works
- **Blocker Notification** - Report blocking issues
- **Deployment Notice** - Confirm deployment

## Output

```
✓ Comment added to PROJ-123
Preview: "This fix has been tested and is ready for review"
```

## Error Handling

| Error | Handling |
|-------|----------|
| Issue not found | "Issue does not exist or no permission" |
| No permission | "You don't have permission to comment" |

## Notes

- Comments support plain text (auto-converted to ADF)
- Use quotes for multi-word comments
- You can mention users with @[username] syntax

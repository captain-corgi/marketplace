---
description: <issueKey> <comment text> - Add a comment to an existing Jira issue
---

# Add a Comment to a Jira Issue

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Extract the issue key and comment text from user input
3. Call `api.addComment(issueKey, commentText)`
4. Display confirmation with the issue key and comment preview

## Example Usage

### Basic Examples

```
/jira-comment PROJ-123 "This fix has been tested and is ready for review"
/jira-comment PROJ-123 Verified the issue is resolved
```

### Real-World Workflows

**Code Review:**
```
/jira-comment PROJ-456 "Reviewed PR #123. LGTM with minor suggestions addressed."
```

**QA Testing:**
```
/jira-comment PROJ-789 "Tested on Chrome, Firefox, and Safari. All test cases pass."
```

**Bug Verification:**
```
/jira-comment PROJ-101 "Verified in staging environment. The fix works correctly."
```

**Blocker Notification:**
```
/jira-comment PROJ-250 "Blocked by PROJ-245. Need database schema changes first."
```

**Deployment Notice:**
```
/jira-comment PROJ-500 "Deployed to production. Release v2.3.1 is now live."
```

### With User Mentions

```
/jira-comment PROJ-123 "@john.smith Can you review this when you have a chance?"
```

## Output

```
✓ Comment added to PROJ-123
Preview: "This fix has been tested and is ready for review"
```

## Error Scenarios

**Issue Not Found:**
```
Error: Issue PROJ-999 does not exist or you don't have permission to view it.
```

**Missing Permission:**
```
Error: You don't have permission to comment on this issue.
```

## Notes

- Comments support plain text formatting
- The comment will be attributed to the authenticated user
- You can mention users using @[username] syntax if supported by your Jira instance
- Comments are visible to all users with access to the issue
- Use quotes for multi-word comments or comments with special characters

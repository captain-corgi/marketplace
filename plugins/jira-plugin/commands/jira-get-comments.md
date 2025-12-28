---
description: <issueKey> - Get all comments for a Jira issue
---

# Get Comments for a Jira Issue

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

### Basic Examples

```
/jira-get-comments PROJ-123
```

### Real-World Workflows

**Review Bug History:**
```
/jira-get-comments PROJ-456
# Use case: Understand what has been tried and what the current status is before investigating
```

**Check Code Review Feedback:**
```
/jira-get-comments PROJ-789
# Use case: Review all review comments and responses before merging
```

**Monitor Progress:**
```
/jira-get-comments PROJ-101
# Use case: Check latest updates on an issue you're tracking
```

**Prepare for Standup:**
```
/jira-get-comments PROJ-202
# Use case: Get context on what happened yesterday to share in standup
```

**Investigate Blocked Issue:**
```
/jira-get-comments PROJ-305
# Use case: Understand why an issue is blocked and what dependencies exist
```

## Output Format

```
Comments for PROJ-123 (5 comments)

[2025-01-15 14:32] Jane Smith:
I've reproduced this issue on Chrome. The error occurs when the password reset token expires.

[2025-01-15 15:10] John Doe:
Thanks for investigating. I've added a 15-minute buffer to the token expiration. Can you test again?

[2025-01-15 16:45] Jane Smith:
Tested and confirmed working. The fix resolves the issue. Ready for QA.

[2025-01-16 09:20] QA Team:
Verified in staging. All test cases pass. Approved for production.

[2025-01-16 10:00] DevOps:
Deployed to production. Ticket can be closed.
```

## Error Scenarios

**Issue Not Found:**
```
Error: Issue PROJ-999 does not exist or you don't have permission to view it
```

**No Comments:**
```
No comments found for PROJ-123
```

## Notes

- Comments are displayed in reverse chronological order (newest first)
- Timestamps show when the comment was created
- Author names are displayed as configured in Jira
- All comments you have permission to view will be shown
- Use `/jira-comment` to add a new comment to an issue
- Comments include the full text, including any @mentions or formatting

---
description: <owner/repo> <number> - Get GitHub issue details
---

# Get Issue Details

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `getIssue(repo, number)` function
- Use `scripts/formatters.js` for `formatIssueDetail()` function
- Parse repository in "owner/repo" format and issue number (both required)
- Display full issue details including body, comments, and metadata

## Example Usage

```
/gh-get-issue microsoft/vscode 12345
/gh-get-issue facebook/react 1
/gh-get-issue owner/repo 100
```

### Use Cases

- **Review Issue** - Read full issue description and discussion
- **Context** - Understand the history of an issue
- **Triage** - Review before assigning or labeling
- **Reference** - Get details for documentation

## Output

```
## Issue #1234: Bug: Login fails on Safari

**State**: 🟢 Open
**Author**: @reporter
**Assignees**: @developer1, @developer2
**Labels**: `bug` `browser` `high-priority`
**Milestone**: v2.0 Release

**Created**: Dec 15, 2024
**Updated**: Dec 28, 2024

---

When trying to login using Safari 17.0, the authentication
fails with a "Network Error" message.

**Steps to Reproduce:**
1. Open Safari 17.0
2. Navigate to login page
3. Enter valid credentials
4. Click "Login"

**Expected:** User is logged in
**Actual:** "Network Error" message appears

**URL**: https://github.com/owner/repo/issues/1234

### Comments (3)

**@developer1** (2d ago):
I can reproduce this. Looking into it...

**@developer2** (1d ago):
This is related to the new CORS policy...
```

## Error Handling

| Error | Handling |
|-------|----------|
| Invalid number | "Issue number must be a positive integer" |
| Not found | "Issue #X not found in this repository" |
| No access | "You don't have access to this issue" |

## Notes

- Shows up to 5 most recent comments
- Full comment history available on GitHub
- Related PRs may be linked in the issue
- Closed issues show the closure date and reason

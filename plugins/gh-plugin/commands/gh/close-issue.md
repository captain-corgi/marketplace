---
description: <owner/repo> <number> [--reason=<reason>] - Close a GitHub issue
---

# Close a GitHub Issue

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `closeIssue(repo, number, reason)` function
- Use `scripts/formatters.js` for `formatIssueDetail()` function
- Parse repository and issue number (required)
- Handle optional reason: completed (default) or not_planned
- Display updated issue showing closed state

## Example Usage

```
/gh-close-issue owner/repo 123
/gh-close-issue owner/repo 456 --reason=completed
/gh-close-issue owner/repo 789 --reason=not_planned
```

### Options

| Option | Description |
|--------|-------------|
| `--reason=completed` | Issue was resolved (default) |
| `--reason=not_planned` | Issue won't be addressed |

### Use Cases

- **Resolved** - Close fixed bugs or completed features
- **Won't Fix** - Close issues that won't be addressed
- **Duplicate** - Close duplicates (add comment with original)
- **Invalid** - Close invalid or out-of-scope issues

## Output

```
✓ Issue Closed

## Issue #123: Bug: Login fails

**State**: 🔴 Closed
**Author**: @reporter
**Assignees**: @developer
**Labels**: `bug` `fixed`

**Created**: Dec 15, 2024
**Closed**: Dec 28, 2024

---

The bug description...

**URL**: https://github.com/owner/repo/issues/123
```

## Error Handling

| Error | Handling |
|-------|----------|
| Not found | "Issue #X not found" |
| Already closed | "Issue #X is already closed" |
| No permission | "You don't have permission to close this issue" |

## Best Practices

1. **Add Comment** - Explain why you're closing (especially for not_planned)
2. **Link PR** - Reference the PR that fixes the issue
3. **Label** - Add appropriate label (fixed, wontfix, duplicate, etc.)
4. **Check Duplicates** - Search before closing as duplicate

## Reopening Issues

Use the API directly or GitHub web interface to reopen a closed issue:
```javascript
await api.reopenIssue('owner/repo', 123);
```

## Notes

- Closing an issue doesn't delete it
- Closed issues can be reopened
- Contributors can still comment on closed issues
- Closed issues appear in search with `is:closed`

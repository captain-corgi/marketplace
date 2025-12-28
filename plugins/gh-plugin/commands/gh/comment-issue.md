---
description: <owner/repo> <number> "<comment>" - Add a comment to a GitHub issue
---

# Add Comment to Issue

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `addIssueComment(repo, number, body)` function
- Use `scripts/formatters.js` for `formatIssueDetail()` function
- Parse repository, issue number, and comment body (all required)
- Display updated issue with new comment

## Example Usage

```
/gh-comment-issue owner/repo 123 "Thanks for reporting! We'll look into this."
/gh-comment-issue owner/repo 456 "Fixed in PR #789"
/gh-comment-issue owner/repo 100 "Can you provide more details about your environment?"
```

### Use Cases

- **Acknowledge** - Thank reporters and acknowledge issues
- **Request Info** - Ask for additional details
- **Update Status** - Provide progress updates
- **Link Resources** - Reference PRs, commits, or related issues
- **Close Explanation** - Explain before closing an issue

## Output

```
✓ Comment Added

## Issue #123: Bug: Login fails

**State**: 🟢 Open
**Author**: @reporter

---

Original issue description...

**URL**: https://github.com/owner/repo/issues/123

### Comments (4)

**@reporter** (2d ago):
Original comment...

**@you** (just now):
Thanks for reporting! We'll look into this.
```

## Error Handling

| Error | Handling |
|-------|----------|
| Empty comment | "Comment body cannot be empty" |
| Not found | "Issue #X not found" |
| No permission | "You don't have permission to comment" |

## Comment Formatting

GitHub comments support Markdown:

```markdown
**Bold text**
*Italic text*
`inline code`
```code block```

- Bullet list
1. Numbered list

> Quote

[Link text](url)

@username - mention user
#123 - reference issue
```

## Special References

| Reference | Description |
|-----------|-------------|
| `#123` | Link to issue #123 |
| `@username` | Mention a user |
| `commit-sha` | Link to commit |
| `owner/repo#123` | Link to issue in another repo |

## Notes

- Comments support full GitHub Markdown
- Mentions send notifications to users
- Comments cannot be edited via CLI (use GitHub web)
- Subscribe to issues to receive comment notifications

---
description: <owner/repo> <number> <event> [body="<comment>"] - Add a review to a GitHub pull request
---

# Review a GitHub Pull Request

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `addPRReview(repo, number, options)` function
- Use `scripts/formatters.js` for `formatPRDetail()` function
- Parse repository, PR number, and event type (required)
- Handle body for review comment
- Display updated PR with review status

## Example Usage

```
/gh-review-pr owner/repo 456 approve
/gh-review-pr owner/repo 456 approve body="LGTM! Great work!"
/gh-review-pr owner/repo 456 request-changes body="Please add tests for the new function"
/gh-review-pr owner/repo 456 comment body="Have you considered using a different approach?"
```

### Review Events

| Event | Description | Effect |
|-------|-------------|--------|
| `approve` | Approve the changes | ✅ Adds approval |
| `request-changes` | Request modifications | 🔄 Blocks merge (if required) |
| `comment` | Leave feedback only | 💬 No approval/rejection |

### Options

| Option | Description | Required |
|--------|-------------|----------|
| `event` | approve, request-changes, comment | Yes |
| `body` | Review comment | Optional (required for request-changes) |

### Use Cases

- **Approve** - Sign off on changes
- **Request Changes** - Ask for modifications
- **Comment** - Provide feedback without approval
- **Code Review** - Part of review workflow

## Output

```
✓ Review Submitted

## PR #456: Add new feature

**State**: 🟢 Open
**Review Status**: ✅ Approved

**Requested Reviewers**: @reviewer2
**Reviews Completed**:
- ✅ @you - APPROVED

---

Your review comment here...

**URL**: https://github.com/owner/repo/pull/456
```

## Error Handling

| Error | Handling |
|-------|----------|
| Not found | "PR #X not found" |
| Invalid event | "Event must be approve, request-changes, or comment" |
| Missing body | "Body required for request-changes" |
| Already reviewed | "You've already submitted a review (dismiss first)" |
| Self-review | "You cannot review your own PR" |

## Review Best Practices

### Approve (✅)
```
/gh-review-pr owner/repo 456 approve body="LGTM! Code is clean and well-tested."
```

### Request Changes (🔄)
```
/gh-review-pr owner/repo 456 request-changes body="Please address:
1. Add unit tests for the new function
2. Update the README with new usage examples
3. Fix the typo on line 42"
```

### Comment (💬)
```
/gh-review-pr owner/repo 456 comment body="Nice approach! Consider adding error handling for edge cases."
```

## Review Workflow

1. Check out the PR: `gh pr checkout 456`
2. Review code changes
3. Test locally if needed
4. Submit review with appropriate event
5. Follow up on requested changes

## Notes

- Approvals may be required before merging (branch protection)
- Request-changes blocks merge until resolved
- Reviews can be dismissed by PR author or admin
- Use line comments on GitHub web for specific feedback

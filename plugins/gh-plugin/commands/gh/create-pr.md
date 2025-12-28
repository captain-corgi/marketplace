---
description: <owner/repo> title="<text>" [body="<text>"] [--head=<branch>] [--base=<branch>] [--draft] [--reviewers=<list>] - Create a GitHub pull request
---

# Create a GitHub Pull Request

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `createPR(repo, options)` function
- Use `scripts/formatters.js` for `formatPRDetail()` function
- Parse repository (required), title (required)
- Handle options: body, head, base, draft, labels, assignees, reviewers
- Display created PR details

## Example Usage

```
/gh-create-pr owner/repo title="Add new feature" --head=feature-branch
/gh-create-pr owner/repo title="Fix bug" body="Fixes #123" --base=main --head=fix/bug
/gh-create-pr owner/repo title="WIP: New feature" --draft --reviewers=reviewer1,reviewer2
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `title` | PR title (required) | - |
| `body` | PR description | None |
| `--head` | Source branch | Current branch |
| `--base` | Target branch | Default branch |
| `--draft` | Create as draft | false |
| `--labels` | Comma-separated labels | None |
| `--assignees` | Comma-separated users | None |
| `--reviewers` | Comma-separated reviewers | None |

### Use Cases

- **Feature PR** - Submit new feature for review
- **Bug Fix** - Submit fix with issue reference
- **Draft PR** - Start PR early for feedback
- **Cross-Fork PR** - PR from fork to upstream

## Output

```
✓ Pull Request Created

## PR #457: Add new feature

**State**: 🟢 Open
**Author**: @you
**Labels**: `enhancement`

**Branches**: `feature-branch` → `main`
**Review Status**: ⏳ Review Required
**Requested Reviewers**: @reviewer1, @reviewer2

**Changes**:
- 📝 5 files changed
- ➕ 150 additions
- ➖ 20 deletions
- 🔨 3 commits

---

PR description here...

**URL**: https://github.com/owner/repo/pull/457
```

## Error Handling

| Error | Handling |
|-------|----------|
| No title | "Title is required" |
| Branch not found | "Branch 'X' not found" |
| No changes | "No commits between base and head" |
| PR exists | "A PR already exists for this branch" |
| No permission | "You don't have permission to create PRs" |

## PR Description Template

Good PR descriptions include:

```markdown
## Summary
Brief description of changes

## Changes
- Change 1
- Change 2

## Related Issues
Fixes #123
Related to #456

## Testing
How was this tested?

## Screenshots (if applicable)
```

## Linking Issues

Use keywords to auto-close issues when PR merges:
- `Fixes #123`
- `Closes #123`
- `Resolves #123`

## Notes

- Head branch must have commits not in base
- Draft PRs don't trigger review requests initially
- Reviewers must have repository access
- Use `/gh-merge-pr` after approval

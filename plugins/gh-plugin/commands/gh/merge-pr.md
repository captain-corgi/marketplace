---
description: <owner/repo> <number> [--method=<type>] [--delete-branch] - Merge a GitHub pull request
---

# Merge a GitHub Pull Request

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `mergePR(repo, number, options)` function
- Use `scripts/formatters.js` for `formatPRDetail()` function
- Parse repository and PR number (required)
- Handle options: method (merge/squash/rebase), deleteBranch, subject, body
- Display merged PR details

## Example Usage

```
/gh-merge-pr owner/repo 456
/gh-merge-pr owner/repo 456 --method=squash
/gh-merge-pr owner/repo 456 --method=rebase --delete-branch
/gh-merge-pr owner/repo 456 --method=squash --delete-branch
```

### Options

| Option | Values | Default |
|--------|--------|---------|
| `--method` | merge, squash, rebase | merge |
| `--delete-branch` | Flag to delete head branch | false |
| `--subject` | Custom commit subject | Auto-generated |
| `--body` | Custom commit body | Auto-generated |

### Merge Methods

| Method | Description | Best For |
|--------|-------------|----------|
| `merge` | Creates merge commit, preserves all commits | Feature branches with clean history |
| `squash` | Squashes all commits into one | PRs with many small commits |
| `rebase` | Rebases commits onto base, no merge commit | Clean linear history |

### Use Cases

- **Standard Merge** - Preserve full commit history
- **Squash Merge** - Combine messy commits into one
- **Rebase Merge** - Maintain linear history
- **Clean Up** - Delete branch after merge

## Output

```
✓ Pull Request Merged

## PR #456: Add new feature

**State**: 🟣 Merged
**Author**: @developer
**Merged By**: @you

**Branches**: `feature-branch` → `main`
**Merge Method**: squash

**Merged**: Dec 28, 2024

---

All changes have been merged into main.
Branch 'feature-branch' was deleted.

**URL**: https://github.com/owner/repo/pull/456
```

## Error Handling

| Error | Handling |
|-------|----------|
| Not found | "PR #X not found" |
| Not mergeable | "PR cannot be merged - resolve conflicts first" |
| Checks failing | "Required checks have not passed" |
| Review required | "PR requires approval before merging" |
| No permission | "You don't have permission to merge" |
| Already merged | "PR #X is already merged" |

## Pre-Merge Checklist

Before merging, ensure:
1. ✅ All CI checks pass
2. ✅ Required reviews approved
3. ✅ No merge conflicts
4. ✅ Documentation updated (if needed)
5. ✅ Tests added/updated

## Notes

- Some repos restrict merge methods via branch protection
- Squash merge combines all commits into one
- Rebase rewrites commit history (no merge commit)
- Delete branch option cleans up remote branch
- Local branch must be deleted separately

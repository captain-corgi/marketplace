---
description: <owner/repo> <name> - Delete a GitHub branch
---

# Delete a Branch

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `deleteBranch(repo, name)` function
- Parse repository and branch name (both required)
- Delete the remote branch on GitHub
- Display confirmation message

## Example Usage

```
/gh-delete-branch owner/repo feature/completed-feature
/gh-delete-branch owner/repo fix/merged-bugfix
/gh-delete-branch owner/repo old-branch
```

### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `owner/repo` | Repository | Yes |
| `name` | Branch name to delete | Yes |

### Use Cases

- **Clean Up** - Remove merged feature branches
- **Stale Branches** - Delete abandoned branches
- **Post-Merge** - Clean up after PR merge
- **Repository Hygiene** - Keep branch list manageable

## Output

```
✓ Branch Deleted

**Branch**: feature/completed-feature
**Repository**: owner/repo

The branch has been deleted from GitHub.
Delete locally: git branch -d feature/completed-feature
```

## Error Handling

| Error | Handling |
|-------|----------|
| Branch not found | "Branch 'X' not found" |
| Protected branch | "Cannot delete protected branch 'X'" |
| Default branch | "Cannot delete the default branch" |
| No permission | "You don't have permission to delete branches" |
| Open PRs | "Branch has open pull requests" |

## Safety Checks

Before deleting, verify:
1. ✅ Branch has been merged (or changes aren't needed)
2. ✅ No open pull requests from this branch
3. ✅ Branch is not protected
4. ✅ Branch is not the default branch

## Finding Merged Branches

To find merged branches to clean up:

```bash
# Via gh CLI
gh api repos/owner/repo/branches --jq '.[].name'

# Via git locally
git branch --merged main
```

## After Deleting

Delete the local branch too:

```bash
# If merged
git branch -d feature/completed-feature

# Force delete (unmerged)
git branch -D feature/completed-feature

# Clean up remote tracking
git fetch --prune
```

## Recovering Deleted Branches

If accidentally deleted, you may be able to recover:

1. Find the commit SHA from GitHub activity or reflog
2. Create branch from that SHA:
   ```
   /gh-create-branch owner/repo recovered-branch <sha>
   ```

⚠️ Recovery is time-limited - act quickly!

## Notes

- Only deletes remote branch on GitHub
- Local branch must be deleted separately
- Protected branches cannot be deleted
- Default branch cannot be deleted
- Consider archiving repo instead of deleting main branch

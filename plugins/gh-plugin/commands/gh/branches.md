---
description: <owner/repo> - List GitHub repository branches
---

# List Repository Branches

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `listBranches(repo)` function
- Use `scripts/formatters.js` for `formatBranchList()` function
- Parse repository in "owner/repo" format (required)
- Display formatted table with branch name, protection status, and last commit

## Example Usage

```
/gh-branches microsoft/vscode
/gh-branches owner/repo
```

### Use Cases

- **Overview** - See all branches in a repository
- **Protected** - Identify protected branches
- **Clean Up** - Find stale branches to delete
- **Branch Check** - Verify branch exists

## Output

```
## Branches in owner/repo

| Branch | Protected | Last Commit |
|--------|-----------|-------------|
| main | 🔒 Yes | a1b2c3d |
| develop | 🔒 Yes | e4f5g6h |
| feature/dark-mode | No | i7j8k9l |
| fix/login-bug | No | m0n1o2p |
| release/v1.0 | 🔒 Yes | q3r4s5t |
```

## Error Handling

| Error | Handling |
|-------|----------|
| Repo not found | "Repository not found - check the name" |
| No access | "You don't have access to this repository" |
| No branches | "No branches found" |

## Branch Protection

Protected branches (🔒) have rules such as:
- Require pull request reviews
- Require status checks to pass
- Require signed commits
- Restrict who can push
- Prevent force pushes

## Notes

- Default branch is typically `main` or `master`
- Protected branches cannot be force-pushed or deleted
- Use `/gh-create-branch` to create new branches
- Use `/gh-delete-branch` to remove merged branches

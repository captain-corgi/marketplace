---
description: <owner/repo> <number> - Get GitHub pull request details
---

# Get Pull Request Details

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `getPR(repo, number)` function
- Use `scripts/formatters.js` for `formatPRDetail()` function
- Parse repository in "owner/repo" format and PR number (both required)
- Display full PR details including changes, reviews, and merge status

## Example Usage

```
/gh-get-pr microsoft/vscode 12345
/gh-get-pr facebook/react 1000
/gh-get-pr owner/repo 456
```

### Use Cases

- **Review Details** - See full PR description and changes
- **Merge Check** - Check if PR can be merged
- **Review Status** - See approval/change request status
- **Change Summary** - View files changed, additions, deletions

## Output

```
## PR #456: Add dark mode support

**State**: 🟢 Open
**Author**: @developer
**Assignees**: @reviewer1
**Labels**: `enhancement` `ui`

**Branches**: `feature/dark-mode` → `main`
**Merge Status**: ✅ Can be merged
**Review Status**: ⏳ Review Required
**Requested Reviewers**: @reviewer1, @reviewer2

**Changes**:
- 📝 15 files changed
- ➕ 450 additions
- ➖ 120 deletions
- 🔨 8 commits

**Created**: Dec 20, 2024
**Updated**: Dec 28, 2024

---

This PR implements dark mode support across the application.

## Changes
- Added theme provider
- Updated all components with theme-aware styles
- Added toggle in settings

## Testing
- Manual testing on Chrome, Firefox, Safari
- Unit tests for theme provider

**URL**: https://github.com/owner/repo/pull/456

### Reviews (2)

✅ **@reviewer1** - APPROVED
💬 **@reviewer2** - COMMENTED
```

## Error Handling

| Error | Handling |
|-------|----------|
| Invalid number | "PR number must be a positive integer" |
| Not found | "PR #X not found in this repository" |
| No access | "You don't have access to this pull request" |

## Merge Statuses

| Status | Meaning |
|--------|---------|
| ✅ Can be merged | No conflicts, all checks passed |
| ❌ Has conflicts | Merge conflicts must be resolved |
| ⏳ Checks pending | CI/CD checks still running |
| 🔒 Protected | Branch rules require approvals |

## Notes

- Shows full PR description and change summary
- Review status helps understand approval progress
- Merge status indicates if PR can be merged
- Check CI status before merging

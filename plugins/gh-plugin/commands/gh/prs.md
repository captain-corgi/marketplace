---
description: <owner/repo> [--state=<state>] [--base=<branch>] [--author=<user>] [--limit=<n>] - List GitHub pull requests
---

# List GitHub Pull Requests

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `listPRs(repo, options)` function
- Use `scripts/formatters.js` for `formatPRList()` function
- Parse repository in "owner/repo" format (required)
- Handle filters: state (open/closed/merged/all), base, head, author, limit
- Display formatted table with PR number, title, state, author, branches

## Example Usage

```
/gh-prs microsoft/vscode
/gh-prs facebook/react --state=open
/gh-prs owner/repo --base=main --author=developer
/gh-prs owner/repo --state=merged --limit=50
```

### Options

| Option | Values | Default |
|--------|--------|---------|
| `--state` | open, closed, merged, all | open |
| `--base` | Branch name | Any |
| `--head` | Branch name | Any |
| `--author` | GitHub username | Any |
| `--limit` | Number | 30 |

### Use Cases

- **Review Queue** - See PRs awaiting review
- **My PRs** - Find your pull requests
- **Release PRs** - PRs targeting a specific branch
- **Merge History** - View merged PRs

## Output

```
Found 12 open pull requests

| # | Title | State | Author | Base ← Head | Updated |
|---|-------|-------|--------|-------------|---------|
| #456 | Add dark mode support | 🟢 Open | @developer | main ← feature/dark | 2h ago |
| #455 | Fix login bug | 📝 Draft | @contributor | main ← fix/login | 5h ago |
| #454 | Update dependencies | 🟢 Open | @dependabot | main ← deps/update | 1d ago |
```

## State Icons

| Icon | State |
|------|-------|
| 🟢 | Open |
| 📝 | Draft |
| 🟣 | Merged |
| 🔴 | Closed |

## Error Handling

| Error | Handling |
|-------|----------|
| Repo not found | "Repository not found - check the name" |
| No access | "You don't have access to this repository" |
| Invalid state | "State must be open, closed, merged, or all" |

## Notes

- Draft PRs show 📝 icon
- PRs are sorted by most recently updated
- Use `/gh-get-pr` for detailed PR information
- Use `/gh-search-prs` for cross-repository search

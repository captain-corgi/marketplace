---
description: <owner/repo> [--state=<state>] [--assignee=<user>] [--label=<name>] [--limit=<n>] - List GitHub issues
---

# List GitHub Issues

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `listIssues(repo, options)` function
- Use `scripts/formatters.js` for `formatIssueList()` function
- Parse repository in "owner/repo" format (required)
- Handle filters: state (open/closed/all), assignee, author, label, limit
- Display formatted table with issue number, title, state, author, labels

## Example Usage

```
/gh-issues microsoft/vscode
/gh-issues facebook/react --state=open
/gh-issues owner/repo --assignee=username --label=bug
/gh-issues owner/repo --state=all --limit=50
```

### Options

| Option | Values | Default |
|--------|--------|---------|
| `--state` | open, closed, all | open |
| `--assignee` | GitHub username | Any |
| `--author` | GitHub username | Any |
| `--label` | Label name | Any |
| `--limit` | Number | 30 |

### Use Cases

- **Triage** - Review open issues for a project
- **My Issues** - Find issues assigned to you
- **Bug Hunt** - List issues with specific labels
- **History** - View closed issues

## Output

```
Found 47 open issues

| # | Title | State | Author | Labels | Updated |
|---|-------|-------|--------|--------|---------|
| #1234 | Bug: Login fails on Safari | 🟢 Open | @reporter | bug, browser | 2h ago |
| #1233 | Feature: Dark mode support | 🟢 Open | @user | enhancement | 5h ago |
| #1230 | Docs: Update README | 🟢 Open | @contributor | documentation | 1d ago |
```

## Error Handling

| Error | Handling |
|-------|----------|
| Repo not found | "Repository not found - check the name" |
| No access | "You don't have access to this repository" |
| Invalid label | "Label not found in this repository" |

## Notes

- Issues are sorted by most recently updated by default
- Use `/gh-search-issues` for cross-repository search
- PRs are not included (use `/gh-prs` for pull requests)
- Private repo issues require appropriate access

---
description: <owner/repo> title="<text>" [body="<text>"] [--labels=<list>] [--assignees=<list>] - Create a GitHub issue
---

# Create a GitHub Issue

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `createIssue(repo, title, options)` function
- Use `scripts/formatters.js` for `formatIssueDetail()` function
- Parse repository and title (required)
- Handle options: body, labels (comma-separated), assignees (comma-separated), milestone
- Display created issue details

## Example Usage

```
/gh-create-issue owner/repo title="Bug: Login fails"
/gh-create-issue owner/repo title="Feature request" body="Add dark mode support"
/gh-create-issue owner/repo title="Fix typo" --labels=bug,documentation --assignees=developer
```

### Options

| Option | Description | Example |
|--------|-------------|---------|
| `title` | Issue title (required) | `title="Bug report"` |
| `body` | Issue description | `body="Detailed description..."` |
| `--labels` | Comma-separated labels | `--labels=bug,urgent` |
| `--assignees` | Comma-separated users | `--assignees=dev1,dev2` |
| `--milestone` | Milestone name or number | `--milestone="v1.0"` |

### Use Cases

- **Bug Report** - Report a bug with details
- **Feature Request** - Suggest new functionality
- **Task Tracking** - Create tasks for team
- **Documentation** - Track documentation needs

## Output

```
✓ Issue Created

## Issue #456: Bug: Login fails

**State**: 🟢 Open
**Author**: @you
**Assignees**: @developer
**Labels**: `bug` `high-priority`

**Created**: Dec 28, 2024

---

When clicking the login button, nothing happens.

**URL**: https://github.com/owner/repo/issues/456
```

## Error Handling

| Error | Handling |
|-------|----------|
| No title | "Title is required" |
| Invalid label | "Label 'X' not found - create it first or check spelling" |
| Invalid assignee | "User 'X' not found or doesn't have access" |
| No permission | "You don't have permission to create issues" |

## Tips for Good Issues

1. **Clear Title** - Summarize the issue concisely
2. **Reproduction Steps** - For bugs, include steps to reproduce
3. **Expected vs Actual** - Describe expected and actual behavior
4. **Environment** - Include version, OS, browser if relevant
5. **Screenshots** - Add screenshots for visual issues

## Notes

- Use quotes for title and body with spaces
- Labels must exist in the repository
- Assignees must have repository access
- Use `/gh-edit-issue` to modify after creation

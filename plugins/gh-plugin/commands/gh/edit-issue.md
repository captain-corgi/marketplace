---
description: <owner/repo> <number> [title="<text>"] [body="<text>"] [--add-labels=<list>] [--remove-labels=<list>] [--add-assignees=<list>] [--remove-assignees=<list>] - Edit a GitHub issue
---

# Edit a GitHub Issue

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `updateIssue(repo, number, fields)` function
- Use `scripts/formatters.js` for `formatIssueDetail()` function
- Parse repository and issue number (required)
- Handle fields: title, body, addLabels, removeLabels, addAssignees, removeAssignees
- Display updated issue details

## Example Usage

```
/gh-edit-issue owner/repo 123 title="Updated title"
/gh-edit-issue owner/repo 123 --add-labels=bug,urgent
/gh-edit-issue owner/repo 123 --remove-labels=wontfix --add-assignees=developer
/gh-edit-issue owner/repo 123 body="Updated description with more details"
```

### Options

| Option | Description | Example |
|--------|-------------|---------|
| `title` | New title | `title="New title"` |
| `body` | New body/description | `body="Updated text"` |
| `--add-labels` | Labels to add | `--add-labels=bug,urgent` |
| `--remove-labels` | Labels to remove | `--remove-labels=wontfix` |
| `--add-assignees` | Assignees to add | `--add-assignees=user1` |
| `--remove-assignees` | Assignees to remove | `--remove-assignees=user2` |

### Use Cases

- **Update Status** - Add/remove labels to reflect progress
- **Reassign** - Change who's working on the issue
- **Clarify** - Update title or description
- **Triage** - Add priority labels during review

## Output

```
✓ Issue Updated

## Issue #123: Updated title

**State**: 🟢 Open
**Author**: @original-author
**Assignees**: @developer
**Labels**: `bug` `urgent`

**Updated**: Dec 28, 2024

---

Updated description with more details

**URL**: https://github.com/owner/repo/issues/123
```

## Error Handling

| Error | Handling |
|-------|----------|
| Not found | "Issue #X not found" |
| Invalid label | "Label 'X' not found in this repository" |
| Invalid assignee | "User 'X' not found" |
| No permission | "You don't have permission to edit this issue" |

## Notes

- Only specify fields you want to change
- Adding a label that already exists has no effect
- Removing a label that doesn't exist has no effect
- Use `/gh-close-issue` to change issue state
- Body update replaces entire body (not append)

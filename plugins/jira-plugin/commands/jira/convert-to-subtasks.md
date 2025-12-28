---
description: <parentKey> <childKey1> [<childKey2> ...] - Convert issues to sub-tasks of a parent
---

# Convert Issues to Sub-tasks

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `convertToSubtasks(issueKeys, parentKey, projectKey)` function
- Parse parent key (first arg) and child keys (space or comma separated)
- Operation runs asynchronously - returns taskId
- Optionally poll with `getBulkTaskStatus(taskId)`

## Example Usage

```
/jira-convert-to-subtasks TC-1 TC-2 TC-3 TC-4
/jira-convert-to-subtasks TC-1 "TC-2,TC-3,TC-4"
```

### Use Cases

- **Epic Breakdown** - Convert tasks to epic sub-tasks
- **Story Organization** - Group tasks under story
- **Feature Grouping** - Organize related tasks

## Output

```
✓ Conversion Started
Parent Issue: PROJ-100
Issues to Convert: 4 (PROJ-101, PROJ-102, PROJ-103, PROJ-104)
Task ID: bulk-1234567890-abcd-efgh

The operation is running asynchronously.
```

## Error Handling

| Error | Handling |
|-------|----------|
| Invalid parent | "Parent issue does not exist" |
| Different project | "All issues must be in same project" |
| Max limit exceeded | "Maximum 1000 issues per operation" |
| Already sub-task | Warning, skip and continue |

## Notes

- Uses Bulk Move API (async operation)
- All issue data is preserved
- Parent and children must be in same project
- Original issue keys are preserved

---
description: <parentKey> <childKey1> [<childKey2> ...] - Convert issues to sub-tasks of a parent
---

# Convert Issues to Sub-tasks

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Extract the parent issue key from user input (first argument or prompted)
4. Extract the child issue keys to convert from user input
5. Call `api.convertToSubtasks(issueKeys, parentKey, projectKey)`
6. The operation runs asynchronously and returns a `taskId`
7. Display the taskId and inform the user the operation is in progress
8. Optionally, poll `api.getBulkTaskStatus(taskId)` to show progress

## Example Usage

### Basic Examples

```
/jira-convert-to-subtasks TC-1 TC-2 TC-3 TC-4
/jira-convert-to-subtasks TC-1 "TC-2,TC-3,TC-4"
```

### Real-World Workflows

**Epic Breakdown:**
```
# You have an epic PROJ-100 and want to convert existing tasks to its sub-tasks
/jira-convert-to-subtasks PROJ-100 PROJ-101 PROJ-102 PROJ-103 PROJ-104
```

**Story Organization:**
```
# Convert standalone tasks to sub-tasks of a user story
/jira-convert-to-subtasks PROJ-50 PROJ-51,PROJ-52,PROJ-53
```

**Batch Conversion with Comma List:**
```
/jira-convert-to-subtasks PROJ-200 "PROJ-201,PROJ-202,PROJ-203,PROJ-204,PROJ-205"
```

**Feature Grouping:**
```
# Group related tasks under a parent feature task
/jira-convert-to-subtasks FEAT-10 TASK-1 TASK-2 TASK-3
```

## Arguments

| Position | Parameter | Description | Required |
|----------|-----------|-------------|----------|
| 1 | Parent Key | The parent issue key (e.g., TC-1) | Yes |
| 2+ | Child Keys | Issue keys to convert to sub-tasks | Yes |

## Output

```
✓ Conversion Started
Parent Issue: PROJ-100
Issues to Convert: 4 (PROJ-101, PROJ-102, PROJ-103, PROJ-104)
Task ID: bulk-1234567890-abcd-efgh

The operation is running asynchronously. Check progress with the task ID.
```

## Error Scenarios

**Invalid Parent Issue:**
```
Error: Parent issue PROJ-999 does not exist
```

**Issues Not in Same Project:**
```
Error: All issues must be in the same project as the parent
```

**Maximum Limit Exceeded:**
```
Error: Maximum 1000 issues can be converted in a single operation
```

**Already a Sub-task:**
```
Warning: PROJ-105 is already a sub-task, skipping
```

## Notes

- This operation uses the Bulk Move API which runs asynchronously
- The issues will be converted to Sub-task issue type
- All issue data (summary, status, priority, assignee, etc.) is preserved
- The parent issue must be in the same project as the issues being converted
- Maximum 1000 issues per operation
- The operation may take several minutes for large batches
- Sub-tasks inherit the parent's project and sprint (if parent is in a sprint)
- Original issue keys are preserved (e.g., PROJ-101 remains PROJ-101)

## Technical Details

This command uses:
- `POST /rest/api/3/bulk/issues/move` - Bulk Move API
- Converts issues to sub-task issue type (ID: 10002)
- Sets the parent relationship in a single operation

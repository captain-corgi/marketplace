---
description: sprintId=<id> issues=<key1>,<key2>,... - Move issues to a sprint
---
# Move Issues to a Sprint

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Extract parameters from user input:
   - `sprintId` (required): Target sprint ID
   - `issues` (required): Array of issue keys (comma-separated)
3. Parse the issue keys into an array
4. Call `api.moveIssuesToSprint(sprintId, issueKeys)`
5. Display confirmation with count of moved issues

## Example Usage

### Basic Examples

```
/jira-move-to-sprint sprintId=42 issues=PROJ-123,PROJ-456
/jira-move-to-sprint sprintId=42 issues="PROJ-123, PROJ-456, PROJ-789"
```

### Real-World Workflows

**Sprint Planning - Add Multiple Issues:**
```
/jira-move-to-sprint sprintId=145 issues=PROJ-101,PROJ-102,PROJ-103,PROJ-104
# Use case: Plan upcoming sprint by adding backlog items
```

**Move Issues to Active Sprint:**
```
/jira-move-to-sprint sprintId=150 issues="PROJ-201, PROJ-202, PROJ-203"
# Use case: Add newly created issues to the current sprint
```

**Bulk Issue Assignment:**
```
/jira-move-to-sprint sprintId=155 issues=PROJ-301,PROJ-302,PROJ-303,PROJ-304,PROJ-305
# Use case: Move entire epic or feature set into a sprint
```

**Reassign Between Sprints:**
```
/jira-move-to-sprint sprintId=160 issues=PROJ-401
# Use case: Move issue from one sprint to another (removes from original)
```

**With Quoted List:**
```
/jira-move-to-sprint sprintId=165 issues="PROJ-501,PROJ-502,PROJ-503"
# Use case: Clean formatting for many issues
```

## Output

```
✓ Moved 3 issues to sprint 145
Issues: PROJ-101, PROJ-102, PROJ-103
```

## Error Scenarios

**Invalid Sprint ID:**
```
Error: Sprint with ID 999 does not exist or is not accessible
```

**Sprint Closed:**
```
Error: Cannot add issues to a closed sprint
```

**Issues Not Found:**
```
Warning: PROJ-999 does not exist, skipping
```

**Workflow Restriction:**
```
Error: Cannot move PROJ-401 due to workflow restrictions
```

## Notes

- Issues can only be in one active sprint at a time
- Moving an issue from one sprint to another will remove it from the original
- The sprint must be in "active" or "future" state
- Issues retain their status and other attributes when moved
- Use `/jira-sprints <boardId>` to find sprint IDs
- Maximum 1000 issues can be moved in a single operation
- The sprint must belong to the same board as the issues' project

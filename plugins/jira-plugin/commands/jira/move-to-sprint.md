---
description: sprintId=<id> issues=<key1>,<key2>,... - Move issues to a sprint
---

# Move Issues to a Sprint

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `moveIssuesToSprint(sprintId, issueKeys)` function
- Parse sprintId (required) and comma-separated issues list
- Support quoted lists: "PROJ-1, PROJ-2, PROJ-3"
- Display confirmation with moved count

## Example Usage

```
/jira-move-to-sprint sprintId=42 issues=PROJ-123,PROJ-456
/jira-move-to-sprint sprintId=42 issues="PROJ-123, PROJ-456, PROJ-789"
```

### Use Cases

- **Sprint Planning** - Add backlog items to upcoming sprint
- **Add to Active Sprint** - Add new issues to current sprint
- **Bulk Assignment** - Move entire epic into sprint
- **Reassign** - Move issue from one sprint to another

## Output

```
✓ Moved 3 issues to sprint 145
Issues: PROJ-101, PROJ-102, PROJ-103
```

## Error Handling

| Error | Handling |
|-------|----------|
| Invalid sprint ID | "Sprint does not exist or not accessible" |
| Sprint closed | "Cannot add issues to closed sprint" |
| Issue not found | Warning, skip and continue |
| Workflow restriction | "Cannot move due to workflow restrictions" |

## Notes

- Issues can only be in one active sprint
- Moving removes from original sprint
- Sprint must be "active" or "future" state
- Max 1000 issues per operation

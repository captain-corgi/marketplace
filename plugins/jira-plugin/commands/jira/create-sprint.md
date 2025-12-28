---
description: name="<name>" boardId=<id> [startDate=<YYYY-MM-DD>] [endDate=<YYYY-MM-DD>] - Create a new sprint
---

# Create a New Sprint

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `createSprint(name, boardId, startDate, endDate)` function
- Parse name (required), boardId (required), optional dates
- Dates in ISO 8601 format: YYYY-MM-DD
- Display confirmation with sprint ID and details

## Example Usage

```
/jira-create-sprint name="Sprint 42" boardId=12
/jira-create-sprint name="Sprint 42" boardId=12 startDate=2025-01-15 endDate=2025-01-29
```

### Use Cases

- **Sprint Planning** - Create upcoming sprints
- **Release Sprint** - Create shorter release sprint
- **Hardening Sprint** - Focus on bug fixes
- **Named Sprint** - Descriptive name for theme

## Output

```
✓ Sprint Created
ID: 145
Name: Sprint 42
Board: Team Alpha (ID: 12)
Start Date: 2025-01-15
End Date: 2025-01-29
State: future
```

## Error Handling

| Error | Handling |
|-------|----------|
| Invalid board ID | "Board does not exist" |
| Duplicate name | "Sprint with this name already exists" |
| Invalid date format | "Use ISO 8601 format (YYYY-MM-DD)" |
| End before start | "End date must be after start date" |

## Notes

- Use `/jira-boards` to find board IDs
- Sprint names must be unique within board
- Sprint created in "future" state until started

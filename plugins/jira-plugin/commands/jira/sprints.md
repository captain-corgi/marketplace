---
description: <boardId> [active|closed|future] - List sprints for a Jira board
---

# List Board Sprints

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `getSprints(boardId, state)` function
- Use `scripts/formatters.js` for `formatSprintList()` function
- Parse boardId (required) and optional state filter
- Display board info and sprint table

## Example Usage

```
/jira-sprints 12
/jira-sprints 12 active
/jira-sprints 12 future
```

### Use Cases

- **Daily Standup** - Get current sprint ID
- **Sprint Planning** - See planned future sprints
- **Retrospective** - Review past sprints
- **Issue Assignment** - Find sprint ID for `/jira-move-to-sprint`

## Sprint States

| State | Description |
|-------|-------------|
| active | Currently ongoing |
| closed | Completed |
| future | Planned but not started |

## Output

```
Sprints for Board 15 (Team Alpha)

┌──────┬─────────────────────┬────────┬────────────┬──────────────┐
│ ID   │ Name                │ State  │ Start Date │ End Date     │
├──────┼─────────────────────┼────────┼────────────┼──────────────┤
│ 160  │ Sprint 23           │ active │ 2025-01-13 │ 2025-01-27   │
│ 161  │ Sprint 24           │ future │ 2025-01-28 │ 2025-02-10   │
│ 159  │ Sprint 22           │ closed │ 2024-12-30 │ 2025-01-12   │
└──────┴─────────────────────┴────────┴────────────┴──────────────┘
```

## Error Handling

| Error | Handling |
|-------|----------|
| Invalid board ID | "Board does not exist" |
| No sprints | "No sprints found for board" |
| No permission | "You don't have permission to view sprints" |

## Notes

- Use `/jira-boards` to find board IDs
- Sprint IDs are needed for `/jira-sprint-issues` and `/jira-move-to-sprint`

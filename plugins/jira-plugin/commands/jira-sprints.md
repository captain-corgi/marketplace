---
description: <boardId> [active|closed|future] - List sprints for a Jira board
---

# List Board Sprints

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Extract boardId from user input
4. Optional: Extract state filter (active, closed, future)
5. Call `api.getSprints(boardId, state)`
6. Format using `formatters.formatSprintList(sprints.values)`
7. Display the results

## Example Usage

### Basic Examples

```
/jira-sprints 12
/jira-sprints 12 active
/jira-sprints 12 future
```

### Real-World Workflows

**Find Active Sprint:**
```
/jira-sprints 15 active
# Use case: Get current sprint ID for daily standup
```

**Plan Upcoming Sprints:**
```
/jira-sprints 15 future
# Use case: See planned sprints before sprint planning meeting
```

**Sprint History Review:**
```
/jira-sprints 15 closed
# Use case: Review past sprints during retrospective planning
```

**Browse All Sprints:**
```
/jira-sprints 15
# Use case: Get overview of all sprints on the board
```

**Find Sprint for Issue Assignment:**
```
/jira-sprints 15 active
# Use case: Find active sprint ID to use with /jira-move-to-sprint
```

## Sprint States

- `active` - Currently active sprints
- `closed` - Completed sprints
- `future` - Planned but not started sprints

## Output

```
Sprints for Board 15 (Team Alpha)

┌──────┬─────────────────────┬────────┬────────────┬──────────────┬────────────┐
│ ID   │ Name                │ State  │ Start Date │ End Date     │ Goal       │
├──────┼─────────────────────┼────────┼────────────┼──────────────┼────────────┤
│ 160  │ Sprint 23           │ active │ 2025-01-13 │ 2025-01-27   │ Release Q1 │
│ 161  │ Sprint 24           │ future │ 2025-01-28 │ 2025-02-10   │            │
│ 162  │ Sprint 25           │ future │ 2025-02-11 │ 2025-02-24   │            │
│ 159  │ Sprint 22           │ closed │ 2024-12-30 │ 2025-01-12   │ Completed  │
│ 158  │ Sprint 21           │ closed │ 2024-12-16 │ 2024-12-29   │ Completed  │
└──────┴─────────────────────┴────────┴────────────┴──────────────┴────────────┘
```

## Error Scenarios

**Invalid Board ID:**
```
Error: Board with ID 999 does not exist
```

**No Sprints Found:**
```
No sprints found for board 15
```

**No Access:**
```
Error: You don't have permission to view sprints for this board
```

## Notes

- Table showing sprint ID, name, state, start date, and end date
- Use `/jira-boards` to find board IDs
- Sprint IDs are needed for `/jira-sprint-issues` and `/jira-move-to-sprint`
- Active sprints are currently ongoing
- Future sprints are planned but not started
- Closed sprints are completed and can be used for historical reference
- Sprint goals are optional and may not be set for all sprints

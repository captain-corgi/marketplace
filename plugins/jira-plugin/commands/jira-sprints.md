# /jira-sprints - List Board Sprints

List all sprints for a Jira board.

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Extract boardId from user input
4. Optional: Extract state filter (active, closed, future)
5. Call `api.getSprints(boardId, state)`
6. Format using `formatters.formatSprintList(sprints.values)`
7. Display the results

## Example Usage

```
/jira-sprints 12
/jira-sprints 12 active
/jira-sprints 12 future
```

## Sprint States

- `active` - Currently active sprints
- `closed` - Completed sprints
- `future` - Planned but not started sprints

## Output

Table showing sprint ID, name, state, start date, and end date.

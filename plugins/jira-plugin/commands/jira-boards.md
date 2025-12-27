# /jira-boards - List Jira Boards

List all Jira Software boards (Scrum and Kanban).

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Optional: Extract boardType filter (scrum, kanban, etc.)
4. Call `api.getBoards(boardType)`
5. Format using `formatters.formatBoardList(boards.values)`
6. Display the results

## Example Usage

```
/jira-boards
/jira-boards scrum
/jira-boards kanban
```

## Output

Table showing board ID, name, and type.

## Notes

- Board ID is needed for other sprint-related commands
- Use `/jira-sprints <boardId>` to view sprints for a specific board

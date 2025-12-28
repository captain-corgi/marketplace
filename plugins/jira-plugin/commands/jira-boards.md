---
description: [scrum|kanban] - List all Jira Software boards with optional filter
---

# List Jira Boards

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Optional: Extract boardType filter (scrum, kanban, etc.)
4. Call `api.getBoards(boardType)`
5. Format using `formatters.formatBoardList(boards.values)`
6. Display the results

## Example Usage

### Basic Examples

```
/jira-boards
/jira-boards scrum
/jira-boards kanban
```

### Real-World Workflows

**Before Sprint Planning:**
```
/jira-boards scrum
# Output: Find your team's board ID, then use /jira-sprints <boardId> to see available sprints
```

**Finding Kanban Boards:**
```
/jira-boards kanban
# Output: List all Kanban boards to monitor work-in-progress limits
```

**Team Setup:**
```
/jira-boards
# Output: Browse all available boards to find the right one for your project
```

## Output

```
┌────────┬─────────────────────────────┬──────────┐
│ ID     │ Name                        │ Type     │
├────────┼─────────────────────────────┼──────────┤
│ 12     │ Team Alpha - Scrum          │ scrum    │
│ 15     │ Team Beta - Kanban          │ kanban   │
│ 23     │ Platform Development        │ scrum    │
└────────┴─────────────────────────────┴──────────┘
```

## Notes

- Board ID is needed for other sprint-related commands
- Use `/jira-sprints <boardId>` to view sprints for a specific board
- Only boards you have permission to view will be listed

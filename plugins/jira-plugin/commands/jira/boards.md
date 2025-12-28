---
description: [scrum|kanban] - List all Jira Software boards with optional filter
---

# List Jira Boards

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `getBoards(boardType)` function
- Use `scripts/formatters.js` for `formatBoardList()` function
- Parse optional `boardType` filter (scrum or kanban)
- Display results with guidance to use `/jira-sprints <boardId>`

## Example Usage

```
/jira-boards
/jira-boards scrum
/jira-boards kanban
```

### Use Cases

- **Sprint Planning** - Find board ID, then view sprints with `/jira-sprints`
- **Kanban Monitoring** - List kanban boards to monitor WIP limits
- **Team Setup** - Browse all available boards for a project

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

- Board ID is needed for `/jira-sprints <boardId>` and `/jira-create-sprint`
- Only boards with view permission are listed

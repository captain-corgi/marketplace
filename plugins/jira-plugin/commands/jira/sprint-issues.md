---
description: <sprintId> - List all issues in a sprint
---

# Get Issues in a Sprint

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `getSprintIssues(sprintId)` function
- Use `scripts/formatters.js` for `formatIssueList()` function
- Parse sprintId from user input
- Display issues in rank order

## Example Usage

```
/jira-sprint-issues 145
```

### Use Cases

- **Daily Standup** - See all issues in current sprint
- **Check Progress** - Review work remaining
- **Sprint Planning** - Verify upcoming sprint contents
- **Identify Blockers** - Find blocked issues
- **Sprint Report** - Generate completed/incomplete list

## Output

```
Sprint 145 Issues (12 issues)

┌──────────┬─────────────────────────────┬─────────────┬──────────┬────────────┐
│ Key      │ Summary                     │ Status      │ Priority │ Assignee   │
├──────────┼─────────────────────────────┼─────────────┼──────────┼────────────┤
│ PROJ-101 │ User authentication         │ Done        │ High     │ jane.doe   │
│ PROJ-102 │ Password reset              │ In Progress │ High     │ john.doe   │
│ PROJ-103 │ User profile                │ In Progress │ Medium   │ sara.jones │
│ PROJ-104 │ Email notifications         │ To Do       │ Medium   │           │
└──────────┴─────────────────────────────┴─────────────┴──────────┴────────────┘
```

## Error Handling

| Error | Handling |
|-------|----------|
| Invalid sprint ID | "Sprint does not exist or no permission" |
| No issues | "No issues found in sprint" |

## Notes

- Use `/jira-sprints` to find sprint IDs
- Issues in rank order (as on board)
- Shows all statuses (To Do, In Progress, Done)

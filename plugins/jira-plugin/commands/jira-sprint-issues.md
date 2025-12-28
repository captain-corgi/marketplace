---
description: <sprintId> - List all issues in a sprint
---

# Get Issues in a Sprint

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Extract sprintId from user input
4. Call `api.getSprintIssues(sprintId)`
5. Format using `formatters.formatIssueList(issues)`
6. Display the results

## Example Usage

### Basic Examples

```
/jira-sprint-issues 42
```

### Real-World Workflows

**Review Sprint Contents:**
```
/jira-sprint-issues 145
# Use case: See all issues in the current sprint during standup
```

**Check Sprint Progress:**
```
/jira-sprint-issues 150
# Use case: Review work remaining before sprint review
```

**Sprint Planning Review:**
```
/jira-sprint-issues 155
# Use case: Verify what issues are in the upcoming sprint
```

**Identify Blockers:**
```
/jira-sprint-issues 160
# Use case: Check for blocked issues that need attention
```

**Prepare Sprint Report:**
```
/jira-sprint-issues 165
# Use case: Generate list of completed and incomplete issues for sprint retrospective
```

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
│ PROJ-105 │ Dashboard redesign          │ To Do       │ Low      │ mike.wilson│
└──────────┴─────────────────────────────┴─────────────┴──────────┴────────────┘
```

## Error Scenarios

**Invalid Sprint ID:**
```
Error: Sprint with ID 999 does not exist or you don't have permission to view it
```

**No Issues in Sprint:**
```
No issues found in sprint 145
```

## Notes

- Use `/jira-sprints <boardId>` to find sprint IDs
- Issues are returned in rank order (as they appear on the board)
- Shows all issues regardless of status (To Do, In Progress, Done)
- Useful for sprint planning, standups, and retrospectives
- Assignee column shows who is working on each issue
- Empty assignee means the issue is unassigned

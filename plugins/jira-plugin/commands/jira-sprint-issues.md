# /jira-sprint-issues - Get Issues in a Sprint

List all issues in a sprint.

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Extract sprintId from user input
4. Call `api.getSprintIssues(sprintId)`
5. Format using `formatters.formatIssueList(issues)`
6. Display the results

## Example Usage

```
/jira-sprint-issues 42
```

## Output

Table showing issues in the sprint with key, summary, status, priority, and assignee.

## Notes

- Use `/jira-sprints <boardId>` to find sprint IDs
- Issues are returned in rank order

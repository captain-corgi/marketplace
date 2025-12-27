# /jira-search - Search Jira Issues with JQL

Search for Jira issues using JQL (Jira Query Language).

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Extract the JQL query from the user's request
4. Optional: Extract maxResults (default 50)
5. Call `api.searchIssues(jql, maxResults)`
6. Format results using `formatters.formatIssueList(issues)`
7. Display total count and the formatted table

## Example Usage

```
/jira-search "project = PROJ AND status = 'In Progress'"
/jira-search "assignee = currentUser() AND status != Done" maxResults=100
```

## Common JQL Examples

- `project = PROJ` - All issues in a project
- `status = "In Progress"` - Issues in progress
- `assignee = currentUser()` - Issues assigned to you
- `priority = High AND status != Done` - High priority unresolved issues
- `sprint = openSprints()` - Issues in active sprints
- `created >= -7d` - Issues created in the last 7 days

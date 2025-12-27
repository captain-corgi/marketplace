# /jira-get-issue - Get Jira Issue Details

Retrieve and display detailed information about a Jira issue.

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Extract the issue key from the user's request
4. Call `api.getIssue(issueKey)`
5. Format the response using `formatters.formatIssueDetail(issue)`
6. Display the formatted result

## Example Usage

```
/jira-get-issue PROJ-123
```

## Output

Full issue details including summary, status, priority, assignee, description, and link to Jira.

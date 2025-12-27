# /jira-edit-issue - Edit a Jira Issue

Update an existing Jira issue with new field values.

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Extract the issue key and fields to update from user input
3. Build the fields object with only the fields being updated
4. Call `api.updateIssue(issueKey, fields)`
5. Display confirmation with the issue key and updated fields

## Example Usage

```
/jira-edit-issue PROJ-123 summary="New summary" priority=High
/jira-edit-issue PROJ-123 assignee=john.doe@example.com
```

## Notes

- Only include fields that are being changed
- Use the same field names as in create issue
- Some fields may not be editable due to workflow or screen configuration

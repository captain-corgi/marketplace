# /jira-create-issue - Create a Jira Issue

Create a new issue in Jira with specified fields.

## Instructions

1. **Load the API client** from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`

2. **Parse the user's request** to extract these parameters:
   - `project` (required): Project key (e.g., PROJ)
   - `summary` (required): Issue summary/title
   - `issuetype` (required): Issue type name (Bug, Story, Task, etc.)
   - `description` (optional): Issue description
   - `priority` (optional): Priority name
   - `assignee` (optional): Assignee email or accountId

3. **Build the issue fields object**:
   ```javascript
   const fields = {
     project: { key: projectKey },
     summary: summary,
     issuetype: { name: issueType }
   };
   // Add optional fields if provided
   if (description) fields.description = description;
   if (priority) fields.priority = { name: priority };
   if (assignee) fields.assignee = { name: assignee };
   ```

4. **Call `api.createIssue(fields)`**

5. **Format and display the result** showing:
   - Issue key
   - Summary
   - URL to view in Jira
   - Any errors encountered

## Example Usage

```
/jira-create-issue project=PROJ summary="Fix login bug" issuetype=Bug priority=High
```

## Error Handling

- If environment variables are missing: Display clear message to set JIRA_URL, JIRA_EMAIL, JIRA_API_KEY
- If API returns error: Show the error message from Jira

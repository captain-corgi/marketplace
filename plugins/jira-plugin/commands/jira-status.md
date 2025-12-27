# /jira-status - Test Jira Connection

Verify your Jira configuration and test API connectivity.

## Instructions

1. Load the auth module from `${CLAUDE_PLUGIN_ROOT}/lib/auth.js`
2. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
3. Call `auth.validateConfig()` and display results
4. If valid, call `api.getProjects()` to test connectivity
5. Display:
   - Jira URL
   - Configured email
   - Connection status
   - First few accessible projects (as verification)

## Example Usage

```
/jira-status
```

## Output

```
Jira Configuration Status
=========================

Jira URL: https://your-domain.atlassian.net
Email: your-email@example.com
API Key: ✓ Set
Connection: ✓ Successful

Accessible Projects (showing first 5):
- PROJ - Project Name
- DEV - Development
```

## Error Messages

- If environment variables are missing, list which ones need to be set
- If authentication fails, suggest checking email and API token
- If connection fails, suggest checking the URL and network connectivity

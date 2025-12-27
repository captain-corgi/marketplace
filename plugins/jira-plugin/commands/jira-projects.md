# /jira-projects - List Jira Projects

List all accessible Jira projects.

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Call `api.getProjects()`
4. Format using `formatters.formatProjectList(projects)`
5. Display the results

## Example Usage

```
/jira-projects
```

## Output

Table showing project key, name, type, and lead.

## Notes

- Only projects you have permission to view will be listed
- Project keys are needed for creating issues

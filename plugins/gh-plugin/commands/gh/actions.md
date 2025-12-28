---
description: <owner/repo> - List GitHub Actions workflows
---

# List GitHub Actions Workflows

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `listWorkflows(repo)` function
- Use `scripts/formatters.js` for `formatWorkflowList()` function
- Parse repository in "owner/repo" format (required)
- Display formatted table with workflow ID, name, state, and path

## Example Usage

```
/gh-actions microsoft/vscode
/gh-actions owner/repo
```

### Use Cases

- **View CI/CD** - See all workflows in a repository
- **Find Workflow** - Get workflow name for triggering
- **Check Status** - See which workflows are enabled/disabled
- **Audit** - Review automation setup

## Output

```
## Workflows in owner/repo

| ID | Name | State | Path |
|----|------|-------|------|
| 12345 | CI | ✅ Active | .github/workflows/ci.yml |
| 12346 | Deploy | ✅ Active | .github/workflows/deploy.yml |
| 12347 | Release | ❌ Disabled | .github/workflows/release.yml |
```

## Error Handling

| Error | Handling |
|-------|----------|
| Repo not found | "Repository not found - check the name" |
| No workflows | "No workflows found in this repository" |
| No access | "You don't have access to view workflows" |

## Workflow States

| State | Icon | Description |
|-------|------|-------------|
| active | ✅ | Workflow runs on triggers |
| disabled | ❌ | Workflow is disabled |
| disabled_manually | ❌ | Disabled by user |
| disabled_inactivity | ❌ | Disabled due to inactivity |

## Notes

- Workflows are defined in `.github/workflows/` directory
- Use workflow name or filename with `/gh-run-workflow`
- Use `/gh-workflow-status` to see recent runs
- Workflows can be enabled/disabled in GitHub settings

---
description: <owner/repo> [--workflow=<name>] [--status=<status>] [--branch=<name>] [--limit=<n>] - Get GitHub Actions workflow run status
---

# Get Workflow Run Status

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `getWorkflowRuns(repo, options)` function
- Use `scripts/formatters.js` for `formatWorkflowRunList()` function
- Parse repository in "owner/repo" format (required)
- Handle filters: workflow, status, branch, limit
- Display formatted table with run status

## Example Usage

```
/gh-workflow-status owner/repo
/gh-workflow-status owner/repo --workflow=ci.yml
/gh-workflow-status owner/repo --status=failure
/gh-workflow-status owner/repo --branch=main --limit=10
```

### Options

| Option | Values | Default |
|--------|--------|---------|
| `--workflow` | Workflow name or filename | All |
| `--status` | queued, in_progress, completed | All |
| `--branch` | Branch name | All |
| `--limit` | Number | 20 |

### Use Cases

- **Monitor CI** - Check status of recent runs
- **Debug Failures** - Find failed workflows
- **Branch Status** - See runs for specific branch
- **Deployment** - Verify deployment workflow success

## Output

```
## Recent Workflow Runs

| ID | Workflow | Status | Branch | Event | Started |
|----|----------|--------|--------|-------|---------|
| 12345 | CI | ✅ completed | main | push | 2h ago |
| 12344 | Deploy | 🔄 in_progress | main | workflow_dispatch | 5m ago |
| 12343 | CI | ❌ completed | feature | pull_request | 1d ago |
| 12342 | Release | ⏳ queued | main | release | just now |
```

## Status Icons

| Status | Conclusion | Icon |
|--------|------------|------|
| completed | success | ✅ |
| completed | failure | ❌ |
| completed | cancelled | ⚪ |
| in_progress | - | 🔄 |
| queued | - | ⏳ |
| waiting | - | ⏳ |

## Error Handling

| Error | Handling |
|-------|----------|
| Repo not found | "Repository not found" |
| Workflow not found | "Workflow 'X' not found" |
| No runs | "No workflow runs found" |
| No access | "You don't have access to view workflow runs" |

## Filtering Examples

**Failed runs only:**
```
/gh-workflow-status owner/repo --status=completed
```
Then check for ❌ in results.

**Specific workflow:**
```
/gh-workflow-status owner/repo --workflow="CI Pipeline"
```

**Runs on main branch:**
```
/gh-workflow-status owner/repo --branch=main
```

## Getting Run Details

For detailed information about a specific run, use the API:
```javascript
const run = await api.getWorkflowRun('owner/repo', 12345);
console.log(formatters.formatWorkflowRunDetail(run));
```

## Notes

- Status shows current state, conclusion shows final result
- in_progress runs don't have a conclusion yet
- Click URL in GitHub to see full logs
- Re-run failed workflows with `api.rerunWorkflow()`
- Cancel running workflows with `api.cancelWorkflowRun()`

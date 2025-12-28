---
description: <owner/repo> <workflow> [--ref=<branch>] [--input key=value...] - Trigger a GitHub Actions workflow
---

# Trigger a GitHub Actions Workflow

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `runWorkflow(repo, workflow, options)` function
- Parse repository and workflow name/filename (required)
- Handle options: ref (branch/tag), inputs (key=value pairs)
- Display confirmation message

## Example Usage

```
/gh-run-workflow owner/repo deploy.yml
/gh-run-workflow owner/repo "CI Pipeline" --ref=develop
/gh-run-workflow owner/repo deploy.yml --ref=main --input environment=production
/gh-run-workflow owner/repo release.yml --input version=1.2.3 --input prerelease=false
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `workflow` | Workflow name or filename | Required |
| `--ref` | Branch or tag to run on | Default branch |
| `--input` | Workflow inputs (key=value) | None |

### Use Cases

- **Deploy** - Trigger deployment workflow
- **Build** - Manually trigger CI build
- **Release** - Create a new release
- **Test** - Run tests on specific branch

## Output

```
✓ Workflow Triggered

**Workflow**: deploy.yml
**Branch**: main
**Inputs**:
- environment: production
- version: 1.2.3

The workflow has been queued. Use /gh-workflow-status to check progress.
```

## Workflow Inputs

Workflows can define inputs in their YAML:

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deployment environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production
      version:
        description: 'Version to deploy'
        required: true
        type: string
```

Pass inputs with `--input`:
```
/gh-run-workflow owner/repo deploy.yml --input environment=production --input version=1.0.0
```

## Error Handling

| Error | Handling |
|-------|----------|
| Workflow not found | "Workflow 'X' not found" |
| Invalid ref | "Branch or tag 'X' not found" |
| Missing input | "Required input 'X' not provided" |
| Not dispatchable | "Workflow doesn't support manual triggers" |
| No permission | "You don't have permission to trigger workflows" |

## Requirements

The workflow must have `workflow_dispatch` trigger:

```yaml
on:
  workflow_dispatch:  # Enables manual triggering
  push:               # Also runs on push
    branches: [main]
```

## Notes

- Workflow must support `workflow_dispatch` trigger
- Use workflow filename (e.g., `ci.yml`) or full name
- Inputs must match workflow input definitions
- Check run status with `/gh-workflow-status`
- Runs appear in GitHub Actions tab

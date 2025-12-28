---
description: <owner/repo> <name> [source] - Create a new GitHub branch
---

# Create a Branch

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `createBranch(repo, name, source)` function
- Parse repository, new branch name (required), and optional source
- Source can be branch name or commit SHA (defaults to default branch)
- Display created branch information

## Example Usage

```
/gh-create-branch owner/repo feature/new-feature
/gh-create-branch owner/repo fix/bug-123 main
/gh-create-branch owner/repo release/v2.0 develop
/gh-create-branch owner/repo hotfix/urgent a1b2c3d4
```

### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `owner/repo` | Repository | Yes |
| `name` | New branch name | Yes |
| `source` | Source branch or SHA | No (defaults to default branch) |

### Use Cases

- **Feature Branch** - Start new feature development
- **Bug Fix** - Create branch for fixing issue
- **Release** - Create release branch from develop
- **Hotfix** - Create urgent fix from specific commit

## Output

```
✓ Branch Created

**Name**: feature/new-feature
**Source**: main
**SHA**: a1b2c3d4e5f6g7h8

The branch has been created on GitHub.
Clone locally: git fetch && git checkout feature/new-feature
```

## Branch Naming Conventions

| Pattern | Example | Use Case |
|---------|---------|----------|
| `feature/*` | `feature/dark-mode` | New features |
| `fix/*` | `fix/login-bug` | Bug fixes |
| `hotfix/*` | `hotfix/security` | Urgent fixes |
| `release/*` | `release/v1.0` | Release preparation |
| `docs/*` | `docs/api-update` | Documentation |
| `chore/*` | `chore/deps-update` | Maintenance |

## Error Handling

| Error | Handling |
|-------|----------|
| Branch exists | "Branch 'X' already exists" |
| Invalid name | "Invalid branch name" |
| Source not found | "Source branch or SHA not found" |
| No permission | "You don't have permission to create branches" |
| Protected | "Cannot create branch with protected name pattern" |

## Invalid Branch Names

Branch names cannot contain:
- Spaces
- `..` (two consecutive dots)
- `~`, `^`, `:`, `\`
- Start or end with `/`
- End with `.lock`

## After Creating

1. **Fetch locally**: `git fetch origin`
2. **Checkout**: `git checkout feature/new-feature`
3. **Make changes**: Edit files
4. **Commit**: `git commit -am "Description"`
5. **Push**: `git push origin feature/new-feature`
6. **Create PR**: `/gh-create-pr owner/repo title="..." --head=feature/new-feature`

## Notes

- Creates branch on remote (GitHub)
- Use `git fetch` to see it locally
- Source defaults to default branch (usually main)
- Can create from any branch or commit SHA
- Delete merged branches with `/gh-delete-branch`

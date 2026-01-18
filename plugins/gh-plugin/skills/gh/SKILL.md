---
name: gh
description: This skill should be used when the user asks to "create a GitHub issue", "list repositories", "create a pull request", "merge a PR", "trigger a workflow", "list branches", or performs any GitHub operations. Provides comprehensive GitHub API integration via GitHub CLI.
---

# GitHub Integration Skill

## Overview

This skill provides comprehensive GitHub integration through the GitHub CLI (gh). All operations use the `gh` command directly via the Bash tool.

## Environment Requirements

GitHub CLI must be installed and authenticated:

1. Install GitHub CLI: https://cli.github.com/
2. Authenticate: `gh auth login`

Validate configuration: `gh auth status`

## Domain Knowledge

### Repository Visibility

- `public` - Anyone can see
- `private` - Only you and collaborators
- `internal` - Only organization members (Enterprise)

### Issue States

- `open` - Active issue
- `closed` - Resolved issue (completed or not_planned)

### Pull Request States

- `open` - Active PR awaiting merge
- `closed` - Closed without merging
- `merged` - Successfully merged

### PR Merge Methods

- `merge` - Create merge commit (preserves all commits)
- `squash` - Squash into single commit
- `rebase` - Rebase and merge (linear history)

### Workflow Run Status

- `queued` - Waiting to run
- `in_progress` - Currently running
- `completed` - Finished (check conclusion for result)

### Workflow Conclusions

- `success` - All steps passed
- `failure` - One or more steps failed
- `cancelled` - Run was cancelled
- `skipped` - Run was skipped
- `timed_out` - Run exceeded time limit

### PR Review Events

- `approve` - Approve the changes
- `request-changes` - Request modifications
- `comment` - Leave a comment without approval/rejection

### Search Qualifiers

GitHub search supports qualifiers for precise results:

**Repository Search:**

```
language:javascript stars:>1000 pushed:>2024-01-01
user:microsoft topic:api
```

**Issue Search:**

```
is:open is:issue label:bug author:username
repo:owner/repo assignee:username
```

**PR Search:**

```
is:pr is:open review:required
is:pr is:merged merged:>2024-01-01
```

## API Endpoints Reference

| Endpoint           | Purpose             |
| ------------------ | ------------------- |
| `gh repo list`     | List repositories   |
| `gh repo view`     | Get repository      |
| `gh repo create`   | Create repository   |
| `gh repo fork`     | Fork repository     |
| `gh issue list`    | List issues         |
| `gh issue view`    | Get issue           |
| `gh issue create`  | Create issue        |
| `gh issue edit`    | Edit issue          |
| `gh issue close`   | Close issue         |
| `gh issue comment` | Add comment         |
| `gh pr list`       | List pull requests  |
| `gh pr view`       | Get pull request    |
| `gh pr create`     | Create pull request |
| `gh pr merge`      | Merge pull request  |
| `gh pr review`     | Add review          |
| `gh pr comment`    | Add comment         |
| `gh workflow list` | List workflows      |
| `gh workflow run`  | Trigger workflow    |
| `gh run list`      | List workflow runs  |
| `gh run view`      | Get run details     |
| `gh api`           | Direct API calls    |

## Error Handling

| Error                 | Meaning                | Action                               |
| --------------------- | ---------------------- | ------------------------------------ |
| gh not installed      | CLI not available      | Install from https://cli.github.com/ |
| Not authenticated     | No valid session       | Run `gh auth login`                  |
| 404 Not Found         | Resource doesn't exist | Verify repo/issue/PR exists          |
| 403 Forbidden         | No permission          | Check repo access                    |
| 422 Validation Failed | Invalid input          | Check required fields                |

Common error scenarios:

- Repository not found: Verify "owner/repo" format
- Permission denied: Check if you have write access
- Branch conflicts: Pull latest changes before merging
- Protected branch: Review branch protection rules

## Command Workflows

This skill supports 24 commands:

**Repository Operations:**

- `/gh-repos [owner]` - List repositories
- `/gh-search-repos <query>` - Search repositories
- `/gh-get-repo <owner/repo>` - Get repository details
- `/gh-create-repo <name> [options]` - Create repository
- `/gh-fork <owner/repo>` - Fork repository

**Issue Operations:**

- `/gh-issues <owner/repo> [state]` - List issues
- `/gh-get-issue <owner/repo> <number>` - Get issue details
- `/gh-create-issue <owner/repo> title="<text>" [body="<text>"]` - Create issue
- `/gh-edit-issue <owner/repo> <number> [field=value...]` - Edit issue
- `/gh-close-issue <owner/repo> <number>` - Close issue
- `/gh-comment-issue <owner/repo> <number> "<comment>"` - Add comment

**Pull Request Operations:**

- `/gh-prs <owner/repo> [state]` - List pull requests
- `/gh-get-pr <owner/repo> <number>` - Get PR details
- `/gh-create-pr <owner/repo> [options]` - Create pull request
- `/gh-merge-pr <owner/repo> <number> [method]` - Merge PR
- `/gh-review-pr <owner/repo> <number> <event> [body]` - Add review

**Actions Operations:**

- `/gh-actions <owner/repo>` - List workflows
- `/gh-run-workflow <owner/repo> <workflow> [ref]` - Trigger workflow
- `/gh-workflow-status <owner/repo> [workflow]` - Get run status

**Branch Operations:**

- `/gh-branches <owner/repo>` - List branches
- `/gh-create-branch <owner/repo> <name> [source]` - Create branch
- `/gh-delete-branch <owner/repo> <name>` - Delete branch

**Other:**

- `/gh-notifications` - List notifications
- `/gh-status` - Test connection and show auth status

## Usage Examples

### Listing Repositories

```bash
gh repo list
gh repo list microsoft --limit 30
```

### Working with Issues

```bash
gh issue list --repo owner/repo
gh issue view 123 --repo owner/repo
gh issue create --repo owner/repo --title "Bug: Login fails" --body "Steps to reproduce..."
gh issue edit 123 --repo owner/repo --add-label "bug,high-priority"
gh issue close 123 --repo owner/repo
gh issue comment 123 --repo owner/repo --body "This is a comment"
```

### Creating and Merging PRs

```bash
gh pr create --repo owner/repo --title "Add new feature" --body "This PR adds..." --head feature-branch --base main --reviewers reviewer1,reviewer2
gh pr merge 123 --repo owner/repo --method squash --delete-branch
```

### Triggering Workflows

```bash
gh workflow run deploy.yml --repo owner/repo --ref main -f environment=production -f version=1.2.3
gh run list --repo owner/repo --workflow deploy.yml --limit 5
```

### Branch Management

```bash
gh branch list --repo owner/repo
gh branch create feature/new-feature --repo owner/repo
gh branch delete feature/old-feature --repo owner/repo
```

## Progressive Disclosure

For detailed GitHub search patterns and advanced query examples, see `references/gh-cli-patterns.md`.

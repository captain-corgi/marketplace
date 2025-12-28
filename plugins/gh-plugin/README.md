# GitHub Plugin for Claude Code

A comprehensive GitHub integration plugin that enables natural language interactions with GitHub repositories, issues, pull requests, GitHub Actions, branches, and notifications using the GitHub CLI.

## Features

- **Repositories**: List, search, create, fork, and manage repositories
- **Issues**: Create, search, edit, close, and comment on issues
- **Pull Requests**: Create, merge, review, and manage PRs
- **GitHub Actions**: List workflows, trigger runs, check status
- **Branches**: List, create, and delete branches
- **Notifications**: View and manage GitHub notifications

## Prerequisites

### GitHub CLI (Required)

This plugin uses the GitHub CLI (`gh`) for all operations. You must install and authenticate before using the plugin.

#### Install GitHub CLI

**macOS:**
```bash
brew install gh
```

**Windows:**
```bash
winget install GitHub.cli
# or
choco install gh
```

**Linux (Debian/Ubuntu):**
```bash
sudo apt install gh
```

**Linux (Fedora):**
```bash
sudo dnf install gh
```

For other installation methods, see: https://cli.github.com/

#### Authenticate

```bash
gh auth login
```

Follow the interactive prompts to authenticate with your GitHub account.

#### Verify Setup

```bash
gh auth status
```

Or use the plugin command:
```
/gh-status
```

## Installation

```bash
/plugin marketplace add captain-corgi/corgi-hub-plugins
/plugin install gh-plugin@corgi-hub-plugins
```

## Commands Reference

### Repository Commands

| Command | Description |
|---------|-------------|
| `/gh-repos [owner]` | List repositories for user/org |
| `/gh-search-repos <query>` | Search GitHub repositories |
| `/gh-get-repo <owner/repo>` | Get repository details |
| `/gh-create-repo <name>` | Create new repository |
| `/gh-fork <owner/repo>` | Fork a repository |

### Issue Commands

| Command | Description |
|---------|-------------|
| `/gh-issues <owner/repo>` | List issues in a repository |
| `/gh-get-issue <owner/repo> <#>` | Get issue details |
| `/gh-create-issue <owner/repo> title="..."` | Create new issue |
| `/gh-edit-issue <owner/repo> <#>` | Edit an existing issue |
| `/gh-close-issue <owner/repo> <#>` | Close an issue |
| `/gh-comment-issue <owner/repo> <#> "..."` | Add comment to issue |

### Pull Request Commands

| Command | Description |
|---------|-------------|
| `/gh-prs <owner/repo>` | List pull requests |
| `/gh-get-pr <owner/repo> <#>` | Get PR details |
| `/gh-create-pr <owner/repo> title="..."` | Create pull request |
| `/gh-merge-pr <owner/repo> <#>` | Merge pull request |
| `/gh-review-pr <owner/repo> <#> <event>` | Add review to PR |

### Actions Commands

| Command | Description |
|---------|-------------|
| `/gh-actions <owner/repo>` | List workflows |
| `/gh-run-workflow <owner/repo> <workflow>` | Trigger workflow |
| `/gh-workflow-status <owner/repo>` | Get run status |

### Branch Commands

| Command | Description |
|---------|-------------|
| `/gh-branches <owner/repo>` | List branches |
| `/gh-create-branch <owner/repo> <name>` | Create branch |
| `/gh-delete-branch <owner/repo> <name>` | Delete branch |

### Other Commands

| Command | Description |
|---------|-------------|
| `/gh-notifications` | List notifications |
| `/gh-status` | Check connection status |

## Usage Examples

### Working with Issues

```
# List open issues
/gh-issues microsoft/vscode

# Create a bug report
/gh-create-issue owner/repo title="Bug: Login fails" body="Steps to reproduce..." --labels=bug

# Close an issue
/gh-close-issue owner/repo 123
```

### Working with Pull Requests

```
# Create a PR
/gh-create-pr owner/repo title="Add feature" --head=feature-branch --reviewers=teammate

# Merge with squash
/gh-merge-pr owner/repo 456 --method=squash --delete-branch

# Approve a PR
/gh-review-pr owner/repo 456 approve body="LGTM!"
```

### Working with Actions

```
# List workflows
/gh-actions owner/repo

# Trigger deployment
/gh-run-workflow owner/repo deploy.yml --ref=main --input environment=production

# Check status
/gh-workflow-status owner/repo --workflow=deploy.yml
```

## Architecture

```
gh-plugin/
├── .claude-plugin/
│   └── plugin.json         # Plugin manifest
├── agents/
│   └── gh-agent.md         # GitHub expert agent
├── commands/
│   └── gh/                 # 24 slash commands
├── skills/
│   └── gh/
│       ├── SKILL.md        # Skill documentation
│       ├── scripts/
│       │   ├── api.js      # GitHub API client
│       │   ├── auth.js     # Authentication utilities
│       │   └── formatters.js # Output formatters
│       └── references/
│           └── gh-cli-patterns.md # Search patterns
└── README.md
```

## Security

- **No stored credentials**: Uses GitHub CLI's secure credential storage
- **No environment variables**: Authentication handled by `gh auth`
- **Scoped access**: Limited to your GitHub permissions
- **Audit trail**: All operations logged by GitHub

## Troubleshooting

### "gh not found"
Install GitHub CLI: https://cli.github.com/

### "Not authenticated"
Run `gh auth login` to authenticate.

### "Permission denied"
Check that you have access to the repository and required permissions.

### "Rate limited"
GitHub API has rate limits. Wait a few minutes and try again.

## License

MIT License - See LICENSE file for details.

## Contributing

Contributions welcome! Please open an issue or PR on the repository.

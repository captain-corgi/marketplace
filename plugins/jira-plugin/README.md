# Jira Plugin for Claude Code

Full-featured Jira Cloud integration for issue tracking and Agile/Scrum management.

## Prerequisites

### Environment Variables

This plugin requires the following environment variables to be set before use:

| Variable | Description | Example |
|----------|-------------|---------|
| `JIRA_URL` | Your Jira instance URL | `https://your-domain.atlassian.net` |
| `JIRA_EMAIL` | Your Jira account email | `your-email@example.com` |
| `JIRA_API_KEY` | Your Jira API token | Generate at [Atlassian](https://id.atlassian.com/manage-profile/security/api-tokens) |

#### Setting Environment Variables

**Linux/macOS (bash/zsh):**
```bash
export JIRA_URL="https://your-domain.atlassian.net"
export JIRA_EMAIL="your-email@example.com"
export JIRA_API_KEY="your-api-token-here"
```

**Windows (PowerShell):**
```powershell
$env:JIRA_URL="https://your-domain.atlassian.net"
$env:JIRA_EMAIL="your-email@example.com"
$env:JIRA_API_KEY="your-api-token-here"
```

**Windows (Command Prompt):**
```cmd
set JIRA_URL=https://your-domain.atlassian.net
set JIRA_EMAIL=your-email@example.com
set JIRA_API_KEY=your-api-token-here
```

To make these persistent, add them to your shell profile (`.bashrc`, `.zshrc`, `.profile`, etc.) or system environment variables.

## Features

- **Issue Management**: Create, read, update, search, and transition issues
- **Comments**: Add and retrieve comments on issues
- **Agile/Scrum**: Manage boards, sprints, and backlogs
- **Project Management**: List and navigate projects
- **JQL Support**: Powerful search with Jira Query Language

## Installation

```bash
/plugin marketplace add captain-corgi/corgi-hub-plugins
/plugin install jira-plugin@corgi-hub-plugins
```

## Commands

| Command | Description |
|---------|-------------|
| `/jira-create-issue` | Create a new Jira issue |
| `/jira-get-issue` | Get issue details |
| `/jira-edit-issue` | Edit an existing issue |
| `/jira-search` | Search issues with JQL |
| `/jira-transition` | Transition issue status |
| `/jira-comment` | Add a comment to an issue |
| `/jira-get-comments` | Get comments for an issue |
| `/jira-boards` | List all boards |
| `/jira-sprints` | List sprints for a board |
| `/jira-create-sprint` | Create a new sprint |
| `/jira-sprint-issues` | Get issues in a sprint |
| `/jira-move-to-sprint` | Move issues to a sprint |
| `/jira-projects` | List all projects |
| `/jira-status` | Test connection and verify configuration |

## Usage Examples

### Create an Issue

```
/jira-create-issue project=PROJ summary="Fix login bug" issuetype=Bug priority=High
```

### Get Issue Details

```
/jira-get-issue PROJ-123
```

### Search with JQL

```
/jira-search "project = PROJ AND status = 'In Progress'"
/jira-search "assignee = currentUser() AND status != Done"
```

### Transition Status

```
/jira-transition PROJ-123 "In Progress"
```

### List Boards

```
/jira-boards
/jira-boards scrum
```

### List Sprints

```
/jira-sprints 12
/jira-sprints 12 active
```

## Troubleshooting

### Connection Issues

Run `/jira-status` to verify your configuration and test the connection.

### Common Errors

- **401 Unauthorized**: Check your JIRA_EMAIL and JIRA_API_KEY
- **404 Not Found**: Verify the issue key or project exists
- **Environment variables not set**: Ensure JIRA_URL, JIRA_EMAIL, and JIRA_API_KEY are set

## License

MIT

## Author

Captain Corgi - [GitHub](https://github.com/captain-corgi)

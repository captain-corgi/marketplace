# v1.1.0 - Corgi Hub Plugins

The **Jira Plugin** has arrived! This release adds a full-featured Jira Cloud integration to the Corgi Hub Plugins marketplace.

## What's New

### Jira Plugin

Manage your entire Jira workflow without leaving Claude Code:

| Feature | Commands |
|---------|----------|
| **Issue Management** | `/jira-create-issue`, `/jira-get-issue`, `/jira-edit-issue`, `/jira-search`, `/jira-transition` |
| **Comments** | `/jira-comment`, `/jira-get-comments` |
| **Boards & Sprints** | `/jira-boards`, `/jira-sprints`, `/jira-create-sprint`, `/jira-sprint-issues`, `/jira-move-to-sprint` |
| **Projects** | `/jira-projects` |
| **Configuration** | `/jira-status` |

**Key Features:**
- 15 slash commands for comprehensive Jira management
- JQL (Jira Query Language) support for powerful searches
- Agile/Scrum workflow support (sprints, boards, backlogs)
- Pure JavaScript - no external dependencies
- Secure environment variable configuration

### Installation

```bash
/plugin marketplace add captain-corgi/corgi-hub-plugins
/plugin install jira-plugin@corgi-hub-plugins
```

**Setup Requirements:**
- `JIRA_URL` - Your Jira instance URL (e.g., `https://your-domain.atlassian.net`)
- `JIRA_EMAIL` - Your Jira account email
- `JIRA_API_KEY` - API token from [Atlassian](https://id.atlassian.com/manage-profile/security/api-tokens)

### Documentation

- [Jira Plugin README](https://github.com/captain-corgi/corgi-hub-plugins/blob/main/plugins/jira-plugin/README.md)
- [CHANGELOG](https://github.com/captain-corgi/corgi-hub-plugins/blob/main/CHANGELOG.md) - Full version history

---

**Made with 🧡 by the Corgi Greeting Team**

*"Spreading joy and managing issues, one command at a time!"* 🐕✨

# v1.2.0 - Corgi Hub Plugins

**Jira Plugin 2.0** brings powerful bulk operations and a new Skills architecture to the Corgi Hub Plugins marketplace.

## What's New

### Jira Plugin 2.0.0 - Major Upgrade

#### 🚀 Bulk Operations

Convert issues to sub-tasks, move issues in bulk, and track async operations:

```bash
/jira-convert-to-subtasks TC-1 TC-2 TC-3 TC-4
```

| Function | Purpose |
|----------|---------|
| `bulkMoveIssues(options)` | Move/convert issues in bulk (async) |
| `getBulkTaskStatus(taskId)` | Check bulk operation progress |
| `convertToSubtasks(issueKeys, parentKey, projectKey)` | Convert to sub-tasks |

#### 🎯 New Skills Architecture

The Jira plugin now uses Claude Code's Skills system for better organization:

- **Skill Definition** - `skills/jira/SKILL.md` with comprehensive documentation
- **Bundled Scripts** - `api.js`, `auth.js`, `formatters.js` in `skills/jira/scripts/`
- **Reference Docs** - JQL patterns and advanced query examples

#### 📦 Enhanced API (22 Functions)

New API functions for users and batch operations:

| Function | Purpose |
|----------|---------|
| `getCurrentUser()` | Get authenticated user |
| `searchUsers(query, maxResults)` | Search users by email/name |
| `assignIssue(issueKey, email)` | Assign with email-to-accountId conversion |
| `batchFetchIssues(issueIds)` | Parallel issue fetching (10 concurrent) |

#### ⚡ Improved Search Performance

- New `/search/jql` endpoint with batch fetch for full issue details
- Parallel fetching for better performance on large result sets

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

*"Bulk operations made easy, one corgi command at a time!"* 🐕✨

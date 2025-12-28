---
description: [--all] [--participating] [--repo=<owner/repo>] - List GitHub notifications
---

# List GitHub Notifications

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `listNotifications(options)` function
- Use `scripts/formatters.js` for `formatNotificationList()` function
- Handle filters: all (include read), participating, repo
- Display formatted table with notification type, repo, title, reason

## Example Usage

```
/gh-notifications
/gh-notifications --all
/gh-notifications --participating
/gh-notifications --repo=owner/repo
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--all` | Include read notifications | false (unread only) |
| `--participating` | Only direct participation | false |
| `--repo` | Filter by repository | All repos |

### Use Cases

- **Inbox** - Check pending notifications
- **Mentions** - Find where you've been mentioned
- **Repository** - Notifications for specific project
- **Review** - See pending review requests

## Output

```
## Your Notifications

| Type | Repository | Title | Reason | Updated |
|------|------------|-------|--------|---------|
| 🟢 Issue | owner/repo | Bug: Login fails | mention | 2h ago |
| 🔀 PR | org/project | Add new feature | review_requested | 5h ago |
| 📦 Release | lib/package | v2.0.0 Released | subscribed | 1d ago |
| 💬 Discussion | team/docs | API Design | team_mention | 2d ago |
```

## Notification Types

| Type | Icon | Description |
|------|------|-------------|
| Issue | 🟢 | Issue activity |
| PullRequest | 🔀 | PR activity |
| Release | 📦 | New release |
| Discussion | 💬 | Discussion activity |
| Commit | 📝 | Commit comments |

## Notification Reasons

| Reason | Description |
|--------|-------------|
| `assign` | You were assigned |
| `author` | You created the thread |
| `comment` | You commented |
| `mention` | You were @mentioned |
| `review_requested` | Review requested from you |
| `team_mention` | Your team was mentioned |
| `subscribed` | You're watching the repo |
| `state_change` | State changed on your issue/PR |

## Error Handling

| Error | Handling |
|-------|----------|
| Not authenticated | "Run `gh auth login` to authenticate" |
| No notifications | "No unread notifications" |
| Repo not found | "Repository not found" |

## Managing Notifications

**Mark as read:**
```javascript
await api.markNotificationRead(threadId);
```

**Mark all as read:**
```javascript
await api.markAllNotificationsRead();
// Or for specific repo:
await api.markAllNotificationsRead('owner/repo');
```

## Notes

- By default shows only unread notifications
- Use `--all` to include read notifications
- Use `--participating` for direct mentions/assignments
- Click through to GitHub for full context
- Notifications are updated in real-time

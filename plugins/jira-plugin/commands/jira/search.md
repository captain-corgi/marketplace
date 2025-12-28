---
description: <jqlQuery> [maxResults=<n>] - Search Jira issues with JQL
---

# Search Jira Issues with JQL

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `searchIssues(jql, maxResults)` function
- Use `scripts/formatters.js` for `formatIssueList()` function
- Parse JQL query (required) and optional maxResults (default 50)
- Display total count and formatted table

The jira skill contains comprehensive JQL reference including operators, functions, and common patterns.

## Example Usage

```
/jira-search "project = PROJ AND status = 'In Progress'"
/jira-search "assignee = currentUser() AND status != Done" maxResults=100
```

### Common Queries

| Query | Description |
|-------|-------------|
| `assignee = currentUser() AND status != Done` | Your active work |
| `project = PROJ AND sprint = openSprints()` | Issues in active sprints |
| `issuetype = Bug AND status = 'To Do' ORDER BY priority` | Untriaged bugs |
| `updated >= -7d ORDER BY updated DESC` | Recent activity |
| `status = 'In Progress' AND updated < -7d` | Stale issues |

### Use Cases

- **Find Your Work** - All issues assigned to you that aren't complete
- **Sprint Planning** - Backlog items in active sprints
- **Bug Triage** - Unresolved bugs sorted by priority
- **Code Review** - Issues awaiting review
- **Release Prep** - Incomplete work for a version

## Output

```
Found 23 issues

┌──────────┬─────────────────────────────┬─────────────┬──────────┬────────────┐
│ Key      │ Summary                     │ Status      │ Priority │ Assignee   │
├──────────┼─────────────────────────────┼─────────────┼──────────┼────────────┤
│ PROJ-123 │ Fix login bug               │ In Progress │ High     │ jane.doe   │
│ PROJ-124 │ Add dark mode               │ To Do       │ Medium   │           │
│ PROJ-125 │ Update documentation        │ In Review   │ Low      │ bob.smith  │
└──────────┴─────────────────────────────┴─────────────┴──────────┴────────────┘
```

## JQL Quick Reference

| Operator | Example |
|----------|---------|
| `=`, `!=` | `status = "In Progress"` |
| `>`, `<`, `>=`, `<=` | `priority > Medium` |
| `IN`, `NOT IN` | `status IN ("To Do", "In Progress")` |
| `AND`, `OR`, `NOT` | `project = PROJ AND priority = High` |
| `ORDER BY` | `ORDER BY created DESC` |

**Functions:** `currentUser()`, `openSprints()`, `closedSprints()`
**Relative dates:** `-7d`, `-2w`, `-1m`

## Error Handling

| Error | Handling |
|-------|----------|
| Invalid JQL syntax | Show JQL error with syntax correction suggestion |
| No results | "No issues found matching query" |

## Notes

- Use quotes for field values with spaces
- See jira skill for comprehensive JQL patterns
- See `references/jql-patterns.md` for advanced queries

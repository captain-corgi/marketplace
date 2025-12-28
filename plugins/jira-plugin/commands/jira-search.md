---
description: <jqlQuery> [maxResults=<n>] - Search Jira issues with JQL
---

# Search Jira Issues with JQL

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Extract the JQL query from the user's request
4. Optional: Extract maxResults (default 50)
5. Call `api.searchIssues(jql, maxResults)`
6. Format results using `formatters.formatIssueList(issues)`
7. Display total count and the formatted table

## Example Usage

### Basic Examples

```
/jira-search "project = PROJ AND status = 'In Progress'"
/jira-search "assignee = currentUser() AND status != Done" maxResults=100
```

### Real-World Workflows

**Find Your Active Work:**
```
/jira-search "assignee = currentUser() AND status != Done"
# Output: All issues assigned to you that aren't completed
```

**Sprint Planning:**
```
/jira-search "project = PROJ AND sprint = openSprints() AND status = 'To Do'"
# Output: Backlog items in active sprints ready to be picked up
```

**Bug Triage:**
```
/jira-search "project = PROJ AND issuetype = Bug AND status = 'To Do' ORDER BY priority DESC"
# Output: Untriaged bugs sorted by priority
```

**Release Readiness:**
```
/jira-search "fixVersion = '2.5.0' AND status != Done"
# Output: All incomplete work for version 2.5.0
```

**Code Review Queue:**
```
/jira-search "project = PROJ AND status = 'In Review' ORDER BY created"
# Output: Issues awaiting review in chronological order
```

**Stale Issues:**
```
/jira-search "project = PROJ AND status = 'In Progress' AND updated < -7d"
# Output: Issues marked as in-progress but not updated in 7+ days
```

**Epic Breakdown:**
```
/jira-search "'Epic Link' = PROJ-100"
# Output: All issues belonging to epic PROJ-100
```

**Recent Activity:**
```
/jira-search "project = PROJ AND updated >= -7d ORDER BY updated DESC"
# Output: All issues touched in the last 7 days
```

## Common JQL Examples

| Query | Description |
|-------|-------------|
| `project = PROJ` | All issues in a project |
| `status = "In Progress"` | Issues in progress |
| `assignee = currentUser()` | Issues assigned to you |
| `priority = High AND status != Done` | High priority unresolved issues |
| `sprint = openSprints()` | Issues in active sprints |
| `created >= -7d` | Issues created in the last 7 days |
| `reporter = currentUser()` | Issues you created |
| `issuetype in (Bug, Story)` | Multiple issue types |
| `component = "Backend"` | Issues in a component |
| `labels = urgent` | Issues with a specific label |

## JQL Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `=` | Equals | `status = "In Progress"` |
| `!=` | Not equals | `status != Done` |
| `>` / `<` | Greater/less than | `priority > Medium` |
| `>=` / `<=` | Greater/less or equal | `created >= -7d` |
| `IN` | In list | `status IN ("To Do", "In Progress")` |
| `NOT IN` | Not in list | `status NOT IN (Done, Cancelled)` |
| `AND` | Both conditions | `project = PROJ AND priority = High` |
| `OR` | Either condition | `status = "To Do" OR status = "In Progress"` |
| `NOT` | Negation | `NOT assignee = currentUser()` |
| `ORDER BY` | Sort results | `ORDER BY created DESC` |

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

## Tips

- Use quotes for field values with spaces: `status = "In Progress"`
- `currentUser()` is a handy function for "me"
- Use negative dates for relative time: `-7d` (7 days ago), `-2w` (2 weeks ago), `-1m` (1 month ago)
- Combine multiple conditions with AND/OR
- Use parentheses for complex queries: `(status = "To Do" OR status = "In Progress") AND assignee = currentUser()`

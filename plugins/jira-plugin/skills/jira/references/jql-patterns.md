# JQL Query Patterns Reference

This reference provides comprehensive JQL query patterns for advanced use cases. Use with the jira skill for Jira Cloud API integration.

## Basic Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `=` | Equals | `status = "In Progress"` |
| `!=` | Not equals | `status != Done` |
| `>`, `<` | Greater/less than | `priority > Medium` |
| `>=`, `<=` | Greater/less or equal | `created >= -7d` |
| `IN` | In list | `status IN ("To Do", "In Progress")` |
| `NOT IN` | Not in list | `status NOT IN (Done, Closed)` |
| `AND` | Both conditions | `project = PROJ AND priority = High` |
| `OR` | Either condition | `status = "To Do" OR status = Backlog` |
| `NOT` | Negation | `NOT assignee = currentUser()` |
| `ORDER BY` | Sort results | `ORDER BY created DESC` |

## Field References

| Field | Type | Examples |
|-------|------|----------|
| `project` | Text | `project = PROJ` |
| `status` | Text | `status = "In Progress"` |
| `priority` | Text | `priority IN (High, Critical)` |
| `assignee` | User | `assignee = currentUser()` |
| `reporter` | User | `reporter = currentUser()` |
| `issuetype` | Text | `issuetype IN (Bug, Story)` |
| `created` | Date | `created >= -7d` |
| `updated` | Date | `updated >= -2w` |
| `summary` | Text | `summary ~ "login"` |
| `description` | Text | `description ~ "authentication"` |

## JQL Functions

| Function | Description | Example |
|----------|-------------|---------|
| `currentUser()` | Current authenticated user | `assignee = currentUser()` |
| `openSprints()` | Active sprints | `sprint = openSprints()` |
| `closedSprints()` | Completed sprints | `sprint IN closedSprints()` |

## Date Queries

### Relative Dates
- `-7d` - 7 days ago
- `-2w` - 2 weeks ago
- `-1m` - 1 month ago
- `-1y` - 1 year ago

### Date Ranges
```sql
created >= -7d AND created <= -1d
updated >= -30d ORDER BY updated DESC
```

## Text Searches

### Contains (case-insensitive)
```sql
summary ~ "login"
description ~ "authentication error"
```

### Exact match
```sql
summary = "Fix login bug"
```

## Advanced Patterns

### Issues Assigned to Me in Active Sprints
```sql
assignee = currentUser() AND sprint = openSprints()
```

### Bugs Created in Last Week with High Priority
```sql
issuetype = Bug AND created >= -7d AND priority IN (High, Critical) ORDER BY created DESC
```

### Issues in Project with Specific Labels
```sql
project = PROJ AND labels IN (urgent, frontend)
```

### Epic with All Sub-tasks
```sql
"Epic Link" = PROJ-100 OR key = PROJ-100
```

### Stale Issues (In Progress but No Updates)
```sql
status = "In Progress" AND updated < -7d
```

### Unassigned High Priority Issues
```sql
assignee is EMPTY AND priority IN (High, Critical)
```

### Issues in Multiple Statuses
```sql
status IN ("To Do", "In Progress") AND project = PROJ
```

### Issues with No Fix Version
```sql
fixVersion is EMPTY AND project = PROJ
```

## Ordering Results

```sql
ORDER BY priority DESC
ORDER BY created ASC
ORDER BY updated DESC, priority ASC
```

## Common Queries by Use Case

### Sprint Planning
```sql
project = PROJ AND sprint = openSprints() AND status = "To Do" ORDER BY priority
```

### Bug Triage
```sql
project = PROJ AND issuetype = Bug AND status = "To Do" ORDER BY priority DESC
```

### Release Preparation
```sql
fixVersion = "2.5.0" AND status != Done ORDER BY issuetype, priority
```

### Code Review Queue
```sql
status = "In Review" ORDER BY created ASC
```

### Documentation Updates
```sql
component = Documentation AND status != Done ORDER BY priority
```

### My Active Work
```sql
assignee = currentUser() AND status != Done ORDER BY priority DESC
```

### Yesterday's Activity
```sql
updated >= -1d AND updated <= -0d ORDER BY updated DESC
```

### Epic Breakdown
```sql
"Epic Link" = PROJ-100 OR key = PROJ-100 ORDER BY rank
```

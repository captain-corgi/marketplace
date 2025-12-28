---
description: List all accessible Jira projects
---

# List Jira Projects

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/api.js` for `getProjects()` function
- Use `scripts/formatters.js` for `formatProjectList()` function
- Handle empty results with "No projects found" message
- Display connection errors with guidance to run `/jira-status`

## Example Usage

```
/jira-projects
```

### Use Cases

- **Find Project Key** - Look up project keys for issue creation
- **Explore Projects** - See all accessible projects
- **New Team Onboarding** - Help new members understand project structure
- **Verify Access** - Confirm access before creating issues

## Output

```
┌──────────┬─────────────────────┬───────────┬──────────────────┐
│ Key      │ Name                │ Type      │ Lead             │
├──────────┼─────────────────────┼───────────┼──────────────────┤
│ WEB      │ Web Application     │ Software  │ jane.smith       │
│ API      │ API Development     │ Software  │ john.doe         │
│ MOBL     │ Mobile App          │ Software  │ sara.jones       │
│ INFRA    │ Infrastructure      │ Software  │ mike.wilson      │
│ OPS      │ Operations          │ Business  │ ops.team         │
└──────────┴─────────────────────┴───────────┴──────────────────┘
```

## Error Scenarios

| Error | Handling |
|-------|----------|
| No projects | "You don't have access to any projects" |
| Connection error | "Unable to connect to Jira. Check your configuration with /jira-status" |

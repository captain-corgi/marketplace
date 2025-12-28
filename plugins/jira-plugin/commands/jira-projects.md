---
description: List all accessible Jira projects
---

# List Jira Projects

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Load formatters from `${CLAUDE_PLUGIN_ROOT}/lib/formatters.js`
3. Call `api.getProjects()`
4. Format using `formatters.formatProjectList(projects)`
5. Display the results

## Example Usage

### Basic Examples

```
/jira-projects
```

### Real-World Workflows

**Find Project Key for Issue Creation:**
```
/jira-projects
# Use case: Look up project keys to use with /jira-create-issue
```

**Explore Available Projects:**
```
/jira-projects
# Use case: See all projects you have access to
```

**New Team Member Onboarding:**
```
/jira-projects
# Use case: Help new team members understand the project structure
```

**Project Verification:**
```
/jira-projects
# Use case: Verify you have access to a specific project before creating issues
```

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

**No Projects Available:**
```
You don't have access to any projects
```

**Connection Error:**
```
Error: Unable to connect to Jira. Check your configuration with /jira-status
```

## Notes

- Only projects you have permission to view will be listed
- Project keys are needed for creating issues
- Project types vary: Software, Business, Service Desk, etc.
- Use project keys with `/jira-create-issue`, `/jira-search`
- The lead is the project lead/owner in Jira
- Projects are ordered by name alphabetically

---
description: project=<key> summary="<text>" issuetype=<type> [priority=<level>] [assignee=<email>] [description="<text>"] - Create a Jira issue
---

# Create a Jira Issue

## Instructions

1. **Load the API client** from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`

2. **Parse the user's request** to extract these parameters:
   - `project` (required): Project key (e.g., PROJ)
   - `summary` (required): Issue summary/title
   - `issuetype` (required): Issue type name (Bug, Story, Task, etc.)
   - `description` (optional): Issue description
   - `priority` (optional): Priority name
   - `assignee` (optional): Assignee email or accountId

3. **Build the issue fields object**:
   ```javascript
   const fields = {
     project: { key: projectKey },
     summary: summary,
     issuetype: { name: issueType }
   };
   // Add optional fields if provided
   if (description) fields.description = description;
   if (priority) fields.priority = { name: priority };
   if (assignee) fields.assignee = { name: assignee };
   ```

4. **Call `api.createIssue(fields)`**

5. **Format and display the result** showing:
   - Issue key
   - Summary
   - URL to view in Jira
   - Any errors encountered

## Example Usage

### Basic Examples

```
/jira-create-issue project=PROJ summary="Fix login bug" issuetype=Bug priority=High
```

### Real-World Workflows

**Create a Bug Report:**
```
/jira-create-issue project=WEB summary="Login fails after password reset" issuetype=Bug priority=High description="Users report being unable to login after completing password reset flow. Error: 'Invalid credentials'" assignee=jane.doe@example.com
```

**Create a User Story:**
```
/jira-create-issue project=API summary="As a developer, I want to batch API calls for better performance" issuetype=Story priority=Medium description="Implement batch endpoint to reduce API call overhead. Target: Support up to 100 requests per batch."
```

**Create a Technical Task:**
```
/jira-create-issue project=INFRA summary="Upgrade Redis to v7.2" issuetype=Task priority=Low description="Plan and execute Redis upgrade. Include migration steps and rollback plan."
```

**Create with Description Only:**
```
/jira-create-issue project=MOBL summary="Add dark mode support" issuetype=Story description="Implement system-wide dark mode following iOS design guidelines. Settings toggle should persist across app restarts."
```

**Quick Bug Entry:**
```
/jira-create-issue project=PROJ summary="Typo on homepage header" issuetype=Bug priority=Trivial
```

**Spike/Research Task:**
```
/jira-create-issue project=PROJ summary="Research WebSocket alternatives" issuetype=Spike priority=Medium description="Evaluate SSE, MQTT, and WebRTC for real-time features. Compare based on: scalability, browser support, and implementation complexity."
```

## Output

```
✓ Issue Created
Key: PROJ-456
Summary: Fix login bug
URL: https://your-domain.atlassian.net/browse/PROJ-456
```

## Error Scenarios

**Missing Required Fields:**
```
Error: 'project', 'summary', and 'issuetype' are required
```

**Invalid Project Key:**
```
Error: Project 'INVALID' does not exist
```

**Invalid Issue Type:**
```
Error: Issue type 'Epic' does not exist in project PROJ. Available types: Bug, Story, Task, Sub-task
```

**Missing Permissions:**
```
Error: You don't have permission to create issues in this project
```

## Available Issue Types

Common issue types vary by project configuration:
- **Bug** - Defect or flaw in the code
- **Story** - User-facing functionality
- **Task** - Technical work item
- **Epic** - Large body of work (may not be available)
- **Sub-task** - Child of another issue
- **Spike** - Research or investigation task

## Notes

- Use `/jira-projects` to find valid project keys
- Use quotes for summary and description values containing spaces
- Priority names are case-insensitive but must match your Jira configuration
- Assignee can be email address or username (depends on Jira configuration)
- The issue will be created in the default status for that issue type

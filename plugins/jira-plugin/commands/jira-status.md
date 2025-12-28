---
description: Verify Jira configuration and test API connectivity
---

# Test Jira Connection

## Instructions

1. Load the auth module from `${CLAUDE_PLUGIN_ROOT}/lib/auth.js`
2. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
3. Call `auth.validateConfig()` and display results
4. If valid, call `api.getProjects()` to test connectivity
5. Display:
   - Jira URL
   - Configured email
   - Connection status
   - First few accessible projects (as verification)

## Example Usage

### Basic Examples

```
/jira-status
```

### Real-World Workflows

**Initial Setup Verification:**
```
/jira-status
# Use case: Verify your Jira configuration after setting up environment variables
```

**Troubleshooting Connection Issues:**
```
/jira-status
# Use case: Diagnose why commands aren't working
```

**Before Starting Work:**
```
/jira-status
# Use case: Quick check that everything is configured and working
```

**After API Key Rotation:**
```
/jira-status
# Use case: Verify new API key is working correctly
```

## Output

```
Jira Configuration Status
=========================

Jira URL: https://your-domain.atlassian.net
Email: your-email@example.com
API Key: ✓ Set (length: 24 chars)
Connection: ✓ Successful

API Version: 3.0.0
Server Time: 2025-01-15T10:30:00Z

Accessible Projects (showing first 5):
• PROJ - Project Alpha (Software)
• DEV - Development Team (Software)
• OPS - Operations (Business)
• QA - Quality Assurance (Software)
• DOC - Documentation (Software)

Total accessible: 12 projects
```

## Error Scenarios

**Missing Environment Variables:**
```
Error: Jira configuration is incomplete
Missing: JIRA_URL, JIRA_EMAIL, JIRA_API_KEY

Please set the following environment variables:
• JIRA_URL - Your Jira instance URL (e.g., https://your-domain.atlassian.net)
• JIRA_EMAIL - Your Jira account email
• JIRA_API_KEY - Your Jira API token (create at https://id.atlassian.com/manage-profile/security/api-tokens)
```

**Invalid API Key:**
```
Error: Authentication failed
Status: 401 Unauthorized

Please check:
• Email address is correct
• API token is valid and not expired
• API token was generated correctly at https://id.atlassian.com/manage-profile/security/api-tokens
```

**Connection Failed:**
```
Error: Unable to connect to Jira
Message: getaddrinfo ENOTFOUND your-domain.atlassian.net

Please check:
• JIRA_URL is correct and accessible
• Network connectivity is working
• Firewall/proxy settings allow access to Jira
• VPN is connected if required
```

**Wrong URL Format:**
```
Error: Invalid Jira URL format
Expected: https://your-domain.atlassian.net
Got: your-domain.atlassian.net

Please include the protocol (https://)
```

## Notes

- Use this command to verify your Jira setup is working
- Run this first if you encounter errors with other Jira commands
- Environment variables should be set in your shell profile (.bashrc, .zshrc, etc.)
- API tokens can be created at https://id.atlassian.com/manage-profile/security/api-tokens
- Only shows first 5 projects by default to avoid overwhelming output
- A successful connection confirms your credentials and network access are working

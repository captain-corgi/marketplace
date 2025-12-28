---
description: Verify Jira configuration and test API connectivity
---

# Test Jira Connection

This command uses the **jira skill** for Jira Cloud API integration.

## Implementation

The jira skill provides all necessary functionality:
- Use `scripts/auth.js` for `validateConfig()` function
- Use `scripts/api.js` for `getProjects()` to test connectivity
- Display configuration status, connection result, and sample projects
- Handle missing variables, invalid API key, and connection errors

## Example Usage

```
/jira-status
```

### Use Cases

- **Initial Setup** - Verify configuration after setting environment variables
- **Troubleshooting** - Diagnose why commands aren't working
- **Quick Check** - Verify everything is configured and working
- **After Key Rotation** - Confirm new API key is working

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

## Error Handling

| Error | Handling |
|-------|----------|
| Missing env vars | List missing variables and setup instructions |
| Invalid API key (401) | Guide to check email and token at id.atlassian.com |
| Connection failed | Suggest checking URL, network, firewall, VPN |
| Invalid URL format | Show expected format with https:// protocol |

## Notes

- Run this first if other commands fail
- Environment variables: JIRA_URL, JIRA_EMAIL, JIRA_API_KEY
- Create API tokens at https://id.atlassian.com/manage-profile/security/api-tokens

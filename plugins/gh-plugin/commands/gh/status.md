---
description: Test GitHub CLI connection and show authentication status
---

# Check GitHub CLI Status

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/auth.js` for `validateConfig()` function
- Use `scripts/formatters.js` for `formatAuthStatus()` function
- Check if gh CLI is installed and authenticated
- Display connection status, account info, and version

## Example Usage

```
/gh-status
```

### Use Cases

- **Verify Setup** - Check if gh CLI is configured correctly
- **Troubleshoot** - Diagnose authentication issues
- **Account Info** - See which account is connected
- **Quick Check** - Verify connection before operations

## Output (Connected)

```
## ✅ GitHub CLI Status

**Status**: Connected
**Version**: 2.40.0
**Account**: @yourusername
**Host**: github.com
```

## Output (Not Connected)

```
## ❌ GitHub CLI Status

**Status**: Not configured

**Issues**:
- GitHub CLI (gh) is not installed

**Setup Instructions**:
1. Install GitHub CLI: https://cli.github.com/
2. Run: `gh auth login`
```

## Output (Not Authenticated)

```
## ❌ GitHub CLI Status

**Status**: Not configured

**Issues**:
- Not authenticated with GitHub CLI. Run: gh auth login

**Setup Instructions**:
1. Install GitHub CLI: https://cli.github.com/
2. Run: `gh auth login`
```

## Setup Instructions

### 1. Install GitHub CLI

**macOS:**
```bash
brew install gh
```

**Windows:**
```bash
winget install GitHub.cli
# or
choco install gh
```

**Linux:**
```bash
# Debian/Ubuntu
sudo apt install gh

# Fedora
sudo dnf install gh
```

### 2. Authenticate

```bash
gh auth login
```

Follow the prompts to:
1. Select GitHub.com or Enterprise
2. Choose authentication method (browser or token)
3. Authorize the application

### 3. Verify

```bash
gh auth status
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `gh` not found | Install gh CLI |
| Not logged in | Run `gh auth login` |
| Token expired | Run `gh auth refresh` |
| Wrong account | Run `gh auth logout` then `gh auth login` |

## Checking Permissions

GitHub CLI uses your authentication to access:
- Public repositories (always)
- Private repositories (if authorized)
- Organization repositories (based on membership)

Check your token scopes:
```bash
gh auth status -t
```

## Notes

- GitHub CLI stores credentials securely
- No environment variables needed
- Supports multiple accounts
- Works with GitHub Enterprise Server

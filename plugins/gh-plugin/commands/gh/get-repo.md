---
description: <owner/repo> - Get GitHub repository details
---

# Get Repository Details

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `getRepo(repo)` function
- Use `scripts/formatters.js` for `formatRepoDetail()` function
- Parse repository in "owner/repo" format (required)
- Display full repository details with stats, features, and links

## Example Usage

```
/gh-get-repo microsoft/vscode
/gh-get-repo facebook/react
/gh-get-repo torvalds/linux
```

### Use Cases

- **Project Overview** - Get comprehensive repo information
- **Check Stats** - View stars, forks, and watchers
- **Feature Check** - See if issues/wiki/projects are enabled
- **Activity Check** - See last push and creation dates

## Output

```
## microsoft/vscode

**Visibility**: 🌐 Public
**Description**: Visual Studio Code

**Statistics**:
- ⭐ Stars: 156K
- 🍴 Forks: 27.4K
- 👀 Watchers: 3.2K

**Details**:
- Primary Language: TypeScript
- License: MIT License
- Default Branch: main
- Created: Sep 3, 2015
- Last Push: Dec 28, 2024

**Features**:
- Issues: ✅
- Wiki: ✅
- Projects: ✅

**URL**: https://github.com/microsoft/vscode
```

## Error Handling

| Error | Handling |
|-------|----------|
| Missing repo | "Repository must be in 'owner/repo' format" |
| Not found | "Repository not found - check the name" |
| No access | "You don't have access to this repository" |

## Notes

- Repository must be in "owner/repo" format
- Private repos require appropriate access
- Archived repos are marked in the output
- Forks show the original repository

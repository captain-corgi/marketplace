---
description: <name> [--description="<text>"] [--visibility=<type>] [--gitignore=<template>] [--license=<type>] - Create a new GitHub repository
---

# Create a GitHub Repository

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `createRepo(name, options)` function
- Use `scripts/formatters.js` for `formatRepoDetail()` function
- Parse name (required) - can be just name or org/name
- Handle options: description, visibility (default: private), gitignore, license
- Display created repository details

## Example Usage

```
/gh-create-repo my-new-project
/gh-create-repo my-app --visibility=public --description="My awesome app"
/gh-create-repo myorg/api-service --visibility=private --license=mit
/gh-create-repo cli-tool --gitignore=Node --license=apache-2.0
```

### Options

| Option | Values | Default |
|--------|--------|---------|
| `--visibility` | public, private, internal | private |
| `--description` | Any text | None |
| `--gitignore` | Node, Python, Go, Java, etc. | None |
| `--license` | mit, apache-2.0, gpl-3.0, etc. | None |

### Use Cases

- **New Project** - Initialize a new repository
- **Organization Repo** - Create repo in an organization
- **With Template** - Start with gitignore and license
- **Private Project** - Create private repository

## Output

```
✓ Repository Created

## username/my-new-project

**Visibility**: 🔒 Private
**Description**: My awesome app

**Statistics**:
- ⭐ Stars: 0
- 🍴 Forks: 0
- 👀 Watchers: 1

**Details**:
- License: MIT License
- Default Branch: main
- Created: Dec 28, 2024

**URL**: https://github.com/username/my-new-project
```

## Error Handling

| Error | Handling |
|-------|----------|
| Name taken | "Repository name already exists" |
| Invalid name | "Repository name contains invalid characters" |
| No permission | "You don't have permission to create repos in this org" |

## Common Gitignore Templates

Node, Python, Go, Java, Rust, Ruby, C++, Swift, Kotlin, VisualStudio, JetBrains

## Common Licenses

mit, apache-2.0, gpl-3.0, bsd-3-clause, unlicense, mpl-2.0

## Notes

- Names can only contain alphanumeric characters, hyphens, and underscores
- For organization repos, use "org/repo-name" format
- Repository is created empty - clone and add files

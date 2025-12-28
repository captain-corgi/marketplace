---
description: <owner/repo> [--org=<name>] [--name=<name>] - Fork a GitHub repository
---

# Fork a GitHub Repository

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `forkRepo(repo, options)` function
- Use `scripts/formatters.js` for `formatRepoDetail()` function
- Parse source repository in "owner/repo" format (required)
- Handle options: org (fork to organization), name (custom fork name)
- Display forked repository details

## Example Usage

```
/gh-fork facebook/react
/gh-fork microsoft/vscode --org=mycompany
/gh-fork torvalds/linux --name=my-linux-fork
```

### Options

| Option | Description |
|--------|-------------|
| `--org` | Fork to an organization instead of your account |
| `--name` | Custom name for the forked repository |

### Use Cases

- **Contribute** - Fork a repo to submit pull requests
- **Customize** - Fork to make your own modifications
- **Organization** - Fork to organization for team use
- **Experiment** - Fork to experiment without affecting original

## Output

```
✓ Repository Forked

## username/react (Fork)

**Visibility**: 🌐 Public
**Description**: A declarative, efficient, and flexible JavaScript library...

**Statistics**:
- ⭐ Stars: 0
- 🍴 Forks: 0
- 👀 Watchers: 1

**Forked From**: facebook/react

**URL**: https://github.com/username/react
```

## Error Handling

| Error | Handling |
|-------|----------|
| Already forked | "You already have a fork of this repository" |
| Not found | "Repository not found - check the name" |
| No permission | "You don't have permission to fork to this org" |
| Private repo | "Cannot fork a private repository you don't have access to" |

## Workflow

1. Fork the repository
2. Clone your fork: `git clone https://github.com/you/repo`
3. Add upstream: `git remote add upstream https://github.com/original/repo`
4. Create branch: `git checkout -b my-feature`
5. Make changes and commit
6. Push to your fork: `git push origin my-feature`
7. Create pull request to original repo

## Notes

- Forks retain the same visibility as the original (public stays public)
- You can sync your fork with the upstream repository
- Forking is different from cloning - fork creates a GitHub copy
- Stars and watchers don't carry over to forks

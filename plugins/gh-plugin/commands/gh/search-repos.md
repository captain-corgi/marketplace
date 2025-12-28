---
description: <query> [--limit=<n>] [--sort=<field>] - Search GitHub repositories
---

# Search GitHub Repositories

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `searchRepos(query, options)` function
- Use `scripts/formatters.js` for `formatRepoList()` function
- Parse search query (required)
- Handle optional: limit (default 30), sort (stars/forks/updated), order (asc/desc)
- Display formatted table with search results

## Example Usage

```
/gh-search-repos "react hooks"
/gh-search-repos "language:typescript stars:>1000"
/gh-search-repos "topic:api org:microsoft" --limit=20 --sort=stars
```

### Search Qualifiers

| Qualifier | Example | Description |
|-----------|---------|-------------|
| `language:` | `language:python` | Primary language |
| `stars:` | `stars:>100` | Star count |
| `forks:` | `forks:>=50` | Fork count |
| `topic:` | `topic:cli` | Repository topic |
| `user:` | `user:torvalds` | Owner username |
| `org:` | `org:github` | Organization |
| `pushed:` | `pushed:>2024-01-01` | Last push date |

### Use Cases

- **Find Libraries** - Search for packages by keyword
- **Popular Repos** - Find highly-starred repositories
- **Recent Activity** - Find actively maintained projects
- **Language Filter** - Find repos in specific languages

## Output

```
Found 156 repositories

| Repository | Description | Stars | Forks | Language |
|------------|-------------|-------|-------|----------|
| facebook/react | A declarative UI library... | ⭐220K | 🍴45K | JavaScript |
| vercel/next.js | The React Framework | ⭐118K | 🍴25K | JavaScript |
| vuejs/vue | Progressive JavaScript... | ⭐205K | 🍴33K | TypeScript |
```

## Error Handling

| Error | Handling |
|-------|----------|
| Empty query | "Search query is required" |
| Invalid qualifier | "Invalid search qualifier - check syntax" |
| No results | "No repositories found matching query" |

## Notes

- Combine multiple qualifiers with spaces (AND)
- Use quotes for multi-word values
- See gh skill for comprehensive search patterns
- Results limited to 1000 by GitHub API

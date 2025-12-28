---
description: [owner] [--limit=<n>] [--visibility=<type>] - List GitHub repositories
---

# List GitHub Repositories

This command uses the **gh skill** for GitHub CLI integration.

## Implementation

The gh skill provides all necessary functionality:
- Use `scripts/api.js` for `listRepos(owner, options)` function
- Use `scripts/formatters.js` for `formatRepoList()` function
- Parse optional owner (defaults to authenticated user)
- Handle optional filters: limit (default 30), visibility (public/private/internal)
- Display formatted table with repo name, description, stars, forks, language

## Example Usage

```
/gh-repos
/gh-repos microsoft
/gh-repos microsoft --limit=50
/gh-repos --visibility=private
```

### Use Cases

- **View Your Repos** - List your own repositories
- **Explore Org Repos** - Browse an organization's repositories
- **Filter Private** - Show only private repositories
- **Quick Overview** - Get a snapshot of repository activity

## Output

```
| Repository | Description | Stars | Forks | Language |
|------------|-------------|-------|-------|----------|
| 🔒user/private-repo | My private project | ⭐0 | 🍴0 | TypeScript |
| user/public-repo | A public utility library | ⭐125 | 🍴23 | JavaScript |
| user/another-repo | Documentation site | ⭐45 | 🍴12 | MDX |
```

## Error Handling

| Error | Handling |
|-------|----------|
| Not authenticated | "Run `gh auth login` to authenticate" |
| User not found | "User or organization not found" |
| Rate limited | "API rate limit exceeded. Try again later" |

## Notes

- Without an owner, lists your own repositories
- Results are sorted by last push date by default
- Private repos show 🔒 icon
- Use `/gh-search-repos` for more advanced filtering

# GitHub CLI Patterns Reference

## Search Query Syntax

GitHub search uses qualifiers to filter results. Combine multiple qualifiers for precise searches.

### Repository Search Qualifiers

| Qualifier | Example | Description |
|-----------|---------|-------------|
| `user:` | `user:microsoft` | Repos owned by user/org |
| `org:` | `org:github` | Repos in organization |
| `language:` | `language:typescript` | Primary language |
| `topic:` | `topic:api` | Repository topic |
| `stars:` | `stars:>1000` | Star count |
| `forks:` | `forks:>=100` | Fork count |
| `size:` | `size:>5000` | Size in KB |
| `pushed:` | `pushed:>2024-01-01` | Last push date |
| `created:` | `created:>=2023-01-01` | Creation date |
| `archived:` | `archived:false` | Archive status |
| `is:` | `is:public` | public/private |
| `license:` | `license:mit` | License type |

**Examples:**

```bash
# Popular TypeScript repos updated recently
gh search repos "language:typescript stars:>500 pushed:>2024-01-01" --limit 20

# Microsoft repos with API topic
gh search repos "org:microsoft topic:api" --sort stars

# Large active repos
gh search repos "size:>10000 pushed:>2024-06-01 stars:>100"
```

### Issue Search Qualifiers

| Qualifier | Example | Description |
|-----------|---------|-------------|
| `repo:` | `repo:owner/repo` | Specific repo |
| `is:` | `is:open` | open/closed |
| `is:` | `is:issue` | issue/pr |
| `author:` | `author:username` | Created by |
| `assignee:` | `assignee:username` | Assigned to |
| `mentions:` | `mentions:username` | Mentions user |
| `label:` | `label:bug` | Has label |
| `milestone:` | `milestone:"v1.0"` | In milestone |
| `created:` | `created:>2024-01-01` | Creation date |
| `updated:` | `updated:>2024-06-01` | Last update |
| `closed:` | `closed:>2024-01-01` | Close date |
| `no:` | `no:label` | Missing: label/assignee/milestone |
| `comments:` | `comments:>10` | Comment count |

**Examples:**

```bash
# Open bugs without assignee
gh search issues "repo:owner/repo is:open is:issue label:bug no:assignee"

# Your assigned open issues
gh search issues "assignee:@me is:open is:issue"

# High activity issues
gh search issues "repo:owner/repo comments:>20 is:open"

# Stale issues (no updates in 30 days)
gh search issues "repo:owner/repo is:open updated:<2024-06-01"
```

### Pull Request Search Qualifiers

| Qualifier | Example | Description |
|-----------|---------|-------------|
| `is:` | `is:pr` | Pull request |
| `is:` | `is:merged` | merged/unmerged |
| `is:` | `is:draft` | Draft PRs |
| `review:` | `review:required` | Needs review |
| `review:` | `review:approved` | Has approval |
| `reviewed-by:` | `reviewed-by:user` | Reviewed by |
| `review-requested:` | `review-requested:user` | Review requested |
| `base:` | `base:main` | Target branch |
| `head:` | `head:feature` | Source branch |
| `merged:` | `merged:>2024-01-01` | Merge date |

**Examples:**

```bash
# PRs needing review
gh search prs "repo:owner/repo is:open review:required"

# Your PRs awaiting review
gh search prs "author:@me is:open review:required"

# Recently merged PRs
gh search prs "repo:owner/repo is:merged merged:>2024-06-01"

# Draft PRs
gh search prs "repo:owner/repo is:open is:draft"
```

## Common Workflows

### Issue Triage Workflow

```bash
# Find unassigned bugs
gh issue list -R owner/repo --label bug --assignee "" --state open

# Find issues without labels
gh search issues "repo:owner/repo is:open no:label"

# Assign and label an issue
gh issue edit 123 -R owner/repo --add-label "bug,priority:high" --add-assignee developer
```

### PR Review Workflow

```bash
# List PRs needing your review
gh search prs "review-requested:@me is:open"

# Check PR status
gh pr view 456 -R owner/repo

# Approve PR
gh pr review 456 -R owner/repo --approve --body "LGTM!"

# Request changes
gh pr review 456 -R owner/repo --request-changes --body "Please fix the tests"
```

### Release Workflow

```bash
# Find issues fixed since last release
gh search issues "repo:owner/repo is:closed closed:>2024-06-01"

# Find merged PRs since last release
gh search prs "repo:owner/repo is:merged merged:>2024-06-01"

# Create release branch
gh api repos/owner/repo/git/refs -f ref="refs/heads/release/v1.2.0" -f sha="$(gh api repos/owner/repo/commits/main --jq '.sha')"
```

### CI/CD Workflow

```bash
# Check latest workflow runs
gh run list -R owner/repo --limit 10

# Get failed runs
gh run list -R owner/repo --status failure

# Re-run failed workflow
gh run rerun 12345 -R owner/repo

# Trigger deployment
gh workflow run deploy.yml -R owner/repo --ref main -f environment=production
```

## JSON Output Patterns

GitHub CLI supports `--json` flag for structured output. Use `--jq` for filtering.

### Useful JSON Queries

```bash
# Get repo stats
gh repo view owner/repo --json stargazerCount,forkCount,watchers

# Get issue titles and numbers
gh issue list -R owner/repo --json number,title --jq '.[] | "\(.number): \(.title)"'

# Get PR review status
gh pr view 123 -R owner/repo --json reviewDecision,reviews

# Get workflow run conclusion
gh run view 12345 -R owner/repo --json conclusion,jobs

# Get branch protection
gh api repos/owner/repo/branches/main/protection
```

### Batch Operations

```bash
# Close all issues with specific label
gh issue list -R owner/repo --label "wontfix" --json number --jq '.[].number' | \
  xargs -I {} gh issue close {} -R owner/repo

# Request review from team on all draft PRs
gh pr list -R owner/repo --draft --json number --jq '.[].number' | \
  xargs -I {} gh pr ready {} -R owner/repo
```

## Date Formats

GitHub supports these date formats in searches:

| Format | Example | Description |
|--------|---------|-------------|
| `YYYY-MM-DD` | `2024-06-15` | Specific date |
| `>YYYY-MM-DD` | `>2024-01-01` | After date |
| `<YYYY-MM-DD` | `<2024-06-01` | Before date |
| `>=YYYY-MM-DD` | `>=2024-01-01` | On or after |
| `<=YYYY-MM-DD` | `<=2024-06-01` | On or before |
| `YYYY-MM-DD..YYYY-MM-DD` | `2024-01-01..2024-06-01` | Date range |

## API Rate Limits

GitHub API has rate limits:

- **Authenticated**: 5,000 requests/hour
- **Search API**: 30 requests/minute
- **GraphQL**: 5,000 points/hour

Check your rate limit:
```bash
gh api rate_limit --jq '.resources.core'
```

## Tips

1. Use `@me` as shorthand for your username
2. Combine qualifiers with `AND` (space) or `OR`
3. Negate with `-` prefix: `-label:bug`
4. Use quotes for multi-word values: `label:"good first issue"`
5. Sort results: `--sort stars --order desc`

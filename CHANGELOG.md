# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-12-28

### Added

#### Jira Plugin 2.0.0 - Major Upgrade

**New Skills Architecture:**
- Introduced `skills/jira/SKILL.md` - Comprehensive skill definition for Claude Code
- Bundled scripts in `skills/jira/scripts/` for direct API access
- Progressive disclosure with `references/jql-patterns.md`

**Bulk Operations (NEW):**
- `/jira-convert-to-subtasks` - Convert issues to sub-tasks of a parent
- `bulkMoveIssues(options)` - Bulk move/convert issues (async)
- `getBulkTaskStatus(taskId)` - Check async operation progress
- `convertToSubtasks(issueKeys, parentKey, projectKey)` - Convert to sub-tasks

**Enhanced API Functions (22 total):**
- `batchFetchIssues(issueIds, concurrency)` - Parallel issue fetching
- `getCurrentUser()` - Get authenticated user
- `searchUsers(query, maxResults)` - Search users by email/name
- `assignIssue(issueKey, emailOrAccount)` - Assign with email-to-accountId conversion

**Improved Search:**
- Uses new `/search/jql` endpoint with batch fetch for full issue details
- Better performance with parallel fetching (max 10 concurrent)

### Changed

- Jira plugin version bumped to 2.0.0 (major feature additions)
- Reorganized Jira scripts from `lib/` to `skills/jira/scripts/`
- Enhanced error handling with HTTP status documentation
- Updated CLAUDE.md with complete API function reference

## [1.1.0] - 2025-12-27

### Added

#### Jira Plugin

- **New plugin: jira-plugin** - Full-featured Jira Cloud integration
- **15 slash commands** for comprehensive Jira management:
  - `/jira-create-issue` - Create new Jira issues
  - `/jira-get-issue` - Retrieve issue details
  - `/jira-edit-issue` - Edit existing issues
  - `/jira-search` - Search with JQL queries
  - `/jira-transition` - Transition issue status
  - `/jira-comment` - Add comments to issues
  - `/jira-get-comments` - Retrieve issue comments
  - `/jira-boards` - List all boards (Scrum/Kanban)
  - `/jira-sprints` - List sprints for a board
  - `/jira-create-sprint` - Create new sprints
  - `/jira-sprint-issues` - Get issues in a sprint
  - `/jira-move-to-sprint` - Move issues to sprint
  - `/jira-projects` - List all projects
  - `/jira-status` - Test connection and verify config
- **Jira Agent** - Specialized agent for Jira workflows
- Pure JavaScript implementation with no external dependencies
- Environment variable configuration (JIRA_URL, JIRA_EMAIL, JIRA_API_KEY)

#### Documentation

- Updated CLAUDE.md with jira-plugin architecture and commands
- Added jira-plugin README with setup instructions

### Changed

- Marketplace metadata now includes "development" category
- Updated project overview to reflect multi-plugin marketplace

## [1.0.0] - 2024-12-20

### Added

#### Marketplace

- Initial release of **corgi-hub-plugins** marketplace
- Marketplace catalog with plugin discovery and categorization
- Support for greeting, productivity, education, and development categories

#### Greeting Plugin - The Corgi Greeting Team

**Agents**

- **Captain Corgi** - Team leader providing formal, professional greetings
- **Cheerful Charlie** - Enthusiasm expert for casual greetings and celebrations
- **Cozy Cinnamon** - Comfort specialist for supportive, encouraging messages
- **Code Corgi** - Developer buddy with programming puns and dev greetings

**Commands**

- `/greet` - Get a greeting from a random corgi
- `/welcome` - Formal welcome from Captain Corgi
- `/farewell` - Cheerful goodbye from Cheerful Charlie
- `/motivate` - Encouragement from Cozy Cinnamon
- `/celebrate` - Team celebration for achievements
- `/corgi-team` - Meet all the corgis

**Hooks**

- `PreToolUse` - Code Corgi encouragement before file edits
- `PostToolUse` - Cheerful Charlie celebration after successful saves
- `Notification` - Team presence for all notifications

**MCP Server**

Tools:
- `get_greeting` - Get customized greeting by mood/occasion
- `get_random_corgi` - Get random team member info
- `add_custom_greeting` - Store your own greetings
- `get_greeting_stats` - View usage statistics
- `get_programming_pun` - Get a random programming joke

Resources:
- `corgi://team` - Team member information
- `corgi://greetings/today` - Today's greeting history
- `corgi://greetings/custom` - Your custom greetings

**LSP Server (Reference Implementation)**

- Completions for greeting phrase suggestions in comments
- Hover information with corgi wisdom on keywords
- Diagnostics with hints for friendlier comment wording

---

[1.0.0]: https://github.com/captain-corgi/corgi-hub-plugins/releases/tag/v1.0.0

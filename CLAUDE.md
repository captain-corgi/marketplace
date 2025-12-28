# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Corgi Hub Plugins is a reference implementation for Claude Code plugin development, featuring a marketplace catalog and two flagship plugins:

1. **greeting-plugin** - Demonstrates all plugin capabilities: agents, slash commands, hooks, MCP servers, and LSP servers. Centers around the **Corgi Greeting Team** - four AI agents with distinct personalities.
2. **jira-plugin** - Full-featured Jira Cloud integration with 15 commands for issue tracking, comments, boards, sprints, and project management.

## Build & Development Commands

### MCP Server (greeting-plugin)
```bash
cd plugins/greeting-plugin/mcp-server
npm install
npm run build    # Outputs to dist/
npm run dev      # Watch mode
npm start        # Run the server
```

### LSP Server (greeting-plugin)
```bash
cd plugins/greeting-plugin/lsp-server
npm install
npm run build
npm run dev
npm start
```

### Marketplace Validation
```bash
/plugin validate .
```

### Plugin Installation
```bash
/plugin marketplace add captain-corgi/corgi-hub-plugins
/plugin install greeting-plugin@corgi-hub-plugins
/plugin install jira-plugin@corgi-hub-plugins
```

### Release (PowerShell)
```powershell
.\scripts\release.ps1 -Version "1.0.0"
.\scripts\release.ps1 -Version "1.0.0" -DryRun  # Preview mode
```

## Architecture

The plugin system uses a two-tier manifest structure:

1. **Marketplace Manifest** (`.claude-plugin/marketplace.json`) - Catalog of all plugins, categories, and metadata
2. **Plugin Manifest** (`plugins/*/.claude-plugin/plugin.json`) - Individual plugin configuration

### greeting-plugin Data Flow
```
Commands (markdown) → Agents (markdown) → MCP Server (TypeScript) → Corgi Personality Data
```

### jira-plugin Architecture
- Pure JavaScript (no external dependencies besides Node.js built-ins)
- `lib/auth.js` - Manages JIRA_URL, JIRA_EMAIL, JIRA_API_KEY from environment
- `lib/api.js` - REST API client using native https module
- `lib/formatters.js` - Output formatting for tables and issue details

### Key Files by Function

| Function | Location |
|----------|----------|
| Marketplace catalog | `.claude-plugin/marketplace.json` |
| Greeting plugin config | `plugins/greeting-plugin/.claude-plugin/plugin.json` |
| Jira plugin config | `plugins/jira-plugin/.claude-plugin/plugin.json` |
| Corgi personality data | `plugins/greeting-plugin/mcp-server/src/corgi-team.ts` |
| Greeting logic & context selection | `plugins/greeting-plugin/mcp-server/src/greetings.ts` |
| MCP server entry | `plugins/greeting-plugin/mcp-server/src/index.ts` |
| LSP server config | `plugins/greeting-plugin/lsp-server/lsp-config.json` |
| Jira API client | `plugins/jira-plugin/lib/api.js` |
| Jira auth module | `plugins/jira-plugin/lib/auth.js` |
| Jira formatters | `plugins/jira-plugin/lib/formatters.js` |

## The Corgi Team

Each corgi has a distinct personality used for context-aware selection:

| Corgi | Model | Use When | Key Traits |
|-------|-------|----------|------------|
| Captain Corgi | sonnet | Formal, professional settings | dignified, professional, reliable |
| Cheerful Charlie | haiku | Celebrations, enthusiasm | energetic, playful, optimistic |
| Cozy Cinnamon | sonnet | Stressed, tired, need support | warm, empathetic, patient |
| Code Corgi | haiku | Developer context, tech humor | nerdy, witty, helpful |

### Context-Aware Selection
The `selectCorgiByContext(mood, occasion)` function in `greetings.ts` maps user state to appropriate corgi:
- **Mood types:** "happy", "tired", "stressed", "excited", "neutral"
- **Occasion types:** "morning", "afternoon", "evening", "project_start", "project_end", "celebration", "general"

## Code Patterns

### Agent Definition (Markdown with YAML Frontmatter)
```yaml
---
name: agent-name
description: Agent description
model: sonnet | haiku
---
```
Body contains: Background, Personality Traits, Communication Style, Domain Vocabulary, Signature Phrases, Example Greetings.

### Slash Command Pattern
```markdown
# /command-name - Brief description

## Instructions
1. Step-by-step instructions
2. Use ${CLAUDE_PLUGIN_ROOT} for file references

## Example Usage
\`\`\`
/command-name arguments
\`\`\`
```

### MCP Tool Pattern (TypeScript)
```typescript
server.tool("tool_name", "description", {
  param: z.enum([...]).optional().describe("...")
}, async (params) => {
  return { content: [{ type: "text", text: "..." }] };
});
```

### Hooks Configuration
Hooks use regex matchers against tool names. Example from `plugin.json`:
```json
{
  "PreToolUse": [{
    "matcher": "Write|Edit|MultiEdit",
    "hooks": [{ "type": "command", "command": "echo", "args": ["..."] }]
  }]
}
```

## TypeScript Configuration

- **Target:** ES2022
- **Module:** NodeNext (ESM) - use `.js` extensions in imports
- **Strict mode:** Enabled
- **Declaration/source maps:** Enabled

## Important Notes

- **Ephemeral Storage:** MCP server uses in-memory storage with 1000-record limit (`MAX_HISTORY_SIZE` in `greetings.ts`). Resets on server restart.
- **LSP Status:** The LSP server is a reference implementation only; not currently integrated into Claude Code's plugin schema.
- **Environment Variable:** `${CLAUDE_PLUGIN_ROOT}` in paths references the plugin root directory.
- **Emoji Usage:** Each corgi has a consistent emoji (Captain Corgi: 🎖️, Cheerful Charlie: 🎉, Cozy Cinnamon: 🧡, Code Corgi: 💻).

## Slash Commands Reference

### greeting-plugin Commands

| Command | Agent |
|---------|-------|
| `/greet` | Random corgi |
| `/welcome` | Captain Corgi |
| `/farewell` | Cheerful Charlie |
| `/motivate` | Cozy Cinnamon |
| `/celebrate` | All corgis |
| `/corgi-team` | All corgis |

### jira-plugin Commands

| Command | Purpose |
|---------|---------|
| `/jira-create-issue` | Create a new Jira issue |
| `/jira-get-issue` | Get issue details |
| `/jira-edit-issue` | Edit an existing issue |
| `/jira-search` | Search issues with JQL |
| `/jira-transition` | Transition issue status |
| `/jira-comment` | Add a comment to an issue |
| `/jira-get-comments` | Get comments for an issue |
| `/jira-boards` | List all boards |
| `/jira-sprints` | List sprints for a board |
| `/jira-create-sprint` | Create a new sprint |
| `/jira-sprint-issues` | Get issues in a sprint |
| `/jira-move-to-sprint` | Move issues to a sprint |
| `/jira-convert-to-subtasks` | Convert issues to sub-tasks of a parent |
| `/jira-projects` | List all projects |
| `/jira-status` | Test connection and verify configuration |

### jira-plugin API Functions

The `lib/api.js` module provides the following functions:

**Issue Management:**
- `createIssue(fields)` - Create a new issue
- `getIssue(issueKey)` - Get issue details
- `updateIssue(issueKey, fields)` - Edit an issue
- `searchIssues(jql, maxResults, startAt)` - Search with JQL
- `getTransitions(issueKey)` - Get available transitions
- `transitionIssue(issueKey, transitionId, fields)` - Change status

**Comments:**
- `getComments(issueKey)` - Get issue comments
- `addComment(issueKey, body)` - Add a comment

**Agile/Scrum:**
- `getBoards(boardType, maxResults)` - List boards
- `getBoardConfiguration(boardId)` - Get board config
- `getSprints(boardId, state)` - List board sprints
- `getSprintIssues(sprintId)` - Get sprint issues
- `createSprint(name, boardId, startDate, endDate)` - Create sprint
- `updateSprint(sprintId, updates)` - Update sprint (full update)
- `partiallyUpdateSprint(sprintId, updates)` - Update sprint (partial update)
- `moveIssuesToSprint(sprintId, issueKeys)` - Move issues to sprint

**Bulk Operations (NEW):**
- `bulkMoveIssues(options)` - Move/convert issues in bulk
  - Options: `issueIdsOrKeys`, `projectKey`, `issueTypeId`, `parentKey`, `sendNotification`
- `getBulkTaskStatus(taskId)` - Check bulk operation progress
- `convertToSubtasks(issueKeys, parentKey, projectKey)` - Convert to sub-tasks

**Projects:**
- `getProjects()` - List all projects
- `getProject(keyOrId)` - Get project details

### Bulk Operations Important Notes

The Bulk Move API (`/rest/api/3/bulk/issues/move`) is the **only** way to:
- Convert issues to sub-tasks
- Change an issue's parent
- Change issue type during a move operation

**Key format:** `targetToSourcesMapping` uses keys in format:
- `"projectKey,issueTypeId"` - For regular issues
- `"projectKey,issueTypeId,parentKey"` - For sub-tasks

**Operation runs asynchronously** - Returns a `taskId` for tracking progress.

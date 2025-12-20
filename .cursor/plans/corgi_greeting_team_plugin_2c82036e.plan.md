---
name: Corgi Greeting Team Plugin
overview: "Build a comprehensive Claude Code plugin marketplace featuring the \"Corgi Greeting Team\" - a full-featured example plugin demonstrating all plugin capabilities: agents, commands, hooks, MCP server, and LSP server."
todos:
  - id: restructure
    content: Rename corgi-hub-plugins to plugins directory
    status: completed
  - id: agents
    content: Create 4 corgi agent files with unique personalities
    status: completed
    dependencies:
      - restructure
  - id: commands
    content: Create 6 slash command files (greet, welcome, farewell, motivate, celebrate, corgi-team)
    status: completed
    dependencies:
      - restructure
  - id: mcp-server
    content: Build TypeScript MCP server with greeting tools and resources
    status: completed
    dependencies:
      - restructure
  - id: lsp-server
    content: Build TypeScript LSP server with completions, hover, diagnostics
    status: completed
    dependencies:
      - restructure
  - id: plugin-json
    content: Update plugin.json to register all agents, commands, hooks, MCP, LSP
    status: completed
    dependencies:
      - agents
      - commands
      - mcp-server
      - lsp-server
  - id: marketplace-json
    content: Update marketplace.json with enhanced plugin metadata
    status: completed
    dependencies:
      - plugin-json
  - id: readme
    content: Create README.md with marketplace documentation
    status: completed
    dependencies:
      - marketplace-json
---

# Corgi Greeting Team - Complete Plugin Marketplace

## Overview

Transform the existing marketplace into a comprehensive example featuring the **Corgi Greeting Team** - 4 corgi specialists working together to demonstrate every Claude Code plugin capability.

## The Corgi Team

| Corgi | Role | Specialty ||-------|------|-----------|| Captain Corgi | Team Leader | Formal, professional greetings || Cheerful Charlie | Enthusiasm Expert | Casual greetings, celebrations || Cozy Cinnamon | Comfort Specialist | Supportive, encouraging messages || Code Corgi | Developer Buddy | Programming puns, dev greetings |

## Final Directory Structure

```javascript
marketplace/
├── .claude-plugin/
│   └── marketplace.json
├── plugins/
│   └── greeting-plugin/
│       ├── .claude-plugin/
│       │   └── plugin.json
│       ├── agents/
│       │   ├── captain-corgi.md
│       │   ├── cheerful-charlie.md
│       │   ├── cozy-cinnamon.md
│       │   └── code-corgi.md
│       ├── commands/
│       │   ├── greet.md
│       │   ├── welcome.md
│       │   ├── farewell.md
│       │   ├── motivate.md
│       │   ├── celebrate.md
│       │   └── corgi-team.md
│       ├── mcp-server/
│       │   ├── package.json
│       │   ├── tsconfig.json
│       │   └── src/
│       │       ├── index.ts
│       │       ├── greetings.ts
│       │       └── corgi-team.ts
│       └── lsp-server/
│           ├── package.json
│           ├── tsconfig.json
│           └── src/
│               └── index.ts
├── LICENSE
└── README.md
```



## Components to Build

### 1. Agents (4 files)

Each corgi agent with unique personality, vocabulary, and interaction style defined in markdown frontmatter.

### 2. Commands (6 files)

- `/greet` - Random corgi greeting
- `/welcome` - Formal welcome (Captain Corgi)
- `/farewell` - Goodbye message (Cheerful Charlie)
- `/motivate` - Encouragement (Cozy Cinnamon)
- `/celebrate` - Achievement celebration (All corgis)
- `/corgi-team` - Meet the team

### 3. Hooks

Configure in [plugin.json](corgi-hub-plugins/greeting-plugin/.claude-plugin/plugin.json):

- **PreToolUse**: Encouragement before Write/Edit operations
- **PostToolUse**: Celebration after successful file writes

### 4. MCP Server (TypeScript)

Full greeting service with tools:

- `get_greeting` - Customized greeting by mood/occasion
- `get_random_corgi` - Random team member info
- `add_custom_greeting` - Store custom greetings
- `get_greeting_stats` - Usage statistics

### 5. LSP Server (TypeScript)

Language intelligence features:

- Completions for greeting phrases
- Hover info on greeting keywords
- Diagnostics suggesting friendlier comments

### 6. Configuration Updates

- Update [marketplace.json](.claude-plugin/marketplace.json) with new plugin details
- Create comprehensive
- Create comprehensive plugin plugin.json registering all components
- Add README.md for marketplace documentation
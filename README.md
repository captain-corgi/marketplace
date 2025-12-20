# 🐕 Corgi Hub Plugins

A comprehensive Claude Code plugin marketplace featuring the **Corgi Greeting Team** - demonstrating plugin capabilities including agents, commands, hooks, and MCP servers.

## 🎉 Meet the Team

| Corgi | Role | Specialty |
|-------|------|-----------|
| 🎖️ **Captain Corgi** | Team Leader | Formal, professional greetings |
| 🎉 **Cheerful Charlie** | Enthusiasm Expert | Casual greetings, celebrations |
| 🧡 **Cozy Cinnamon** | Comfort Specialist | Supportive, encouraging messages |
| 💻 **Code Corgi** | Developer Buddy | Programming puns, dev greetings |

## 📦 Installation

### Add the Marketplace

```bash
/plugin marketplace add captain-corgi/corgi-hub-plugins
```

Or for local development:

```bash
/plugin marketplace add ./path/to/marketplace
```

### Install the Plugin

```bash
/plugin install greeting-plugin@corgi-hub-plugins
```

## 🚀 Features

### Slash Commands

| Command | Description |
|---------|-------------|
| `/greet` | Get a greeting from a random corgi |
| `/welcome` | Formal welcome from Captain Corgi |
| `/farewell` | Cheerful goodbye from Charlie |
| `/motivate` | Encouragement from Cozy Cinnamon |
| `/celebrate` | Team celebration for achievements |
| `/corgi-team` | Meet all the corgis |

### Agents

Four specialized AI agents, each with unique personalities:

- **Captain Corgi** - Professional, dignified greetings
- **Cheerful Charlie** - Energetic, fun interactions
- **Cozy Cinnamon** - Warm, supportive encouragement
- **Code Corgi** - Developer humor and programming puns

### Hooks

Automatic encouragement during your coding sessions:

- **PreToolUse**: Code Corgi encourages you before file edits
- **PostToolUse**: Cheerful Charlie celebrates successful saves
- **Notification**: Team presence for all notifications

### MCP Server

A full-featured greeting service with tools:

| Tool | Description |
|------|-------------|
| `get_greeting` | Get customized greeting by mood/occasion |
| `get_random_corgi` | Get random team member info |
| `add_custom_greeting` | Store your own greetings |
| `get_greeting_stats` | View usage statistics |
| `get_programming_pun` | Get a random programming joke |

**Resources:**
- `corgi://team` - Team member information
- `corgi://greetings/today` - Today's greeting history
- `corgi://greetings/custom` - Your custom greetings

### LSP Server (Reference Implementation)

The plugin includes an LSP server as a reference implementation (not currently integrated into Claude Code plugin system):

- **Completions** - Greeting phrase suggestions in comments
- **Hover** - Corgi wisdom on keywords like TODO, FIXME, etc.
- **Diagnostics** - Hints for friendlier comment wording

> Note: LSP servers are not currently supported in the Claude Code plugin schema. This code is provided as an example for future use.

## 🛠️ Development

### Building the MCP Server

```bash
cd plugins/greeting-plugin/mcp-server
npm install
npm run build
```

### Building the LSP Server

```bash
cd plugins/greeting-plugin/lsp-server
npm install
npm run build
```

### Validating the Marketplace

```bash
/plugin validate .
```

## 📁 Directory Structure

```
marketplace/
├── .claude-plugin/
│   └── marketplace.json      # Marketplace catalog
├── plugins/
│   └── greeting-plugin/
│       ├── .claude-plugin/
│       │   └── plugin.json   # Plugin manifest
│       ├── agents/           # 4 corgi agents
│       ├── commands/         # 6 slash commands
│       ├── mcp-server/       # TypeScript MCP server
│       └── lsp-server/       # TypeScript LSP server
├── LICENSE
└── README.md
```

## 📖 Plugin Capabilities Demonstrated

This marketplace serves as a comprehensive example of Claude Code plugin features:

- ✅ **Agents** - Specialized AI personas with unique behaviors
- ✅ **Commands** - Custom slash commands for user interaction
- ✅ **Hooks** - Pre/Post tool use and notification handlers
- ✅ **MCP Server** - Model Context Protocol tools and resources
- 📦 **LSP Server** - Reference implementation (not yet supported in plugin schema)

## 🤝 Contributing

Contributions welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Add your own corgi or greeting commands
4. Submit a pull request

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

**Made with 🧡 by the Corgi Greeting Team**

*"Spreading joy, one greeting at a time!"* 🐕✨

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

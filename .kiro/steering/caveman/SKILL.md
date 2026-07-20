# Caveman

Make AI coding agents talk like a caveman - 65% fewer output tokens, 100% technical accuracy.

## Overview

Caveman is a skill/plugin that compresses AI agent output by removing filler words while preserving technical accuracy. Same answers, dramatically fewer tokens. Agent knowledge unchanged - only the verbosity is reduced.

**Key Value Proposition**: Save 65% on output tokens across every agent reply by switching from verbose explanations to compressed caveman-speak. Code, commands, and errors remain byte-for-byte exact.

## When to Use

- Reduce output token costs on AI coding agent conversations
- Speed up agent responses by reducing verbosity
- Improve readability with concise, direct answers
- Compress memory files (CLAUDE.md, project notes) to save input tokens forever
- Write commit messages and PR reviews in compressed format
- Use caveman subagents for investigative work with less context burn

## Core Capabilities

### Compression Modes

Six levels of compression, switchable anytime:

| Mode | Description | Compression |
|------|-------------|-------------|
| `lite` | Light compression, most readable | ~40% fewer tokens |
| `full` | **Default** - balanced compression | ~65% fewer tokens |
| `ultra` | Maximum compression | ~75% fewer tokens |
| `wenyan` | Classical Chinese encoding | Maximum density |

### Key Commands

| Command | Purpose |
|---------|---------|
| `/caveman [level]` | Activate compression at specified level (sticks for session) |
| `/caveman-commit` | Generate conventional commit messages (≤50 chars, why over what) |
| `/caveman-review` | One-line PR comments: `L42: 🔴 bug: user null. Add guard.` |
| `/caveman-stats` | Show real session token usage, lifetime savings, USD cost |
| `/caveman-compress <file>` | Rewrite memory file to compressed format (saves input tokens forever) |

### Additional Tools

- **caveman-shrink**: MCP middleware to compress tool descriptions
- **cavecrew-***: Caveman subagents (investigator, builder, reviewer) at ~60% fewer tokens

## Installation & Setup

### One-Command Universal Install

Finds every agent on your machine and installs for each:

**macOS / Linux / WSL / Git Bash:**
```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
```

**Windows PowerShell 5.1+:**
```powershell
irm https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.ps1 | iex
```

**Requirements:**
- Node.js ≥18
- Takes ~30 seconds
- Safe to re-run
- Skips agents you don't have

### Per-Agent Installation

**Claude Code:**
```bash
claude plugin marketplace add JuliusBrussee/caveman
claude plugin install caveman@caveman
```

**Gemini CLI:**
```bash
gemini extensions install https://github.com/JuliusBrussee/caveman
```

**Cursor / Windsurf / Cline / Codex / 30+ more:**
```bash
npx skills add JuliusBrussee/caveman -a cursor
```

See [INSTALL.md](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md) for complete per-agent installation matrix.

### Activation

**Claude Code, Codex, Gemini:** Auto-active from message one (no command needed)

**Other agents:**
- **Turn on**: Type `/caveman` or say "talk like caveman"
- **Turn off**: Say "normal mode"

## How It Works

### Architecture

1. **Skill Installation**: Drops skill file into agent's configuration
2. **Prompt Injection**: Skill instructs agent to compress output while preserving technical content
3. **Session Hooks**: Auto-activates on Claude Code via flag file per session
4. **Token Tracking**: `/caveman-stats` reads session log and calculates savings
5. **Memory Compression**: `/caveman-compress` rewrites files for permanent input savings

### What Gets Compressed

**Compressed:**
- Filler words and phrases ("I'd be happy to help", "Let me take a look")
- Verbose explanations (keeps core technical meaning)
- Conversational padding
- Repetitive confirmations

**Preserved Byte-for-Byte:**
- Code snippets and examples
- Shell commands
- Error messages
- File paths and URLs
- Technical terminology

### Example Transformations

**Normal (69 tokens):**
> The reason your React component is re-rendering is likely because you're creating a new object reference on each render cycle. When you pass an inline object as a prop, React's shallow comparison sees it as a different object every time, which triggers a re-render. I'd recommend using useMemo to memoize the object.

**Caveman (19 tokens):**
> New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`.

**Normal (37 tokens):**
> Sure! I'd be happy to help you with that. The issue you're experiencing is most likely caused by your authentication middleware not properly validating the token expiry. Let me take a look and suggest a fix.

**Caveman (11 tokens):**
> Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:

## Benchmarks

Real token counts from Claude API across 10 typical coding tasks:

| Task | Normal | Caveman | Saved |
|------|-------:|--------:|------:|
| Explain React re-render bug | 1180 | 159 | 87% |
| Fix auth middleware token expiry | 704 | 121 | 83% |
| Set up PostgreSQL connection pool | 2347 | 380 | 84% |
| Explain git rebase vs merge | 702 | 292 | 58% |
| Refactor callback to async/await | 387 | 301 | 22% |
| Architecture: microservices vs monolith | 446 | 310 | 30% |
| Review PR for security issues | 678 | 398 | 41% |
| Docker multi-stage build | 1042 | 290 | 72% |
| Debug PostgreSQL race condition | 1200 | 232 | 81% |
| Implement React error boundary | 3454 | 456 | 87% |
| **Average** | **1214** | **294** | **65%** |

**Important Notes:**
- These are **output token** savings only
- Input tokens unchanged (skill adds ~1–1.5k input tokens per turn)
- Whole-session savings smaller than pure output numbers
- Real win: **readability and speed**, cost savings are bonus
- Can go net-negative on already-terse workloads

See [HONEST-NUMBERS.md](https://github.com/JuliusBrussee/caveman/blob/main/docs/HONEST-NUMBERS.md) for detailed analysis.

### Research Validation

[*Brevity Constraints Reverse Performance Hierarchies in Language Models*](https://arxiv.org/abs/2604.00025) (March 2026) found that constraining models to brief answers **improved accuracy by ~26 points** on some benchmarks. Short ≠ less accurate.

## Memory File Compression

Use `/caveman-compress <file>` to permanently reduce input tokens:

| File | Original | Compressed | Saved |
|---|---:|---:|---:|
| `claude-md-preferences.md` | 706 | 285 | 59.6% |
| `project-notes.md` | 1145 | 535 | 53.3% |
| `claude-md-project.md` | 1122 | 636 | 43.3% |
| `todo-list.md` | 627 | 388 | 38.1% |
| `mixed-with-code.md` | 888 | 560 | 36.9% |
| **Average** | **898** | **481** | **46%** |

Every session after compression loads ~46% smaller. **Input tokens saved forever, not just one reply.**

## Supported Agents (30+)

| Category | Agents |
|----------|--------|
| **Primary** | Claude Code, Codex, Gemini CLI, Cursor, Windsurf |
| **Editors** | Cline, VS Code Copilot, RooCode, Zed, Continue |
| **IDEs** | JetBrains (IntelliJ, PyCharm, etc.), Android Studio |
| **Terminal** | Aider, OpenClaw, Shell agents |
| **Specialty** | Devin, Sweep, Codium, AutoDev, Bito, Tabnine |

Full compatibility matrix: [INSTALL.md](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md)

## Technical Stack

- **Language**: JavaScript/Node.js
- **Runtime**: Node.js ≥18
- **Distribution**: npm package + install scripts
- **Integration**: Skill files, plugin system, MCP middleware
- **Platform**: Cross-platform (macOS, Linux, Windows)
- **License**: MIT

### File Structure

```
caveman/
├── install.sh              # Unix install script
├── install.ps1             # PowerShell install script
├── src/                    # Core skill implementations
├── plugins/                # Agent-specific plugins
├── skills/                 # Skill definitions
├── commands/               # CLI commands
├── benchmarks/             # Token savings benchmarks
├── evals/                  # Evaluation suite
└── docs/
    ├── INSTALL.md          # Per-agent installation
    ├── HONEST-NUMBERS.md   # Real savings analysis
    └── assets/             # Logo and graphics
```

## Ecosystem

Caveman is part of a larger token-optimization toolkit:

| Tool | Purpose |
|------|---------|
| [**caveman**](https://github.com/JuliusBrussee/caveman) | Shrinks agent **output** |
| [**caveman-code**](https://github.com/JuliusBrussee/caveman-code) | Full terminal coding agent, caveman top-to-bottom (~2× fewer tokens than Codex) |
| [**cavemem**](https://github.com/JuliusBrussee/cavemem) | Shrinks agent **memory** across sessions |
| [**cavekit**](https://github.com/JuliusBrussee/cavekit) | Spec-driven build loop, no guessing |
| [**cavegemma**](https://github.com/JuliusBrussee/finetune-caveman) | Compression baked into weights (Gemma fine-tune) |

### Sibling Skills

From [JuliusBrussee/skills](https://github.com/JuliusBrussee/skills):

```bash
npx skills@latest add JuliusBrussee/skills
```

- **caveman**: This skill
- **grill-me**: Agent grills your plan before you build wrong thing
- **interface-kit**: Build UI that looks good, loads fast, works for everyone
- **junior-to-senior**: Adversarial review pass (junior → senior output)
- **loop-factory**: Spec-driven task loop (inbox → active → archive)

## Advanced Features

### Statusline Integration (Claude Code)

Shows lifetime token savings in statusline:
```
[CAVEMAN] ⛏ 12.4k
```

Disable with: `CAVEMAN_STATUSLINE_SAVINGS=0`

### OpenClaw Integration

For [OpenClaw](https://openclaw.ai) self-host gateway:

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash -s -- --only openclaw
```

Custom workspace path: `OPENCLAW_WORKSPACE=/your/path`

### MCP Middleware (caveman-shrink)

Wraps any MCP server to compress tool descriptions:

```bash
npm install caveman-shrink
```

See [npm package](https://www.npmjs.com/package/caveman-shrink) for usage.

### Cavecrew Subagents

Compressed subagent variants:
- `cavecrew-investigator`: Research and analysis (~60% fewer tokens)
- `cavecrew-builder`: Implementation tasks
- `cavecrew-reviewer`: Code review and feedback

Use when delegating subtasks to preserve main agent context budget.

## Best Practices

1. **Start with `full` mode** - Best balance of compression and readability
2. **Use `/caveman-stats`** regularly to track actual savings
3. **Compress memory files early** - Saves input tokens on every future session
4. **Switch levels per task** - `lite` for explanations, `ultra` for code-heavy tasks
5. **Language flexibility** - Caveman preserves your language (Portuguese → Portuguese caveman)
6. **Commit/PR modes** - Use specialized commands for Git workflows
7. **Test on terse tasks first** - Some workloads may not benefit (see HONEST-NUMBERS.md)

## Privacy & Security

- **Zero telemetry**: No phone home, no analytics, no accounts, no backend
- **Local operation**: After install, zero network calls
- **No data collection**: Skill is a prompt, hooks are local scripts
- **Log reading only**: `/caveman-stats` reads existing session logs on disk
- **Install transparency**: Install-time fetches documented in [SECURITY.md](https://github.com/JuliusBrussee/caveman/blob/main/SECURITY.md#privacy--telemetry)

## Troubleshooting

### Installation Issues

**Install broke?** Open your agent in the repo and say:
> "Read CLAUDE.md and INSTALL.md, install caveman for me."

Agent reads repo, fixes own installation.

### Agent Not Using Caveman

1. Check if activation command was run: `/caveman` or "talk like caveman"
2. On Claude Code/Codex/Gemini: Should be auto-active from message one
3. Verify installation completed successfully
4. Try re-running installer (safe to re-run)

### Savings Lower Than Expected

See [HONEST-NUMBERS.md](https://github.com/JuliusBrussee/caveman/blob/main/docs/HONEST-NUMBERS.md) for:
- When caveman wins vs loses
- How to measure accurately
- Workload-specific considerations
- Net-negative scenarios

## Roadmap: Caveman 2

**Provable, team-wide token savings dashboard**

Current savings are local estimates. Caveman 2 will:
- Measure and verify savings across entire teams
- Provide real receipts and dashboards
- Prove token reductions with hard data

[Join waitlist → caveman.so](https://caveman.so)

## Resources

- **GitHub**: https://github.com/JuliusBrussee/caveman
- **Install Matrix**: [INSTALL.md](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md)
- **Honest Numbers**: [docs/HONEST-NUMBERS.md](https://github.com/JuliusBrussee/caveman/blob/main/docs/HONEST-NUMBERS.md)
- **Maintainer Guide**: [CLAUDE.md](https://github.com/JuliusBrussee/caveman/blob/main/CLAUDE.md)
- **Contributing**: [CONTRIBUTING.md](https://github.com/JuliusBrussee/caveman/blob/main/CONTRIBUTING.md)
- **Issues**: https://github.com/JuliusBrussee/caveman/issues
- **Star History**: [![Star History](https://api.star-history.com/svg?repos=JuliusBrussee/caveman&type=Date)](https://github.com/JuliusBrussee/caveman)

## License

MIT - Free like mass mammoth on open plain.

---

**Summary**: Caveman makes AI coding agents speak in compressed format, saving 65% on output tokens while maintaining 100% technical accuracy. Install once across 30+ agents, activate per session, save tokens forever. Real cost savings, faster responses, better readability.

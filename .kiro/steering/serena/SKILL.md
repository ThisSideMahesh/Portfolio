
# Serena - The IDE for Your Coding Agent

Semantic code retrieval, editing, refactoring and debugging toolkit for AI coding agents via MCP.

## Overview

Serena provides essential **semantic code retrieval, editing, refactoring and debugging tools** that are akin to an IDE's capabilities, operating at the symbol level and exploiting relational structure. It integrates with any client/LLM via the model context protocol (MCP).

**Key Value Proposition**: Agent-first tool design with robust high-level abstractions, distinguishing it from approaches that rely on low-level concepts like line numbers or primitive search patterns. This means agents operate **faster, more efficiently and more reliably**, especially in larger and more complex codebases.

## When to Use

- Symbol-level code navigation and exploration
- Cross-file refactoring operations (rename, move, inline)
- Finding references, implementations, and type hierarchies
- Semantic code editing (replace symbol body, insert at symbol)
- Interactive debugging with breakpoints and expression evaluation (JetBrains only)
- Working with large, complex codebases where text-based tools are insufficient

## Core Capabilities

### Retrieval Tools
- **Find Symbol**: Locate symbols across the codebase at symbol level
- **Symbol Overview**: Get file outlines and structure
- **Find References**: Discover all references to a symbol
- **Find Declaration**: Jump to symbol declarations
- **Find Implementations**: Locate implementations of interfaces/abstract methods
- **Type Hierarchy**: Explore class hierarchies
- **Search Dependencies**: Query external project dependencies (JetBrains only)
- **Diagnostics**: Get IDE-level error/warning inspections

### Refactoring Tools
- **Rename**: Symbol-aware renaming (files/directories with JetBrains)
- **Move**: Move symbols, files, or directories (JetBrains only)
- **Inline**: Inline variables, methods, etc. (JetBrains only)
- **Propagate Deletions**: Remove unused code automatically (JetBrains only)

### Symbolic Editing
- **Replace Symbol Body**: Token-efficient replacement of symbol implementations
- **Insert After/Before Symbol**: Precise insertion at symbol boundaries
- **Safe Delete**: Delete with dependency checking

### Additional Features
- **Interactive Debugging**: REPL-style debugging interface (JetBrains only)
- **Memory Management**: Persistent knowledge across sessions
- **Basic Utilities**: Search, replace, file operations, shell commands

## Language Support

### Language Server Backend (Default, Free)
Supports **40+ programming languages** including:
- Ada/SPARK, AL, Angular, Ansible, Bash, BSL
- C#, C/C++, Clojure, Crystal, CUE
- Dart, Elixir, Elm, Erlang
- Fortran, F#, GDScript, GLSL, Go, Groovy
- Haskell, Haxe, HLSL, HTML
- Java, JavaScript, JSON, Julia
- Kotlin, LaTeX, Lean 4, Lua, Luau
- Markdown, MATLAB, mSL, Nix, OCaml
- Perl, PHP, PowerShell, Python
- R, Ruby, Rust, Scala
- SCSS/Sass/CSS, Solidity, Svelte, Swift
- TOML, TypeScript, WGSL, YAML, Zig

### JetBrains Plugin Backend (Paid, Free Trial)
Leverages JetBrains IDE analysis capabilities, supporting all languages in:
- IntelliJ IDEA, PyCharm, Android Studio
- WebStorm, PhpStorm, RubyMine, GoLand
- (Rider and CLion unsupported)

## Installation & Setup

### Prerequisites
- **uv** package manager (only required prerequisite)
- Python 3.11-3.14
- Additional language-specific dependencies for certain language servers

### Install Serena
```bash
# Install via uv
uv tool install -p 3.13 serena-agent

# Verify installation
serena --version
```

### Initialize
```bash
# Language server backend (default, free)
serena init

# JetBrains backend (requires plugin purchase/trial)
serena init -b JetBrains
```

### Configure MCP Client
Add Serena to your MCP client configuration. Example launch command structure:

```json
{
  "mcpServers": {
    "serena": {
      "command": "serena",
      "args": ["mcp", "--workspace", "/path/to/project"]
    }
  }
}
```

Client-specific instructions available at: https://oraios.github.io/serena/02-usage/030_clients.html

## Configuration

Serena offers multi-layered, composable configuration:

1. **Global Configuration**: System-wide defaults
2. **CLI Configuration**: Via launch command arguments
3. **Per-Project Configuration**: Project-specific settings with local overrides
4. **Context-Specific Configuration**: For particular clients/environments
5. **Composable Modes**: Dynamically combine configuration fragments

Configuration is YAML-based and controls:
- Active tools and tool descriptions
- Prompts and language backend details
- Memory management settings
- Execution behavior

## Project-Based Workflow

Serena works best with explicit project definitions:

1. Create project configuration files defining workspace boundaries
2. Initialize project-specific settings and dependencies
3. Use project context for accurate symbol resolution
4. Share project configurations across team members

See: https://oraios.github.io/serena/02-usage/040_workflow.html

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                MCP Client (AI Agent)                 │
│      (Claude Code, Codex, Cursor, IDEs, etc.)       │
└─────────────────┬───────────────────────────────────┘
                  │ Model Context Protocol (MCP)
                  │
┌─────────────────▼───────────────────────────────────┐
│               Serena MCP Server                      │
│  ┌──────────────────────────────────────────────┐  │
│  │  Tool Layer (Semantic Abstractions)          │  │
│  ├──────────────────────────────────────────────┤  │
│  │  Analysis Engine                             │  │
│  └──────────┬───────────────────────────────────┘  │
│             │                                        │
│    ┌────────▼─────────┐     ┌───────────────────┐  │
│    │ Language Servers │  or │ JetBrains Plugin  │  │
│    │    (LSP)         │     │                   │  │
│    └──────────────────┘     └───────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Evaluation Results

Independent agent evaluations show significant value:

- **Claude Opus 4.6**: "Single most impactful addition to my toolkit... 8-12 error-prone steps collapse into one atomic call"
- **GPT 5.4 (Codex)**: "Missing IDE-level understanding... turning fragile text surgery into calmer, faster, more confident code changes"
- **GPT 5.4 (Copilot)**: "Noticeably sharper and calmer on real code – especially symbol-aware navigation, cross-file refactors"

Full evaluation methodology: https://oraios.github.io/serena/04-evaluation/000_evaluation-intro.html

## Technical Stack

- **Language**: Python 3.11-3.14
- **Package Management**: uv (modern Python package manager)
- **Build System**: Hatchling
- **MCP Integration**: `mcp` package for Model Context Protocol
- **Web Framework**: Flask (for HTTP mode)
- **Language Server Protocol**: `pygls`, `lsprotocol`
- **GUI Components**: `pywebview`, `pystray`
- **Configuration**: YAML via `pyyaml`, `ruamel.yaml`

### Key Dependencies
- `mcp==1.27.0` - Model Context Protocol support
- `pygls==2.1.1` - Language server protocol implementation
- `anthropic==0.59.0` - Anthropic API integration
- `flask==3.1.3` - HTTP server for web-based clients
- `pydantic==2.12.5` - Data validation
- `tiktoken==0.12.0` - Token counting

## Common Commands

```bash
# Installation
uv tool install -p 3.13 serena-agent

# Initialization
serena init                      # Language server backend
serena init -b JetBrains        # JetBrains backend

# MCP Server
serena mcp --workspace /path/to/project              # Stdio mode (default)
serena mcp --workspace /path/to/project --http       # HTTP mode

# Configuration
serena config show              # Display current configuration
serena config edit              # Edit configuration

# Project Management
serena project init             # Initialize project configuration
serena project validate         # Validate project setup

# Hooks (Git integration)
serena-hooks install            # Install Git hooks
serena-hooks uninstall          # Remove Git hooks
```

## Documentation

- **User Guide**: https://oraios.github.io/serena/02-usage/000_intro.html
- **Tool Reference**: https://oraios.github.io/serena/01-about/035_tools.html
- **Language Support**: https://oraios.github.io/serena/01-about/020_programming-languages.html
- **JetBrains Plugin**: https://oraios.github.io/serena/02-usage/025_jetbrains_plugin.html
- **Client Setup**: https://oraios.github.io/serena/02-usage/030_clients.html
- **Configuration Guide**: https://oraios.github.io/serena/02-usage/050_configuration.html
- **Workflow Guide**: https://oraios.github.io/serena/02-usage/040_workflow.html

## Integration Examples

### Claude Code
```yaml
# ~/.claude/mcp.json
{
  "mcpServers": {
    "serena": {
      "command": "serena",
      "args": ["mcp", "--workspace", "${workspaceFolder}"]
    }
  }
}
```

### Cursor / VSCode
```json
{
  "mcp": {
    "servers": {
      "serena": {
        "command": "serena",
        "args": ["mcp", "--workspace", "${workspaceFolder}"]
      }
    }
  }
}
```

### HTTP Mode (for web clients)
```bash
# Start server
serena mcp --workspace /path/to/project --http --port 8080

# Client connects to http://localhost:8080
```

## Best Practices

1. **Use Project Configurations**: Define explicit project boundaries for accurate symbol resolution
2. **Choose Backend Wisely**: Language servers for broad language support; JetBrains for advanced refactoring
3. **Configure Tool Subsets**: Disable overlapping tools when used with harnesses (Claude Code, Codex)
4. **Leverage Memory System**: Use persistent knowledge across sessions for complex workflows
5. **Understand Tool Abstractions**: Prefer high-level semantic tools over low-level line-based operations
6. **Test in Evaluation Mode**: Run agent evaluations to measure Serena's impact on your workflow

## Troubleshooting

- **Language Server Issues**: Check language-specific dependencies are installed
- **Symbol Resolution Problems**: Verify project configuration and workspace paths
- **Performance Issues**: Consider using JetBrains plugin for very large codebases
- **MCP Connection**: Ensure client launch command matches Serena's expected format

## License

MIT License


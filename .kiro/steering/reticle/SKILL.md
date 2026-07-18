# Reticle

Proof layer for AI agents - tests and verifies web applications from inside the running app.

## Overview

Reticle is a testing toolkit that reads program state (network, store state, signals, React commit stream) rather than just screenshots. It provides pass/fail verdicts with file:line references to fix issues. Works via MCP with Claude Code, Cursor, OpenCode, and other AI coding tools.

## When to Use

- Verify web application functionality after code changes
- Test user flows and interactions
- Catch bugs that screenshot-based tools cannot see (mock data, silent 500s, wrong store state)
- Regression testing with recorded flows
- Integration testing during development

## Key Value Proposition

- **Reads program truth**: Network, store state, signals, React commit stream - not just screenshots
- **Precise debugging**: Returns file:line to fix, not just "something broke"
- **Catches invisible bugs**: Mock data in production, silent 500 errors, store corruption
- **Zero infrastructure**: Localhost-only, dev-only, no telemetry, no cloud services
- **Framework-aware**: React-first with support for Vue, Svelte, Next.js, Remix, SvelteKit

## Core Capabilities

### Observation Tools
- **Network inspection**: Monitor API calls, status codes, request/response data
- **DOM querying**: Find elements by testid, role, text, or CSS selector
- **Console monitoring**: Track errors, warnings, logs
- **State inspection**: Read React/Vue/Svelte store state directly
- **Signal tracking**: Monitor domain events emitted by your app

### Verification Tools
- **Multi-predicate assertions**: Combine network, element, signal, console checks in one call
- **Flow recording**: Record user flows once, replay for regression testing
- **Flow verification**: Re-verify all recorded flows after changes
- **Screenshot comparison**: Visual regression testing (optional)
- **Human bug reports**: Developers flag issues in-app for agent review

### Automation Features
- **Smart navigation**: Navigate to routes and wait for readiness
- **Element interaction**: Click, type, hover, focus with testid or role
- **Wait strategies**: Wait for network, elements, signals, or custom conditions
- **Session management**: Handle multiple browser tabs/windows
- **Automatic healing**: Self-heal recorded flows when UI changes

## Installation & Setup

### Prerequisites
- **Node.js**: >= 22.12
- **Package Manager**: npm, pnpm, yarn, or bun
- **Framework**: Vite, Next.js, Vue, Svelte, or other modern framework

### Quick Start (Vite + React)

```bash
# Install dependencies
npm install --save-dev @reticlehq/react @reticlehq/vite-plugin

# Register MCP server (Claude Code)
claude mcp add reticle -s user -- npx @reticlehq/server mcp

# Initialize project
npx @reticlehq/server init --port 5173
```

### Manual Setup

**1. Install SDK:**
```bash
npm install --save-dev @reticlehq/react @reticlehq/vite-plugin
# For Next.js: npm install --save-dev @reticlehq/react @reticlehq/next
```

**2. Configure Vite plugin:**
```ts
// vite.config.ts
import { reticle } from '@reticlehq/vite-plugin';

export default defineConfig({
  plugins: [react(), reticle()],
});
```

**3. Register capabilities:**
```ts
// src/reticle-dev.ts
import { registerCapabilities } from '@reticlehq/react';
if (import.meta.env.DEV) {
  registerCapabilities({
    testids: ['login-btn', 'submit-form'],
    signals: ['auth:login', 'form:submit'],
    stores: ['authStore', 'userStore'],
  });
}
```

**4. Load in entry file:**
```ts
// src/main.tsx
if (import.meta.env.DEV) import('./reticle-dev');
```

**5. Create config:**
```json
// .reticle.json
{
  "framework": "vite-react"
}
```

## MCP Integration

### Supported Tools

| Tool | Config File | Registration Method |
|------|-------------|---------------------|
| Claude Code | `~/.claude/claude_mcp_config.json` | `claude mcp add` |
| OpenCode | `opencode.json` | Manual JSON |
| Codex CLI | `.codex/config.toml` | TOML config |
| Cursor | `.cursor/mcp.json` | Manual JSON |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` | Manual JSON |
| VS Code | `.vscode/mcp.json` | Manual JSON |
| Zed | `~/.config/zed/settings.json` | Manual JSON |

### Claude Code Setup

```bash
# Register globally (recommended)
claude mcp add reticle -s user -- npx @reticlehq/server mcp

# Verify registration
claude mcp list

# Restart Claude Code to activate
```

### Cursor Setup

```json
// .cursor/mcp.json
{
  "mcpServers": {
    "reticle": {
      "command": "npx",
      "args": ["@reticlehq/server", "mcp"]
    }
  }
}
```

### VS Code Setup

```json
// .vscode/mcp.json
{
  "servers": {
    "reticle": {
      "command": "npx",
      "args": ["@reticlehq/server", "mcp"]
    }
  }
}
```

## Framework Support

### Vite + React (Recommended)
- Auto-injection via plugin
- Hot module reload support
- Full signal/store tracking

### Next.js (App Router)
```tsx
// app/reticle-dev.tsx
'use client';
import { useEffect } from 'react';

export function ReticleDev() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    void import('@reticlehq/react').then(({ reticle, install, registerCapabilities }) => {
      install();
      const token = process.env.NEXT_PUBLIC_RETICLE_TOKEN;
      reticle.connect(token ? { token } : {});
      registerCapabilities({
        testids: [],
        signals: [],
        stores: [],
      });
    });
  }, []);
  return null;
}
```

Mount in `app/layout.tsx`:
```tsx
import { ReticleDev } from './reticle-dev';
// Inside <body>:
{process.env.NODE_ENV === 'development' ? <ReticleDev /> : null}
```

### Vue / Svelte
- Manual `reticle.connect()` call
- Framework-specific store registration
- Similar capability registration pattern

## Key Commands

### Session Management
```bash
# List active sessions
reticle_sessions()

# Wait for app to connect
reticle_run({ tool: "reticle_wait_ready" })

# End session
reticle_end_session({ sessionId })

# Signal turn end
reticle_yield({ mode: "waiting" })
```

### Observation
```bash
# Snapshot DOM
reticle_snapshot({ sessionId, maxDepth: 3 })

# Get capabilities
reticle_run({ tool: "reticle_capabilities", args: { sessionId } })

# Check network activity
reticle_network({ sessionId, limit: 10 })

# Check console logs
reticle_console({ sessionId, limit: 20 })

# Inspect element
reticle_inspect({ sessionId, ref })

# Read store state
reticle_state({ sessionId, store, path })
```

### Interaction
```bash
# Navigate to route
reticle_navigate({ sessionId, url })

# Query element
reticle_query({ sessionId, by: "testid", value: "login-btn" })

# Act on element
reticle_act({ sessionId, ref, action: "click" })

# Assert conditions
reticle_assert({
  sessionId,
  since,
  timeout_ms: 5000,
  predicate: {
    kind: "allOf",
    predicates: [
      { kind: "net", method: "POST", urlContains: "/api/login", status: 200 },
      { kind: "element", query: { role: "button" }, state: "visible" },
      { kind: "signal", name: "auth:login" },
      { kind: "console", level: "error", absent: true }
    ]
  }
})
```

### Flow Recording
```bash
# Start recording
reticle_record_start({ recordingName: "login-flow" })

# Annotate flow
reticle_annotate({ flow: "login-flow", kind: "intent", text: "user logs in" })
reticle_annotate({ flow: "login-flow", kind: "success-state", signal: "auth:success" })

# Stop and save
reticle_record_stop({ recordingName: "login-flow" })
reticle_flow_save({ flowName: "login-flow" })

# Replay flow
reticle_flow_replay({ flowName: "login-flow" })

# Verify all flows
reticle_flow_verify({ sessionId })
```

### Human Feedback
```bash
# Review bug reports from developers
reticle_review({ sessionId })

# Resolve bug report
reticle_review({ resolve: "m1" })
```

## Testing Workflow

### 1. Setup Detection
```bash
# Check if Reticle is configured
cat .reticle.json 2>/dev/null || echo "NOT_FOUND"
```

If not found → run Setup mode (install SDK, register MCP, create config)
If found → run Test mode

### 2. Connect to App
- Verify dev server is running
- Call `reticle_sessions()` to find active session
- If multiple sessions, ask user which to test

### 3. Orient
Gather context in parallel:
- DOM snapshot (`reticle_snapshot`)
- Capabilities (`reticle_capabilities`)
- Network activity (`reticle_network`)
- Console logs (`reticle_console`)

### 4. Determine Test Strategy

| Context | Strategy |
|---------|----------|
| User specifies flow | Targeted test of that flow |
| "Test everything" | Smoke test all testids |
| Recent git changes | Test affected components |
| No clear signal | Smoke test |

### 5. Execute Tests

**Targeted Flow:**
1. Navigate if needed
2. Snapshot to confirm state
3. Act on controls (click, type)
4. Assert outcomes (network, DOM, signals, console)
5. Record pass/fail

**Smoke Test:**
1. Query all testids from capabilities
2. For each visible element:
   - Click it
   - Assert no console errors
   - Assert no 4xx/5xx responses
3. Report any failures

**Regression Suite:**
1. Record critical flows once
2. Re-verify all flows after changes
3. Auto-heal UI changes where possible

### 6. Report Results

```markdown
## Reticle — Feature Name

**Result: ✅ PASS / ❌ FAIL / ⚠️ PARTIAL**

| Flow | Result | Evidence |
|------|--------|----------|
| Login → dashboard | ✅ | POST /api/login 200, route /dashboard |
| Click "Deploy" | ❌ | POST /api/deploy 401 — missing auth header |

**Console errors:** none
**Failed requests:** POST /api/deploy 401
**Fix at:** src/lib/api.ts:65
```

## Best Practices

1. **Always close sessions**: Call `reticle_yield({ mode: "waiting" })` when done
2. **Use `since` in assertions**: Scope to post-action events, prevent stale matches
3. **Assert console errors**: `{ kind: "console", level: "error", absent: true }`
4. **Batch predicates**: Use `allOf` instead of multiple assert calls
5. **Never assert pixels**: Use semantic predicates, not screenshots
6. **Record regression suites**: Save critical flows for automatic re-verification
7. **Read store state directly**: Don't reconstruct from DOM, use `reticle_state`
8. **Check human bug reports**: Drain `reticle_review` at session start

## Tool Profiles

Reticle uses tool profiles to optimize token usage:

| Profile | Mode | Core Tools | Access Pattern |
|---------|------|------------|----------------|
| `hybrid` (default) | ~14 core tools advertised | verify, assert, act, query, snapshot | Others via `reticle_run` |
| `standard` | Flows + extras direct | Core + recording/replay | Direct invocation |
| `full` | Everything advertised | All tools | Direct invocation |

Set via: `RETICLE_TOOL_PROFILE=standard` or `=full`

## Troubleshooting

### No Session Appearing

1. **Check browser console**: Look for `[Reticle]` connection messages
2. **Verify port match**: App bridge port = daemon port (default 4400)
3. **Check daemon status**: `npx @reticlehq/server status`
4. **Verify SDK loaded**: Check `vite.config.ts` has `reticle()` plugin
5. **Restart dev server**: Config changes need fresh server
6. **Hard reload browser**: Clear cached bundle

### -32000 Error (Claude Code)

1. **Clear stale npx cache**:
   ```bash
   npx --yes @reticlehq/server@latest version
   npx @reticlehq/server stop
   ```
2. **Remove Stop hook**: Check `~/.claude/settings.json`, remove `reticle stop` hook
3. **Reload Claude Code**: Run `/mcp` command
4. **Check daemon log**: `cat ~/.reticle/daemon-4400.log | tail -30`

### Multiple Projects

Each project needs unique bridge port in `.reticle.json`:
```json
{
  "framework": "vite-react",
  "port": 4460
}
```

Must also update `vite.config.ts`:
```ts
reticle({ port: 4460 })
```

## Technical Stack

- **Language**: TypeScript
- **Package Manager**: pnpm@10.33.2
- **Node**: >= 22.12
- **Build Tool**: Turbo (monorepo orchestration)
- **License**: Apache-2.0
- **Architecture**: MCP server + browser SDK + local bridge daemon

### Key Dependencies
- `@modelcontextprotocol/sdk` - MCP integration
- React/Vue/Svelte adapters
- WebSocket bridge for browser ↔ daemon communication

## Benchmark Results

Head-to-head comparison (store corruption detection):
- **Reticle-MCP**: 4 tool calls, 45 seconds
- **Playwright-MCP**: 45 tool calls, ~9 minutes

Advantage: 10× faster by reading program state directly vs. reverse-engineering from DOM.

## Security & Scope

- **Localhost-only**: Never connects to remote servers
- **Dev-only**: SDK stripped from production builds
- **No telemetry**: Zero data collection
- **No credentials**: No API keys or cloud accounts required
- **File:line precision**: All verdicts include source location

## Resources

- **GitHub**: https://github.com/reticlehq/reticle
- **Documentation**: Comprehensive SKILL.md in repository
- **License**: Apache-2.0

## Integration Notes

Reticle is designed for seamless AI agent integration:
- Runs alongside dev server (never manages it)
- Zero-install via npx (first run downloads)
- Auto-detection of framework and setup
- Human-in-the-loop bug reporting
- Deterministic regression verification

## Common Commands Summary

```bash
# Setup
npx @reticlehq/server init --port 5173
claude mcp add reticle -s user -- npx @reticlehq/server mcp

# Status
npx @reticlehq/server status
claude mcp list

# Testing
reticle_sessions()
reticle_wait_ready()
reticle_snapshot({ sessionId })
reticle_act({ sessionId, ref, action: "click" })
reticle_assert({ sessionId, since, predicate })
reticle_yield({ mode: "waiting" })

# Flows
reticle_flow_verify({ sessionId })
reticle_flow_replay({ flowName })
reticle_review({ sessionId })

# Maintenance
npx @reticlehq/server stop
npx --yes @reticlehq/server@latest version
```


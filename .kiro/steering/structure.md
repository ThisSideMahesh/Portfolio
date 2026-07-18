
# Project Structure

## Repository Organization

Context7 is organized as a pnpm monorepo with clear separation between packages, documentation, configuration, and tooling.

```
context7/
├── packages/              # Core monorepo packages
│   ├── cli/              # ctx7 CLI tool
│   ├── mcp/              # MCP server implementation
│   ├── sdk/              # Core TypeScript SDK
│   ├── tools-ai-sdk/     # Vercel AI SDK tools
│   └── pi/               # pi.dev extension
├── docs/                 # Documentation and guides
├── i18n/                 # Internationalization (15+ languages)
├── public/               # Static assets (images, etc.)
├── plugins/              # Plugin integrations
├── rules/                # Agent rules and configurations
├── skills/               # Agent skills definitions
├── .agents/              # Agent-specific configurations
├── .claude-plugin/       # Claude Code plugin setup
├── .github/              # CI/CD workflows
└── Configuration files   # Root-level configs
```

## Package Structure

Each package follows a consistent internal structure:

```
packages/{package-name}/
├── src/                  # Source TypeScript files
├── dist/                 # Compiled output (generated)
├── package.json          # Package-specific dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── eslint.config.js      # Linting rules
├── tsup.config.ts        # Build configuration (CLI, SDK packages)
├── vitest.config.ts      # Test configuration
└── README.md             # Package documentation
```

## Key Directories

### `/packages`
Monorepo packages - each is independently publishable to npm:
- **cli**: Command-line interface (`ctx7` commands)
- **mcp**: Model Context Protocol server
- **sdk**: Core API client and utilities
- **tools-ai-sdk**: Integration with Vercel AI SDK
- **pi**: Extension for pi.dev platform

### `/docs`
User-facing documentation:
- Getting started guides
- API references
- Client setup instructions
- Troubleshooting guides

### `/i18n`
Localized README files in 15+ languages:
- Chinese (Simplified & Traditional)
- Japanese, Korean
- Spanish, French, Portuguese
- German, Russian, Ukrainian
- Turkish, Arabic, Vietnamese, etc.

### `/plugins`
Integration plugins for various coding assistants and tools

### `/skills`
Agent skill definitions for Context7 integration

### `/rules`
Configuration rules for coding assistant behavior

### `/.agents` & `/.claude-plugin`
Agent-specific configuration files for seamless setup

## Configuration Files

### Root Level
- `package.json`: Workspace scripts and root dependencies
- `pnpm-workspace.yaml`: Workspace package definitions
- `tsconfig.json`: Base TypeScript configuration
- `eslint.config.js`: Shared linting rules
- `prettier.config.mjs`: Code formatting standards
- `.env.example`: Environment variable template
- `server.json`: MCP server configuration
- `gemini-extension.json`: Gemini integration config

### Package Level
Each package has its own:
- `package.json`: Dependencies and package scripts
- `tsconfig.json`: Extends root config with package-specific settings
- `eslint.config.js`: Package-specific linting
- Build/test configs as needed

## Naming Conventions

### Packages
- Scoped under `@upstash/` namespace
- Descriptive names: `context7-mcp`, `context7-sdk`, `context7-tools-ai-sdk`
- CLI package uses short name: `ctx7`

### Files
- **TypeScript**: `.ts` for source files
- **Configuration**: `.config.{js,ts,mjs}` for tool configs
- **Tests**: Typically colocated with source or in `__tests__` directories

### Directories
- Lowercase with hyphens: `tools-ai-sdk`, `claude-plugin`
- Clear, descriptive names reflecting purpose

## Build Artifacts

Generated files (not tracked in git):
- `packages/*/dist/`: Compiled output from tsup/tsc
- `node_modules/`: Dependencies
- `.turbo/`: Turborepo cache (if used)

## Import Patterns

Packages import from each other using workspace protocol:
```json
"dependencies": {
  "@upstash/context7-sdk": "workspace:*"
}
```

This allows local development while maintaining proper dependency relationships.


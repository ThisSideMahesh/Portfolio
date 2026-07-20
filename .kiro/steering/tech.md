
# Tech Stack

## Core Technologies

- **TypeScript**: Primary language for type safety across all packages
- **Node.js**: Runtime environment (requires Node 18+)
- **pnpm**: Package manager and monorepo workspace management

## Architecture

### Monorepo Structure
- **Workspace-based**: Uses pnpm workspaces for multi-package management
- **Independent Packages**: Each package in `/packages` has its own build/test configuration
- **Shared Configuration**: Root-level ESLint, Prettier, and TypeScript configs

### Key Packages

| Package | Purpose | Tech Stack |
|---------|---------|------------|
| `@upstash/context7-mcp` | MCP server implementation | TypeScript, MCP SDK |
| `ctx7` (CLI) | Command-line interface | TypeScript, tsup, vitest |
| `@upstash/context7-sdk` | Core SDK for API interactions | TypeScript, tsup, vitest |
| `@upstash/context7-tools-ai-sdk` | Vercel AI SDK integration | TypeScript, tsup, vitest |
| `@upstash/context7-pi` | pi.dev extension | TypeScript, vitest |

## Build System

### Build Tools
- **tsup**: Fast TypeScript bundler for libraries
- **TypeScript**: Compilation and type checking
- **Changesets**: Version management and publishing

### Testing
- **Vitest**: Test runner for unit and integration tests
- **Test scripts per package**: Each package maintains its own test suite

### Linting & Formatting
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **typescript-eslint**: TypeScript-specific ESLint rules

## Common Commands

```bash
# Installation
pnpm install

# Build all packages
pnpm build

# Build specific package
pnpm build:sdk
pnpm build:mcp
pnpm build:ai-sdk

# Type checking
pnpm typecheck

# Testing
pnpm test                    # Run all tests
pnpm test:sdk               # Test SDK package
pnpm test:tools-ai-sdk      # Test AI SDK tools

# Linting & Formatting
pnpm lint                   # Lint all packages
pnpm lint:check            # Check without fixing
pnpm format                # Format code
pnpm format:check          # Check formatting

# Clean build artifacts
pnpm clean

# Publishing
pnpm release               # Production release
pnpm release:snapshot      # Canary snapshot release
```

## Development Workflow

1. **Setup**: `pnpm install` to install dependencies
2. **Build**: `pnpm build` to compile all packages
3. **Test**: `pnpm test` to run test suites
4. **Lint**: `pnpm lint` before committing
5. **Release**: Use changesets for version bumping and publishing

## External Dependencies

- **@inquirer/core**: Interactive CLI prompts
- **@changesets/cli**: Version and release management
- Various TypeScript and ESLint tooling packages

## Configuration Files

- `pnpm-workspace.yaml`: Workspace package definitions
- `tsconfig.json`: Root TypeScript configuration (extended by packages)
- `eslint.config.js`: Shared ESLint rules
- `prettier.config.mjs`: Code formatting rules
- Package-specific configs in `packages/*/`



# Product Overview

Context7 Platform - Up-to-date Code Documentation System

## Purpose

Context7 is a documentation intelligence platform that provides up-to-date, version-specific library documentation and code examples directly to AI coding assistants. It solves the problem of LLMs relying on outdated training data by fetching current documentation from source repositories.

## Core Value Proposition

- **Real-time Documentation**: Pulls current, version-specific docs instead of relying on outdated training data
- **No Hallucinated APIs**: Provides actual, existing APIs from official sources
- **Seamless Integration**: Works with popular coding assistants via CLI, Skills, and MCP (Model Context Protocol)
- **Version-Specific**: Supports querying documentation for specific library versions

## Key Features

1. **Dual Integration Modes**
   - CLI + Skills: Agent-guided documentation fetching using `ctx7` commands
   - MCP Server: Native tool integration for coding assistants

2. **Smart Library Resolution**
   - Intelligent library name matching
   - Context7 ID system for precise library targeting
   - Version-specific documentation retrieval

3. **Wide Agent Support**
   - Cursor, Claude Code, OpenCode, Cline, RooCode, and 30+ other clients
   - One-command setup via `npx ctx7 setup`

## Use Cases

- Generate up-to-date code examples for modern frameworks (Next.js, Supabase, etc.)
- Configure tools with current API patterns (Cloudflare Workers, middleware, etc.)
- Access version-specific documentation during development
- Reduce hallucinated or outdated code suggestions


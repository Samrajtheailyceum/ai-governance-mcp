# AI Governance MCP Server

A Model Context Protocol (MCP) server that gives any AI assistant real-time access to AI governance laws, regulations, and policy frameworks from around the world.

Compatible with **Claude, ChatGPT, Gemini, Copilot, Cursor, Windsurf**, and any MCP-compatible client. Runs locally (stdio) or as a hosted server (HTTP/SSE).

---

## Add This MCP Server

### Option A: Local (stdio) — Claude Desktop, Claude Code, Cursor, Windsurf

```bash
git clone https://github.com/Winnersammy/ai-governance-mcp.git
cd ai-governance-mcp
npm install
```

Then add to your platform's config (see [Platform Setup](#platform-setup) below).

### Option B: Remote (HTTP/SSE) — OpenAI, ChatGPT, platform connectors, team use

```bash
git clone https://github.com/Winnersammy/ai-governance-mcp.git
cd ai-governance-mcp
npm install
npm run start:sse
```

Server URL (local):
```
http://localhost:3100/sse
```

Health check: `http://localhost:3100/health`

Deploy to any hosting provider (Railway, Render, Fly.io, etc.) and use that URL instead.

---

## Platform Setup

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ai-governance": {
      "command": "node",
      "args": ["/absolute/path/to/ai-governance-mcp/src/index.js"]
    }
  }
}
```

Config file locations:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

**Important:** Restart Claude Desktop after editing the config.

### Claude Code (CLI)

```bash
claude mcp add ai-governance node /absolute/path/to/ai-governance-mcp/src/index.js
```

### Cursor

Add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "ai-governance": {
      "command": "node",
      "args": ["/absolute/path/to/ai-governance-mcp/src/index.js"]
    }
  }
}
```

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "ai-governance": {
      "command": "node",
      "args": ["/absolute/path/to/ai-governance-mcp/src/index.js"]
    }
  }
}
```

### OpenAI / ChatGPT / Assistants API

OpenAI requires a remote URL. Start the server in HTTP/SSE mode:

```bash
npm run start:sse
# or: PORT=3100 node src/index.js
```

Then use this as your MCP server endpoint:
```
http://localhost:3100/sse
```

For production, deploy the server and use the deployed URL.

### Any MCP-Compatible Client

**stdio mode** (default):
```bash
node /absolute/path/to/ai-governance-mcp/src/index.js
```
Communicate over stdin/stdout using the MCP JSON-RPC protocol.

**HTTP/SSE mode**:
```bash
PORT=3100 node /absolute/path/to/ai-governance-mcp/src/index.js
```
Connect to `http://localhost:3100/sse` using the MCP SSE transport.

---

## Available Tools

| Tool | Description |
|------|-------------|
| `search_ai_governance` | Full-text search across all databases |
| `get_latest_ai_governance_updates` | Latest updates from RSS feeds |
| `get_key_ai_governance_documents` | Curated list of landmark documents |
| `get_eu_ai_act_info` | EU AI Act deep dive with topic search |
| `get_us_ai_policy` | US policy landscape with Federal Register search |
| `get_global_ai_frameworks` | OECD, G7, UN, UNESCO, Bletchley and more |
| `fetch_governance_document` | Fetch and extract text from any document URL |
| `compare_ai_governance_frameworks` | Side-by-side comparison on a specific topic |

## Data Sources

| Region | Source | What's Covered |
|--------|--------|----------------|
| EU | EUR-Lex API + RSS | EU AI Act, GDPR, AI regulations |
| US | Federal Register API, GovInfo | Executive orders, federal agency rules, AI bills |
| Global | OECD, G7, UNESCO, UN | International frameworks and principles |
| News | Stanford HAI, AI Now, FLI | Research & policy news |

## Example Prompts

Once connected to any AI assistant, you can ask:

- *"What are the latest AI governance updates from the EU?"*
- *"Search for AI liability regulations"*
- *"Compare how the EU and US handle foundation model requirements"*
- *"Give me a summary of the EU AI Act's prohibited practices"*
- *"Fetch the NIST AI Risk Management Framework"*
- *"What US executive orders on AI are currently active?"*

## Testing

```bash
npm test
```

## Architecture

```
src/
├── index.js      — MCP server (stdio + HTTP/SSE) with 8 tool definitions
├── fetcher.js    — Data fetching (EUR-Lex, Fed Register, RSS, scraping)
└── sources.js    — Source configuration (URLs, key docs, feeds)

test/
└── client.js     — End-to-end test suite
```

## Caching

All API responses are cached in-memory for 30 minutes to avoid rate limiting and improve response speed.

## Adding New Sources

Edit `src/sources.js` to add new data sources, then add corresponding fetch logic in `src/fetcher.js`.

## License

MIT

# AI Governance MCP Server

A Model Context Protocol (MCP) server that gives any AI assistant — Claude, ChatGPT, Gemini, Copilot, or any MCP-compatible client — real-time access to AI governance laws, regulations, and policy frameworks from around the world.

Works as a **coded MCP server** (run locally via CLI) or as a **connector** in platforms that support MCP integrations.

## Data Sources

| Region | Source | What's Covered |
|--------|--------|----------------|
| EU | EUR-Lex API + RSS | EU AI Act, GDPR, AI regulations |
| US | Federal Register API, GovInfo | Executive orders, federal agency rules, AI bills |
| Global | OECD, G7, UNESCO, UN | International frameworks and principles |
| News | Stanford HAI, AI Now, FLI | Research & policy news |

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

## Installation

```bash
git clone https://github.com/Winnersammy/ai-governance-mcp.git
cd ai-governance-mcp
npm install
```

## Testing

```bash
npm test
```

## Running the Server

```bash
npm start
# or directly:
node src/index.js
```

The server communicates over **stdio** using the standard [Model Context Protocol](https://modelcontextprotocol.io), making it compatible with any MCP client.

---

## Setup by Platform

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

### Claude Code (CLI)

```bash
claude mcp add ai-governance node /absolute/path/to/ai-governance-mcp/src/index.js
```

### OpenAI (ChatGPT / Assistants API)

OpenAI supports MCP tool servers. To connect:

1. Run the server locally or deploy it (see [Deployment](#deployment) below)
2. Use an **MCP-to-HTTP bridge** (e.g. [mcp-proxy](https://github.com/nicholasgasior/mcp-proxy), [supergateway](https://github.com/nicholasgasior/supergateway)) to expose the stdio server over HTTP/SSE
3. Register the tools in your OpenAI Assistants or GPT configuration using the bridge URL

Example with a bridge:
```bash
# Expose the MCP server over SSE (Server-Sent Events)
npx supergateway --stdio "node /absolute/path/to/ai-governance-mcp/src/index.js" --port 3100
```

Then point your OpenAI integration to `http://localhost:3100`.

### Cursor

Add to your Cursor MCP config (`.cursor/mcp.json` in your project or `~/.cursor/mcp.json` globally):

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

Add to your Windsurf MCP config (`~/.codeium/windsurf/mcp_config.json`):

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

### Any MCP-Compatible Client

This server uses **stdio transport** — the standard MCP transport. Any client that supports the Model Context Protocol can connect by spawning:

```bash
node /absolute/path/to/ai-governance-mcp/src/index.js
```

and communicating over stdin/stdout using the MCP JSON-RPC protocol.

---

## Using as a Connector / Integration

If your platform supports MCP connectors (plug-and-play integrations), you can register this server as a connector:

1. **Hosted/managed platforms** — Deploy this server (see below), then add the HTTP/SSE endpoint as a tool connector in your platform's settings
2. **No-code platforms** — Use an MCP bridge to expose the tools as HTTP endpoints, then connect via your platform's API/webhook integration
3. **Custom agents** — Import the tools programmatically using the `@modelcontextprotocol/sdk` client library

---

## Deployment

To make the server accessible remotely (for OpenAI, team use, or platform connectors):

```bash
# Option 1: SSE bridge (lightweight)
npx supergateway --stdio "node src/index.js" --port 3100

# Option 2: Docker
docker build -t ai-governance-mcp .
docker run -p 3100:3100 ai-governance-mcp
```

You can deploy to any hosting provider (Railway, Render, Fly.io, AWS, etc.) and share the endpoint.

---

## Example Prompts

Once connected to any AI assistant, you can ask:

- *"What are the latest AI governance updates from the EU?"*
- *"Search for AI liability regulations"*
- *"Compare how the EU and US handle foundation model requirements"*
- *"Give me a summary of the EU AI Act's prohibited practices"*
- *"Fetch the NIST AI Risk Management Framework"*
- *"What US executive orders on AI are currently active?"*

## Architecture

```
src/
├── index.js      — MCP server + all 8 tool definitions
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

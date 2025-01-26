# MCP-researcher Server

Your own research assistant inside of cline! Utilizes Perplexity's new Sonar API to get docs, create up to date api routes, and check deprecated code while you create features with other LLMS (say through openrouter). 


## Tools

### 1. [Search](search.md)
Performs general search queries to get comprehensive information on any topic. The example shows how to use different detail levels (brief, normal, detailed) to get tailored responses.

### 2. [Get Documentation](get-documentation.md)
Retrieves documentation and usage examples for specific technologies, libraries, or APIs. The example demonstrates getting comprehensive documentation for React hooks, including best practices and common pitfalls.

### 3. [Find APIs](find-apis.md)
Discovers and evaluates APIs that could be integrated into a project. The example shows finding payment processing APIs with detailed analysis of features, pricing, and integration complexity.

### 4. [Check Deprecated Code](check-deprecated-code.md)
Analyzes code for deprecated features or patterns, providing migration guidance. The example demonstrates checking React class components and lifecycle methods for modern alternatives.


Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "perplexity-server": {
      "command": "node",
      "args": [
        ""
      ],
      "env": {
        "PERPLEXITY_API_KEY": ""
      },
      "disabled": false,
      "autoApprove": [
        "search",
        "get_documentation",
        "find_apis",
        "check_deprecated_code"
      ]
    }
  }
}
```

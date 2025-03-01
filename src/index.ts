#!/usr/bin/env node

const sdk = require("@modelcontextprotocol/sdk/dist/cjs/server/index.js");
const { createServer } = require("@modelcontextprotocol/sdk/dist/cjs/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/dist/cjs/server/stdio.js");
import { config } from "./config.js";
import { DatabaseService } from "./services/database.js";
import { PerplexityApi } from "./services/api.js";
import { ToolsService } from "./services/tools.js";
import type { Tool } from "./types.js";

class PerplexityServer implements sdk.McpToolsHandler {
  private server: sdk.Server;
  private db: DatabaseService;
  private api: PerplexityApi;
  private tools: ToolsService;

  constructor() {
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      throw new Error("PERPLEXITY_API_KEY environment variable is required");
    }

    // Initialize services
    this.db = new DatabaseService();
    this.api = new PerplexityApi(apiKey);
    this.tools = new ToolsService(this.db, this.api);

    // Create MCP server
    this.server = createServer(this, {
      name: config.server.name,
      version: config.server.version,
    });

    // Set up error handling
    this.server.onerror = (error: Error) => console.error("[MCP Error]", error);

    // Handle cleanup on exit
    process.on("SIGINT", this.cleanup.bind(this));
    process.on("SIGTERM", this.cleanup.bind(this));
  }

  // McpToolsHandler implementation
  async listTools(): Promise<{ tools: Tool[] }> {
    return {
      tools: this.tools.getToolDefinitions()
    };
  }

  async callTool(name: string, args: Record<string, unknown>) {
    const content = await this.tools.handleTool(name, args);
    return {
      content: [{
        type: "text",
        text: content,
      }],
    };
  }

  private async cleanup() {
    this.db.close();
    await this.server.close();
    process.exit(0);
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Perplexity MCP server running on stdio");
  }
}

// Start server
const server = new PerplexityServer();
server.run().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

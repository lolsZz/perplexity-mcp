#!/usr/bin/env node
"use strict";
const sdk = require("@modelcontextprotocol/sdk");
const { config } = require("./config");
const { DatabaseService } = require("./services/database");
const { PerplexityApi } = require("./services/api");
const { ToolsService } = require("./services/tools");
class PerplexityServer {
    server;
    db;
    api;
    tools;
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
        this.server = sdk.createServer(this, {
            name: config.server.name,
            version: config.server.version,
        });
        // Set up error handling
        this.server.onerror = (error) => console.error("[MCP Error]", error);
        // Handle cleanup on exit
        process.on("SIGINT", this.cleanup.bind(this));
        process.on("SIGTERM", this.cleanup.bind(this));
    }
    // McpToolsHandler implementation
    async listTools() {
        return {
            tools: this.tools.getToolDefinitions()
        };
    }
    async callTool(name, args) {
        const content = await this.tools.handleTool(name, args);
        return {
            content: [{
                    type: "text",
                    text: content,
                }],
        };
    }
    async cleanup() {
        this.db.close();
        await this.server.close();
        process.exit(0);
    }
    async run() {
        const transport = new sdk.StdioServerTransport();
        await this.server.connect(transport);
        console.error("Perplexity MCP server running on stdio");
    }
}
// Start server
const server = new PerplexityServer();
server.run().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});

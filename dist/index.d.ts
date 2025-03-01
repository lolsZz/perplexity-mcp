#!/usr/bin/env node
declare const sdk: any;
declare const config: any;
declare const DatabaseService: any;
declare const PerplexityApi: any;
declare const ToolsService: any;
declare class PerplexityServer {
    private server;
    private db;
    private api;
    private tools;
    constructor();
    listTools(): Promise<{
        tools: any;
    }>;
    callTool(name: string, args: Record<string, unknown>): Promise<{
        content: {
            type: string;
            text: any;
        }[];
    }>;
    private cleanup;
    run(): Promise<void>;
}
declare const server: PerplexityServer;

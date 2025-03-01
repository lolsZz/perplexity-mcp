declare module '../../../model-context-protocol/sdk/dist/cjs/server/index.js' {
    export interface Server {
        onerror: (error: Error) => void;
        connect(transport: any): Promise<void>;
        close(): Promise<void>;
    }

    export interface McpToolsHandler {
        listTools(): Promise<{ tools: Array<Tool> }>;
        callTool(name: string, args: any): Promise<{ content: Array<{ type: string; text: string }> }>;
    }

    export interface Tool {
        name: string;
        description: string;
        schema: {
            type: string;
            properties: Record<string, any>;
            required?: string[];
        };
    }
}

declare module '../../../model-context-protocol/sdk/dist/cjs/server/mcp.js' {
    import { Server, McpToolsHandler } from '../../../model-context-protocol/sdk/dist/cjs/server/index.js';
    export function createServer(handler: McpToolsHandler, options: { name: string; version: string }): Server;
}

declare module '../../../model-context-protocol/sdk/dist/cjs/server/stdio.js' {
    export class StdioServerTransport {
        constructor();
    }
}

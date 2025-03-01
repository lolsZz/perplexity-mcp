declare module '@modelcontextprotocol/sdk' {
    export interface ServerOptions {
        name: string;
        version: string;
    }

    export interface ToolResponse {
        content: Array<{
            type: string;
            text: string;
        }>;
    }

    export interface ListToolsResponse {
        tools: Array<{
            name: string;
            description: string;
            schema: {
                type: string;
                properties: Record<string, any>;
                required?: string[];
            };
        }>;
    }

    export interface McpToolsHandler {
        listTools(): Promise<ListToolsResponse>;
        callTool(name: string, args: Record<string, unknown>): Promise<ToolResponse>;
    }

    export class Server {
        onerror: (error: Error) => void;
        connect(transport: any): Promise<void>;
        close(): Promise<void>;
    }

    export class StdioServerTransport {}

    export function createServer(handler: McpToolsHandler, options: ServerOptions): Server;
}

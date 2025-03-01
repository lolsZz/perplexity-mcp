import type { DatabaseService } from "./database.js";
import type { PerplexityApi } from "./api.js";
import type { Tool } from "../types.js";
export declare class ToolsService {
    private db;
    private api;
    constructor(db: DatabaseService, api: PerplexityApi);
    getToolDefinitions(): Tool[];
    handleTool(name: string, args: any): Promise<string>;
}

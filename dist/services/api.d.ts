import type { ChatMessage } from "./database";
export declare class PerplexityApi {
    private client;
    constructor(apiKey: string);
    chat(messages: ChatMessage[]): Promise<string>;
    search(query: string, detailLevel?: "brief" | "normal" | "detailed"): Promise<string>;
    getDocumentation(query: string, context?: string): Promise<string>;
    findApis(requirement: string, context?: string): Promise<string>;
    checkDeprecatedCode(code: string, technology?: string): Promise<string>;
}

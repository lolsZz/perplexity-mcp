"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsService = void 0;
class ToolsService {
    db;
    api;
    constructor(db, api) {
        this.db = db;
        this.api = api;
    }
    getToolDefinitions() {
        return [
            {
                name: "chat_perplexity",
                description: "Maintains ongoing conversations with Perplexity AI. Creates new chats or continues existing ones with full history context.",
                schema: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            description: "The message to send to Perplexity AI"
                        },
                        chat_id: {
                            type: "string",
                            description: "Optional: ID of an existing chat to continue. If not provided, a new chat will be created."
                        }
                    },
                    required: ["message"]
                }
            },
            {
                name: "search",
                description: "Perform a general search query to get comprehensive information on any topic",
                schema: {
                    type: "object",
                    properties: {
                        query: {
                            type: "string",
                            description: "The search query or question"
                        },
                        detail_level: {
                            type: "string",
                            enum: ["brief", "normal", "detailed"],
                            description: "Optional: Desired level of detail"
                        }
                    },
                    required: ["query"]
                }
            },
            {
                name: "get_documentation",
                description: "Get documentation and usage examples for a specific technology, library, or API",
                schema: {
                    type: "object",
                    properties: {
                        query: {
                            type: "string",
                            description: "The technology, library, or API to get documentation for"
                        },
                        context: {
                            type: "string",
                            description: "Additional context or specific aspects to focus on"
                        }
                    },
                    required: ["query"]
                }
            },
            {
                name: "find_apis",
                description: "Find and evaluate APIs that could be integrated into a project",
                schema: {
                    type: "object",
                    properties: {
                        requirement: {
                            type: "string",
                            description: "The functionality or requirement you're looking to fulfill"
                        },
                        context: {
                            type: "string",
                            description: "Additional context about the project or specific needs"
                        }
                    },
                    required: ["requirement"]
                }
            },
            {
                name: "check_deprecated_code",
                description: "Check if code or dependencies might be using deprecated features",
                schema: {
                    type: "object",
                    properties: {
                        code: {
                            type: "string",
                            description: "The code snippet or dependency to check"
                        },
                        technology: {
                            type: "string",
                            description: "The technology or framework context (e.g., 'React', 'Node.js')"
                        }
                    },
                    required: ["code"]
                }
            }
        ];
    }
    async handleTool(name, args) {
        switch (name) {
            case "chat_perplexity": {
                const { message, chat_id = crypto.randomUUID() } = args;
                const history = this.db.getChatHistory(chat_id);
                const userMessage = { role: "user", content: message };
                this.db.saveChatMessage(chat_id, userMessage);
                const messages = [...history, userMessage];
                const response = await this.api.chat(messages);
                const assistantMessage = { role: "assistant", content: response };
                this.db.saveChatMessage(chat_id, assistantMessage);
                return JSON.stringify({ chat_id, response: assistantMessage.content }, null, 2);
            }
            case "search": {
                const { query, detail_level } = args;
                return await this.api.search(query, detail_level);
            }
            case "get_documentation": {
                const { query, context } = args;
                return await this.api.getDocumentation(query, context);
            }
            case "find_apis": {
                const { requirement, context } = args;
                return await this.api.findApis(requirement, context);
            }
            case "check_deprecated_code": {
                const { code, technology } = args;
                return await this.api.checkDeprecatedCode(code, technology);
            }
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    }
}
exports.ToolsService = ToolsService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerplexityApi = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_js_1 = require("../types/errors.js");
class PerplexityApi {
    client;
    constructor(apiKey) {
        if (!apiKey) {
            throw new errors_js_1.McpError(errors_js_1.ErrorCode.InvalidArgument, "PERPLEXITY_API_KEY environment variable is required");
        }
        this.client = axios_1.default.create({
            baseURL: "https://api.perplexity.ai",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
        });
    }
    async chat(messages) {
        try {
            const response = await this.client.post("/chat/completions", {
                model: "sonar-reasoning-pro",
                messages,
            });
            return response.data.choices[0].message.content;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new errors_js_1.McpError(errors_js_1.ErrorCode.InternalError, `Perplexity API error: ${error.response?.data?.error?.message || error.message}`);
            }
            throw error;
        }
    }
    async search(query, detailLevel = "normal") {
        let prompt = query;
        switch (detailLevel) {
            case "brief":
                prompt = `Provide a brief, concise answer to: ${query}`;
                break;
            case "detailed":
                prompt = `Provide a comprehensive, detailed analysis of: ${query}. Include relevant examples, context, and supporting information where applicable.`;
                break;
            default:
                prompt = `Provide a clear, balanced answer to: ${query}. Include key points and relevant context.`;
        }
        return this.chat([{ role: "user", content: prompt }]);
    }
    async getDocumentation(query, context) {
        const prompt = `Provide comprehensive documentation and usage examples for ${query}. ${context ? `Focus on: ${context}` : ""} Include:
    1. Basic overview and purpose
    2. Key features and capabilities
    3. Installation/setup if applicable
    4. Common usage examples
    5. Best practices
    6. Common pitfalls to avoid
    7. Links to official documentation if available`;
        return this.chat([{ role: "user", content: prompt }]);
    }
    async findApis(requirement, context) {
        const prompt = `Find and evaluate APIs that could be used for: ${requirement}. ${context ? `Context: ${context}` : ""} For each API, provide:
    1. Name and brief description
    2. Key features and capabilities
    3. Pricing model (if available)
    4. Integration complexity
    5. Documentation quality
    6. Community support and popularity
    7. Any potential limitations or concerns
    8. Code example of basic usage`;
        return this.chat([{ role: "user", content: prompt }]);
    }
    async checkDeprecatedCode(code, technology) {
        const prompt = `Analyze this code for deprecated features or patterns${technology ? ` in ${technology}` : ""}:

    ${code}

    Please provide:
    1. Identification of any deprecated features, methods, or patterns
    2. Current recommended alternatives
    3. Migration steps if applicable
    4. Impact of the deprecation
    5. Timeline of deprecation if known
    6. Code examples showing how to update to current best practices`;
        return this.chat([{ role: "user", content: prompt }]);
    }
}
exports.PerplexityApi = PerplexityApi;

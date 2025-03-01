export const config = {
  api: {
    baseUrl: "https://api.perplexity.ai",
    model: "sonar-reasoning-pro",
  },
  db: {
    path: process.env.PERPLEXITY_DB_PATH || "~/.perplexity-mcp/chat_history.db",
  },
  server: {
    name: "perplexity-server",
    version: "1.0.0",
  }
};

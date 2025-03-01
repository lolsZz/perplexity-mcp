export interface Tool {
  name: string;
  description: string;
  schema: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ToolResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export enum ErrorCode {
  InternalError = "INTERNAL_ERROR",
  InvalidArgument = "INVALID_ARGUMENT",
  NotFound = "NOT_FOUND",
  MethodNotFound = "METHOD_NOT_FOUND"
}

export class McpError extends Error {
  constructor(public code: ErrorCode, message: string) {
    super(message);
    this.name = "McpError";
  }
}

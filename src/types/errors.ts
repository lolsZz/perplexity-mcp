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

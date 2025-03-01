export declare enum ErrorCode {
    InternalError = "INTERNAL_ERROR",
    InvalidArgument = "INVALID_ARGUMENT",
    NotFound = "NOT_FOUND",
    MethodNotFound = "METHOD_NOT_FOUND"
}
export declare class McpError extends Error {
    code: ErrorCode;
    constructor(code: ErrorCode, message: string);
}

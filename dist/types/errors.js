"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.McpError = exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["InternalError"] = "INTERNAL_ERROR";
    ErrorCode["InvalidArgument"] = "INVALID_ARGUMENT";
    ErrorCode["NotFound"] = "NOT_FOUND";
    ErrorCode["MethodNotFound"] = "METHOD_NOT_FOUND";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
class McpError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = "McpError";
    }
}
exports.McpError = McpError;

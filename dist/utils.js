"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandHomeDir = expandHomeDir;
exports.ensureJsExtension = ensureJsExtension;
const os_1 = require("os");
const path_1 = require("path");
/**
 * Expands the tilde (~) in a path to the user's home directory
 */
function expandHomeDir(path) {
    if (path.startsWith("~/") || path === "~") {
        return (0, path_1.join)((0, os_1.homedir)(), path.slice(1));
    }
    return path;
}
/**
 * Ensures a string ends with .js extension for ESM imports
 */
function ensureJsExtension(path) {
    if (!path.endsWith(".js")) {
        return `${path}.js`;
    }
    return path;
}

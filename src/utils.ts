import { homedir } from "os";
import { join } from "path";

/**
 * Expands the tilde (~) in a path to the user's home directory
 */
export function expandHomeDir(path: string): string {
  if (path.startsWith("~/") || path === "~") {
    return join(homedir(), path.slice(1));
  }
  return path;
}

/**
 * Ensures a string ends with .js extension for ESM imports
 */
export function ensureJsExtension(path: string): string {
  if (!path.endsWith(".js")) {
    return `${path}.js`;
  }
  return path;
}

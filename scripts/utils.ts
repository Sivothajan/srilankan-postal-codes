// --- ANSI Color Helpers ---
export const fmt = {
  reset: "\x1b[0m",
  bold: (text: string) => `\x1b[1m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
  magenta: (text: string) => `\x1b[35m${text}\x1b[0m`,
  cyan: (text: string) => `\x1b[36m${text}\x1b[0m`,
  white: (text: string) => `\x1b[37m${text}\x1b[0m`,
};

// --- File Utilities ---
import * as fs from "fs";

/**
 * Checks if a file exists at the given path.
 * @param path File path
 */
export function fileExists(path: string): boolean {
  try {
    return fs.existsSync(path);
  } catch {
    return false;
  }
}

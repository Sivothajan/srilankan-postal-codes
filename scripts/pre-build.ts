import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { fmt } from "./utils";

// --- helper functions ---

/**
 * Detects the package manager used in the project.
 * Returns 'bun', 'pnpm', 'yarn', or 'npm'.
 */
function detectPackageManager(): "bun" | "pnpm" | "yarn" | "npm" {
  const versions = process.versions as NodeJS.ProcessVersions & {
    bun?: string;
  };

  // Check if running in Bun
  if (versions.bun) return "bun";

  const cwd = process.cwd();

  // Check for lockfiles to detect package manager
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(cwd, "package-lock.json"))) return "npm";

  return "npm"; // fallback
}

/**
 * Runs a command with the detected package manager.
 * @param cmd Command to run
 */
function run(cmd: string): void {
  const pm = detectPackageManager();

  // Determine full command based on package manager
  const full =
    pm === "bun"
      ? `bunx ${cmd}`
      : pm === "pnpm"
        ? `pnpm exec ${cmd}`
        : pm === "yarn"
          ? `yarn ${cmd}`
          : `npx ${cmd}`;

  execSync(full, { stdio: "inherit" }); // run synchronously with output
}

// --- resolve __dirname for ES modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Runs a TypeScript script located in the pre-build folder
 * @param file File name of the script
 */
const runScript = (file: string, ...args: string[]) => {
  // eslint-disable-next-line no-console
  console.log(
    // \x1b[34m => blue text for [STEP]
    // \x1b[0m => reset color to default
    `${fmt.blue("[STEP]")} Running ${file}...`,
  );
  run(`tsx "${path.join(__dirname, file)}" ${args.join(" ")}`);
};

// --- pre-build process ---
const preBuild = (): void => {
  // eslint-disable-next-line no-console
  console.log(
    // \x1b[36m => cyan text
    // \x1b[0m => reset to default
    fmt.cyan("Running all pre-build scripts...\n"),
  );

  // Run all pre-build scripts
  runScript(
    "public-assets-generator.ts",
    "--generate-favicons",
    "--generate-og",
  );

  // eslint-disable-next-line no-console
  console.log(
    // \x1b[1;32m => bold green text for success
    // \x1b[0m => reset to default
    fmt.bold(fmt.green("All pre-build scripts done!\n")),
  );
};

// --- conditional execution ---
const args = process.argv.slice(2);
const shouldPreBuild = args.includes("--pre-build");
if (shouldPreBuild) {
  preBuild();
} else {
  // eslint-disable-next-line no-console
  console.log(
    // \x1b[33m => yellow text for skipped message
    // \x1b[0m => reset color to default
    fmt.yellow(`--pre-build flag not set.\nSkipping pre-build scripts.\n`),
  );
}

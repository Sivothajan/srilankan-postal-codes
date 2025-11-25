declare module "eslint-define-config" {
  export function defineConfig<T = unknown>(config: T): T;
}

declare module "eslint-config-next/typescript";
declare module "eslint-config-prettier";
declare module "eslint-plugin-simple-import-sort";
declare module "eslint-plugin-unused-imports";
declare module "./eslint.global-ignores" {
  export function globalIgnores(patterns: string[]): void;
}

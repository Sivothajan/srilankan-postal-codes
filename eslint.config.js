import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierConfig from "eslint-config-prettier";
import babelEslintParser from "@babel/eslint-parser";
// to avoid depcheck warnings
import "@babel/preset-react";

export default [
  {
    ignores: ["dist", "node_modules", ".vercel"],
  },

  // Frontend (React + Vite)
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      parser: babelEslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        requireConfigFile: false,
        babelOptions: {
          plugins: ["@babel/plugin-syntax-jsx"],
        },
      },

      globals: {
        ...globals.browser,
        "import.meta": "readonly",
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];

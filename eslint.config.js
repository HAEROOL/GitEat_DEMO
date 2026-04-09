import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    ignores: ["node_modules", "dist", ".yarn", "build"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginPrettierRecommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  }
);

import js from "@eslint/js"
import globals from "globals"
import prettier from "eslint-config-prettier"
import eslintPluginPrettier from "eslint-plugin-prettier"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import eslintPluginImport from "eslint-plugin-import"

export default tseslint.config(
  { ignores: ["dist"] },
  prettier,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "import": eslintPluginImport,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "import/order": [
        "error",
        {
          "groups": [
            ["builtin"],
            ["external"],
            ["internal"], // Node.js 기본 및 외부 모듈 // 내부 모듈 (alias 기반)
            ["parent", "sibling", "index"], // 상위, 형제, 인덱스 파일
          ],
          "pathGroups": [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "react-dom",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/app/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/pages/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/widgets/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/features/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/entities/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/shared/**",
              group: "internal",
              position: "before",
            },
          ],
          "pathGroupsExcludedImportTypes": ["builtin"],
          "alphabetize": {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
    },
  },
)

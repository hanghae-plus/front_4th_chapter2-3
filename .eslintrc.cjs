module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-refresh", "import"],
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["**/features/*/ui/**/*.{ts,tsx}", "**/entities/*/ui/**/*.{ts,tsx}", "!**/index.{ts,tsx}"],
            message: "UI 컴포넌트는 index 파일을 통해서만 import 해야 합니다.",
          },
        ],
      },
    ],

    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "./src/entities",
            from: "./src/(features|widgets|pages|app)",
            message: "Entities cannot import upper layers",
          },
          {
            target: "./src/features",
            from: "./src/(widgets|pages|app)",
            message: "Features cannot import upper layers",
          },
          {
            target: "./src/widgets",
            from: "./src/(pages|app)",
            message: "Widgets cannot import upper layers",
          },
          {
            target: "./src/pages",
            from: "./src/app",
            message: "Pages cannot import from app layer",
          },
        ],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}

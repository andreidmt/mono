module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // Project property needs to be set in the project's own .eslintrc
    // project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      importAssertions: true,
    },
  },
  env: {
    browser: false,
    es2021: true,
    node: true,
  },
  ignorePatterns: ["node_modules", "dist", "coverage", "build"],
  plugins: [],
  extends: [
    "airbnb",
    "airbnb-typescript",
    ...[
      "../rules/base.js",
      "../rules/jsdoc.js",
      "../rules/import.js",
      "../rules/typescript.js",
      "../rules/unicorn.js",
      "../rules/prettier.js",
    ].map(require.resolve),
  ],
  rules: {
    "no-console": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: {
          i: false,
          params: false,
          lib: false,
          args: {
            params: true,
          },
          props: {
            options: true,
          },
          fn: false,
          acc: false,
        },
      },
    ],
  },
}

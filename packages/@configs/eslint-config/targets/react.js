module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: false,
  },
  plugins: ["testing-library"],
  extends: [
    "airbnb",
    "airbnb-typescript",
    ...[
      "../rules/base.js",
      "../rules/jsdoc.js",
      "../rules/import.js",
      "../rules/typescript.js",
      "../rules/react.js",
      "../rules/unicorn.js",
      // "../rules/jest.js",
      "../rules/prettier.js",
    ].map(require.resolve),
  ],
  rules: {},
  overrides: [
    {
      files: ["**/?(*.)test.tsx"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  settings: {
    "react": {
      version: "detect",
    },

    "import/resolver": "node",

    /*
     * A list of regex strings that, if matched by a path, will not report
     * the matching module if no exports are found.
     */
    "import/ignore": [".(sass|scss|less|css)$"],
  },
}

module.exports = {
  plugins: ["testing-library", "jest"],
  extends: ["plugin:jest/recommended"],
  rules: {
    "jest/require-top-level-describe": "error",
    "jest/consistent-test-it": [
      "error",
      {
        fn: "test",
        withinDescribe: "test",
      },
    ],
    "jest/valid-title": [
      "error",
      {
        mustMatch: {
          test: "^given \\[.*\\] should \\[.*\\]$",
        },
      },
    ],
  },
  overrides: [
    {
      files: ["**/?(*.)test.tsx"],
      extends: ["plugin:testing-library/react"],
    },
  ],
}

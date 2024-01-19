module.exports = {
  plugins: ["@typescript-eslint"],
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    // Conflicts with TypeScript's own error where accessing a property that
    // doesn't exist on a type must be accessed with index notation.
    "@typescript-eslint/dot-notation": "off",

    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "{}": false,
        },
        extendDefaults: true,
      },
    ],

    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        leadingUnderscore: "allow",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
      },
      {
        selector: "variable",
        types: ["boolean"],
        format: ["camelCase", "PascalCase"],
        prefix: ["is", "has", "can", "does", "should", "will", "did", "was"],
      },
      {
        selector: "variable",
        types: ["boolean", "number", "string", "array"],
        modifiers: ["const", "global"],
        format: ["UPPER_CASE"],
      },
      {
        selector: "typeAlias",
        format: ["PascalCase"],
      },
      {
        selector: "typeParameter",
        format: ["PascalCase"],
      },
      {
        selector: [
          "classProperty",
          "objectLiteralProperty",
          "typeProperty",
          "classMethod",
          "objectLiteralMethod",
          "typeMethod",
          "accessor",
          "enumMember",
        ],
        format: null,
      },
    ],
  },
}

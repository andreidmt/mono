module.exports = {
  plugins: ["import"],
  extends: ["plugin:import/recommended", "plugin:import/typescript"],
  rules: {
    /*
     * If a default import is requested, this rule will report if there is
     * no default export in the imported module.
     */
    "import/default": "error",

    /*
     * Reports funny business with exports, like repeated exports of names
     * or defaults.
     */
    "import/export": "error",

    /*
     * If only one export in file, prefer default export.
     */
    "import/prefer-default-export": "off",

    /*
     * Enforces names exist at the time they are dereferenced, when
     * imported as a full namespace (i.e. import * as foo from './foo';
     * foo.bar(); will report if bar is not exported by ./foo.).
     */
    "import/namespace": [
      "error",
      {
        allowComputed: true,
      },
    ],

    // Reports if a resolved path is imported more than once.
    "import/no-duplicates": "error",

    /*
     * Reports use of an exported name as the locally imported name of a
     * default export.
     */
    "import/no-named-as-default": "error",

    // Reports use of an exported name as a property on the default export.
    "import/no-named-as-default-member": "error",

    /*
     * Warn if a module could be mistakenly parsed as a script by a
     * consumer leveraging Unambiguous JavaScript Grammar to determine
     * correct parsing goal.
     */
    "import/unambiguous": "off",

    /*
     * Enforces that all exports are declared at the bottom of the file.
     * This rule will report any export declarations that comes before any
     * non-export statements.
     */
    "import/exports-last": "error",

    /*
     * TypeScript compilation already ensures that named imports exist in the
     * referenced module
     */
    "import/named": "off",

    // Typescript handles file resolving
    "import/no-unresolved": "off",

    /*
     * A list of file extensions that will be parsed as modules and
     * inspected for exports.
     */
    "import/extensions": [
      "error",
      "always",
      {
        ignorePackages: true,
      },
    ],

    /*
     * Sort imports
     */
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },

  settings: {
    "import/external-module-folders": ["node_modules", "node_modules/@types"],

    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".d.ts"],
    },

    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx", ".d.ts", ".js", ".jsx"],
      },
    },
  },
}

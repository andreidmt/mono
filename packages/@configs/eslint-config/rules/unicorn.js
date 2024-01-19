/* eslint-env node */

module.exports = {
  plugins: ["unicorn"],

  extends: "plugin:unicorn/recommended",

  /*
   * Disabled by prettier
   * https://github.com/prettier/eslint-config-prettier/blob/master/unicorn.js
   *
   * "unicorn/number-literal-case": "off"
   */
  rules: {
    // We like functional programming
    "unicorn/no-array-for-each": "off",

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
          props: false,
          opts: {
            props: true,
          },
          options: {
            props: true,
          },
          fn: false,
          acc: false,
        },
      },
    ],

    // Move function definitions to the highest possible scope.
    // Too noisy when curring functions
    "unicorn/consistent-function-scoping": "off",

    // Improve regexes by making them shorter, consistent, and safer
    "unicorn/better-regex": "error",

    // Enforce a specific parameter name in catch clauses
    "unicorn/catch-error-name": "error",

    // Add expiration conditions to TODO comments
    "unicorn/expiring-todo-comments": "warn",

    /*
     * Extension to ESLint's no-process-exit rule, that allows process.exit()
     * to be called in files that start with a hashbang → #!/usr/bin/env node.
     * It also allows process.exit() to be called in process.on('<event>',
     * func) event handlers.
     */
    "unicorn/no-process-exit": "error",

    // Prevents passing a function reference directly to iterator methods
    "unicorn/no-fn-reference-in-iterator": "off",

    // Prevent passing a function reference directly to iterator methods
    "unicorn/no-array-callback-reference": "off",

    /*
     * Enforces importing index file with . instead of ./, ./index or
     * ./index.js.
     */
    "unicorn/import-index": "off",

    // Enforce specific import styles per module

    /*
     * Enforces the use of the spread operator over Array.from(). This rule
     * adds on to the built-in prefer-spread rule, which only flags uses of
     * .apply(). Does not enforce for TypedArray.from();
     */
    "unicorn/prefer-spread": "error",

    /*
     * Enforces the use of, for example, foo.addEventListener('click',
     * handler); over foo.onclick = handler; for HTML DOM Events. There are
     * numerous advantages of using addEventListener. Some of these advantages
     * include registering unlimited event handlers and optionally having the
     * event handler invoked only once.
     */
    "unicorn/prefer-add-event-listener": "error",

    // Prefer String#slice() over String#substr() and String#substring()
    "unicorn/prefer-string-slice": "error",

    // Prefer String#trimStart() / String#trimEnd() over
    // String#trimLeft() / String#trimRight()
    "unicorn/prefer-string-trim-start-end": "error",

    /*
     * Enforces all linted files to have their names in a certain case
     * style. Default is kebabCase.
     *
     * kebabCase:
     *      foo-bar.js
     *      foo-bar.test.js
     *      foo-bar.test-utils.js
     */
    "unicorn/filename-case": "off",

    // Enforce explicitly comparing the length property of a value
    "unicorn/explicit-length-check": [
      "error",
      {
        "non-zero": "not-equal",
      },
    ],

    // Require new when throwing an error
    "unicorn/throw-new-error": "error",

    // Require escape sequences to use uppercase values
    "unicorn/escape-case": "error",

    // Require Array.isArray() instead of instanceof Array
    "unicorn/no-instanceof-array": "error",

    /*
     * Enforce the use of Buffer.from() and Buffer.alloc() instead of the
     * deprecated new Buffer()
     */
    "unicorn/no-new-buffer": "error",

    // Enforce the use of unicode escapes instead of hexadecimal escapes
    "unicorn/no-hex-escape": "error",

    // Enforce correct Error subclassing
    "unicorn/custom-error-definition": "error",

    // Enforce throwing TypeError in type checking conditions
    "unicorn/prefer-type-error": "error",

    /*
     * Enforce the use of new for all builtins, except String, Number and
     * Boolean
     */
    "unicorn/new-for-builtins": "error",

    /*
     * Disallow unsafe regular expressions. Uses safe-regex to disallow
     * potentially catastrophic exponential-time regular expressions.
     */
    "unicorn/no-unsafe-regex": "error",

    // Enforce passing a message value when throwing a built-in error
    "unicorn/error-message": "error",
  },
}

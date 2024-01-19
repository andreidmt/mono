module.exports = {
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
  rules: {
    /**
     * If a block (for example after if, else, for or while) contains only one
     * statement, JavaScript allows omitting the curly braces around that
     * statement. This rule enforces if or when those optional curly
     * braces should be omitted.
     *
     * ! Needs to be Prettier compatible:
     * https://github.com/prettier/eslint-config-prettier#curly
     */
    curly: ["error", "all"],
  },
}

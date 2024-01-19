module.exports = {
  extends: ["plugin:jsdoc/recommended"],
  rules: {
    "jsdoc/check-indentation": "error",
    "jsdoc/check-alignment": "error",
    "jsdoc/no-bad-blocks": "error",
    "jsdoc/require-asterisk-prefix": ["error", "always"],
    "jsdoc/sort-tags": "error",

    "jsdoc/require-property-description": "off",
    "jsdoc/require-param-description": "off",
    "jsdoc/require-returns-description": "off",
  },
}

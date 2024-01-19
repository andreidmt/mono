module.exports = {
  plugins: ["monorepo"],
  rules: {
    // Forbids importing specific files from a monorepo package.
    "monorepo/no-internal-import": "error",

    // Forbids importing other packages from the monorepo with a relative path.
    "monorepo/no-relative-import": "error",
  },
}

/** @typedef {import('metalsmith').Plugin} MetalPlugin */
/** @typedef {import('metalsmith').File} MetalFile */

/**
 * Metalsmith plugin
 * @param {object} [options]
 * @param {string | string[]} [options.pattern]
 * @returns {MetalPlugin}
 */
const metalsmithPlugin =
  ({ pattern = ["**/*.md"] } = {}) =>
  (files, metalsmith) => {
    const matchingFiles = metalsmith.match(pattern, Object.keys(files))

    matchingFiles.forEach(relativeFilePath => {
      const file = /** @type {MetalFile} */ (files[relativeFilePath])
      const contents = file.contents.toString()
      const newContents = `...${contents}...`

      file.contents = Buffer.from(newContents)
    })
  }

export { metalsmithPlugin }

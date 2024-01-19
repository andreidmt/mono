/** @typedef {import('@primer/octicons').Icon} OcticonIcon */
/** @typedef {import('@primer/octicons').IconName} OcticonIconName */

import octicons from "@primer/octicons"
import emojione from "emojione"

const EMOJI_REGEXP = /:([a-z-]*):/g

/**
 * Metalsmith plugin to replace emoji shortcodes with SVGs
 * @param {object} [options]
 * @param {string[]} [options.pattern]
 * @returns {import('metalsmith').Plugin}
 */
const emoji =
  ({ pattern = ["**/*.md"] } = {}) =>
  (metalFiles, metalsmith) => {
    const matchedFiles = metalsmith.match(pattern, Object.keys(metalFiles))
    const debug = metalsmith.debug("emoji")

    debug(`Found ${matchedFiles.length} JS files under ${pattern}`)

    matchedFiles.forEach(relativeFilePath => {
      const metalFile = /** @type {import('metalsmith').File} */ (metalFiles[relativeFilePath])
      const contents = metalFile.contents.toString()

      const withUnicode = emojione.shortnameToUnicode(contents)
      const withOcticons = withUnicode.replaceAll(
        EMOJI_REGEXP,
        (match, group) => {
          const iconName = /** @type {OcticonIconName} */ (group)
          const icon = /** @type {OcticonIcon} */ (octicons[iconName])

          return icon ? icon.toSVG() : match
        }
      )

      metalFile.contents = Buffer.from(withOcticons)
    })
  }

export { emoji }

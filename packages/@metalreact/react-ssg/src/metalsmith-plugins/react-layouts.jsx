/* eslint-disable unicorn/no-await-expression-member */

/** @typedef {import('metalsmith').Plugin} MetalPlugin */
/** @typedef {import('metalsmith').File} MetalFile */
/** @typedef {import('metalsmith').Debugger} MetalDebugger */
/** @typedef {import('react')} React */

import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import { importDefault } from "@andreidmt/utils-import"
import { renameFile } from "@andreidmt/utils-path"
import ReactDOMServer from "react-dom/server"

import { FrontmatterProvider } from "../react-hooks/use-frontmatter.js"
import { MetalsmithProvider } from "../react-hooks/use-metalsmith.js"

/**
 * Compile JS to HTML. The file needs to export a React component as default
 * and already have been transpiled to JS.
 * @param {string} input
 * @param {object} options
 * @param {Record<string, unknown>} [options.frontmatter] Frontmatter metadata
 * @param {Record<string, unknown>} [options.metadata] Metalsmith metadata
 * @param {string} options.layoutPath File path to the layout component
 * @returns {Promise<string>} Compiled HTML code
 */
const applyLayoutOver = async (
  input,
  { frontmatter, metadata, layoutPath }
) => {
  const LayoutComponent =
    /** @type {React.ComponentType<React.PropsWithChildren>} */ (
      await importDefault(layoutPath)
    )

  return ReactDOMServer.renderToStaticMarkup(
    <MetalsmithProvider data={metadata}>
      <FrontmatterProvider data={frontmatter}>
        <LayoutComponent __dangerouslySetInnerHTML={{ __html: input }} />
      </FrontmatterProvider>
    </MetalsmithProvider>
  )
}

/**
 * @typedef {object} ReactSSGOptions
 * @property {string[]} [pattern]
 * @property {object} layout
 * @property {string} [layout.default]
 * @property {string} layout.directory
 */

/**
 * @param {ReactSSGOptions} options
 * @returns {MetalPlugin}
 */
export const reactLayouts = ({ pattern = ["**/*.js", "*.js"], layout }) => {
  return async (metalFiles, metalsmith) => {
    const matchedFilePaths = metalsmith.match(pattern, Object.keys(metalFiles))
    const debug = metalsmith.debug("reactLayouts")

    if (matchedFilePaths.length === 0) {
      debug(`No files found under ${pattern}`)
      return
    }

    debug(`Found ${matchedFilePaths.length} JS files under ${pattern}`)

    const matchedFiles = Object.entries(metalFiles).filter(([key]) =>
      matchedFilePaths.includes(key)
    )
    const metalsmithMetadata = metalsmith.metadata() as Record<string, unknown>

    const compilePromises = matchedFiles.map(async metalFile => {
      const fileLayout = /** @type {string} */ (metalFile["layout"])

      debug(`Compiling ${sourceFilePath}`)

      try {
        const htmlContents = await applyLayoutOver(sourceFileCachePath, {
          layoutPath: fileLayout
            ? path.join(CACHE_FOLDER_PATH, layout.directory, fileLayout)
            : undefined,
        })
        const htmlFileName = renameFile(sourceFilePath, { ext: ".html" })

        // Metalsmith housekeeping, replace JS file with HTML file
        metalFile.contents = Buffer.from(htmlContents)
        metalFiles[htmlFileName] = metalFile
        delete metalFiles[sourceFilePath]
      } catch (error) {
        console.error(error)
      }
    })

    await Promise.all(compilePromises)
  }
}

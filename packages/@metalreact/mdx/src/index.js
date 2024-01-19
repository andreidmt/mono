/** @typedef {import('metalsmith').Plugin} MetalPlugin */
/** @typedef {import('metalsmith').File} MetalFile */
/** @typedef {import('metalsmith').Debugger} MetalDebugger */

import { writeFile, mkdir, readFile } from "node:fs/promises"
import { join } from "node:path"

import { generateHash } from "@andreidmt/utils-crypto"
import { canAccess } from "@andreidmt/utils-fs"
import { renameFile } from "@andreidmt/utils-path"
import { compile } from "@mdx-js/mdx"
import remarkGfm from "remark-gfm"

const CACHE_FOLDER_PATH = join(process.cwd(), ".cache", "mdx")

/**
 * Compile an MDX file to JS
 * @param {string} input MDX file contents
 * @returns {Promise<string>} JS code
 */
const compileMDXToJS = async input => {
  const fileHash = generateHash(input)
  const cachePath = join(CACHE_FOLDER_PATH, `${fileHash}.js`)
  const doesCacheExist = await canAccess(cachePath)

  if (doesCacheExist) {
    const cachedCompiledJS = await readFile(cachePath)

    return cachedCompiledJS.toString()
  }

  const compiledJS = (
    await compile(input, {
      remarkPlugins: [remarkGfm],
    })
  ).toString()

  await writeFile(cachePath, compiledJS)

  return compiledJS
}

/**
 * @typedef {object} ParseMDXToHTMLOptions
 * @property {string[]} [pattern]
 */

/**
 * Turn MDX files into HTML files using @mdx-js/mdx and react-dom/server
 * @param {ParseMDXToHTMLOptions} [options]
 * @returns {MetalPlugin}
 */
const mdx = ({ pattern = ["**/*.mdx", "*.mdx"] } = {}) => {
  // Ensure cache folder exists
  mkdir(CACHE_FOLDER_PATH, { recursive: true })

  return async (files, metalsmith) => {
    const matchedFilePaths = metalsmith.match(pattern, Object.keys(files))
    const debug = metalsmith.debug("mdx")

    if (matchedFilePaths.length === 0) {
      debug(`No files found under ${pattern}`)
      return
    }

    debug(`Found ${matchedFilePaths.length} files under ${pattern}`)

    /** @type {[string, MetalFile][]} */
    const matchedEntries = matchedFilePaths.map(filePath => [
      filePath,
      files[filePath],
    ])

    const compilePromises = matchedEntries.map(async ([filePath, file]) => {
      debug(`Compiling ${filePath}`)

      try {
        const jsContent = await compileMDXToJS(file.contents.toString())
        const jsFilePath = renameFile(filePath, { ext: ".js" })

        // Metalsmith housekeeping, replace MDX file with JS file
        file.contents = Buffer.from(jsContent)
        files[jsFilePath] = file
        delete files[filePath]
      } catch (error) {
        console.error(error)
      }
    })

    await Promise.all(compilePromises)
  }
}

export { mdx }

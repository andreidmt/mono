/** @typedef {import('metalsmith').Plugin} MetalPlugin */
/** @typedef {import('metalsmith').File} MetalFile */
/** @typedef {import('metalsmith').Debugger} MetalDebugger */
/** @typedef {import('@swc/core').Options} SWCOptions */

import { mkdir, readFile, writeFile } from "node:fs/promises"
import path, { join } from "node:path"

import { generateHash } from "@andreidmt/utils-crypto"
import { canAccess } from "@andreidmt/utils-fs"
import { renameFile } from "@andreidmt/utils-path"
import { bold } from "@andreidmt/utils-text"
import { transform } from "@swc/core"

const CACHE_FOLDER_PATH = path.join(process.cwd(), ".cache", "swc")

/**
 * Compile a JSX/TSX file to JS
 * @param {string} input JSX/TSX file contents
 * @param {SWCOptions} [options]
 * @returns {Promise<string>} JS code
 */
const transpile = async (input, options) => {
  const fileHash = generateHash(input)
  const cachePath = join(CACHE_FOLDER_PATH, `${fileHash}.js`)
  const doesCacheExist = await canAccess(cachePath)

  if (doesCacheExist) {
    const cachedCompiledJS = await readFile(cachePath)

    return cachedCompiledJS.toString()
  }

  const { code } = await transform(input, {
    sourceMaps: false,
    isModule: true,
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
        dynamicImport: true,
      },
      target: "esnext",
      transform: {
        react: {
          useBuiltins: true,
          runtime: "automatic",
        },
      },
    },
    ...options,
  })

  await writeFile(cachePath, code)

  return code
}

/**
 * @typedef {object} SWCTransformOptions
 * @property {string | string[]} [pattern]
 * @property {SWCOptions} [options]
 */

/**
 * Metalsmith plugin convert JSX/TSX files to JS files using SWC
 * @param {SWCTransformOptions} [options]
 * @returns {MetalPlugin}
 */
const swc = ({
  pattern = ["*.(js|jsx|ts|tsx)", "**/*.(js|jsx|ts|tsx)"],
  options,
} = {}) => {
  mkdir(CACHE_FOLDER_PATH, { recursive: true })

  return async (metalFiles, metalsmith) => {
    const matchedFiles = metalsmith.match(pattern, Object.keys(metalFiles))
    const debug = metalsmith.debug("swc")

    debug(`Found ${bold(matchedFiles.length)} files under ${bold(pattern)}`)

    const transformPromises = matchedFiles.map(async sourceFilePath => {
      const metalFile = /** @type {MetalFile} */ (metalFiles[sourceFilePath])

      debug(`Compiling ${bold(sourceFilePath)}`)

      try {
        const jsFileName = renameFile(sourceFilePath, { ext: ".js" })
        const jsContent = await transpile(metalFile.contents.toString(), {
          filename: sourceFilePath,
          ...options,
        })

        // Metalsmith housekeeping, replace source JSX/TSX file with
        // compiled JS file
        metalFile.contents = Buffer.from(jsContent)
        metalFiles[jsFileName] = metalFile
        delete metalFiles[sourceFilePath]
      } catch (error) {
        console.error(`Error compiling ${sourceFilePath}`)
        console.error(error)
      }
    })

    await Promise.all(transformPromises)
  }
}

export { swc }

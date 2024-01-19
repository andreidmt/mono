/** @typedef {import('metalsmith').Plugin} MetalPlugin */
/** @typedef {import('metalsmith').Debugger} MetalDebugger */

import path from "node:path"
import fs, { writeFile, mkdir } from "node:fs/promises"

import { readFilesFromDisk } from "./utils/fs.js"
import { bold } from "./utils/text.js"

/**
 * @typedef {object} FlushToDiskOptions
 * @property {boolean} [shouldSync]
 */

/**
 * Metalsmith plugin that writes all files from the Metalsmith object to disk
 * @param {FlushToDiskOptions} [options]
 * @returns {MetalPlugin}
 */
const flushToDisk =
  ({ shouldSync = true } = {}) =>
  async (files, metalsmith) => {
    const debug = metalsmith.debug("flushToDisk")
    const fileEntries = Object.entries(files)

    debug(
      `Writing ${bold(fileEntries.length)} files to ${metalsmith.destination()}`
    )

    // Write files Promise.all to parallelize vs for-loop sequential
    const fileWritePromises = fileEntries.map(
      async ([relativeFilePath, file]) => {
        const fileContents = file.contents.toString()
        const filePath = path.join(metalsmith.destination(), relativeFilePath)

        // debug(`Writing ${relativeFilePath}`)

        await mkdir(path.dirname(filePath), { recursive: true })
        await writeFile(filePath, fileContents)
      }
    )

    await Promise.all(fileWritePromises)

    if (shouldSync) {
      const filesOnDisk = await readFilesFromDisk(metalsmith.destination(), {
        relativeTo: metalsmith.destination(),
      })

      // Write files Promise.all to parallelize vs for-loop sequential
      const fileDeletePromises = filesOnDisk
        .map(fileOnDisk => {
          if (!files[fileOnDisk]) {
            debug(`Deleting ${bold(fileOnDisk)}`)

            return fs.rm(path.join(metalsmith.destination(), fileOnDisk))
          }

          return undefined
        })
        .filter(input => input)

      debug(
        `Syncing files (deleting ${bold(
          fileDeletePromises.length
        )} files not in Metalsmith object`
      )

      await Promise.all(fileDeletePromises)
    }
  }

export { flushToDisk }

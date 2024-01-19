import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

/**
 * Write all Metalsmith files to disk
 * @param {[string, import('metalsmith').File][]} input
 * @param {object} options
 * @param {string} options.destination
 * @returns {Promise<void[]>}
 */
export const writeAllFiles = async (input, { destination }) => {
  const writePromises = input.map(async ([relativePath, file]) => {
    const contents = file.contents.toString()
    const fullPath = path.join(destination, relativePath)

    await mkdir(path.dirname(fullPath), { recursive: true })

    return writeFile(fullPath, contents)
  })

  return Promise.all(writePromises)
}

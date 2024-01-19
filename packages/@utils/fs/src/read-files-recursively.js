import { readdir } from "node:fs/promises"
import path from "node:path"

/**
 * Recursivly read all files from a folder
 * @param {string} folderPath
 * @param {object} [options]
 * @param {string} [options.relativeTo]
 * @returns {Promise<string[]>}
 */
export const readFilesRecursively = async (folderPath, { relativeTo } = {}) => {
  const files = await readdir(folderPath, { withFileTypes: true })

  // Read files from disk using Promise.all to parallelize the reads as oposed
  // to using a for loop, which would be sequential.
  const filePathsPromises = files.map(async file => {
    if (file.isDirectory()) {
      const subFiles = await readFilesRecursively(
        path.join(folderPath, file.name),
        { relativeTo }
      )

      return subFiles
    }
    const fileFullPath = path.join(folderPath, file.name)
    const filePath = relativeTo
      ? path.relative(relativeTo, fileFullPath)
      : fileFullPath

    return filePath
  })

  const nestedFilePaths = await Promise.all(filePathsPromises)

  return nestedFilePaths.flat()
}

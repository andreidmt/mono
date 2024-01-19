import { bold } from "@andreidmt/utils-text"
import { File, Plugin } from "metalsmith"

type FieldSetter = (path: string, file: File) => unknown

type FileMetadataOptions = {
  pattern?: string | string[]
  fields: Record<string, FieldSetter>
}

/**
 * Metalsmith plugin to add custom metadata to files.
 * @example
 * import { fileMetadata } from "@metalreact/file-metadata"
 *
 * const metalsmith = Metalsmith("./")
 *  .source("src")
 *  .destination("build")
 *  .use(
 *   fileMetadata({
 *     "createdAt": (filePath, file) =>
 *       file["created-at"]
 *         ? new Date(file["created-at"])
 *         : file.stats?.ctime,
 *     "updatedAt": (filePath, file) => file.stats?.mtime,
 *   })
 */

export type FileMetadata = (
  options: FileMetadataOptions | FileMetadataOptions[]
) => Plugin

export const fileMetadata: FileMetadata = options => {
  const optionsSets = Array.isArray(options) ? options : [options]

  return (files, metalsmith) => {
    const debug = metalsmith.debug("fileMetadata")

    optionsSets.forEach(({ pattern = ["**/*", "*"], fields }) => {
      const matchedFilePaths = metalsmith.match(pattern, Object.keys(files))

      if (matchedFilePaths.length === 0) {
        debug(`No files found under ${bold(pattern)}`)
        return
      }

      debug(
        `Found ${bold(matchedFilePaths.length)} files under ${bold(pattern)}`
      )

      matchedFilePaths
        .map(filePath => [filePath, files[filePath]] as [string, File])
        .forEach(([filePath, file]) => {
          Object.entries(fields).forEach(([name, callback]) => {
            file[name] = callback(filePath, file)
          })
        })
    })
  }
}

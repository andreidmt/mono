import path from "node:path"

/**
 * Rename a file name (path.name) or extension (path.ext)
 * @param {string} input File name or path
 * @param {object} options
 * @param {string} [options.name]
 * @param {string} [options.ext]
 * @returns {string} File name or path with new values
 * @example
 * renameFile('example.md', { name: 'example2' })
 * //=> 'example2.md'
 * @example
 * renameFile('example.md', { ext: '.txt' })
 * //=> 'example.txt'
 * @example
 * renameFile('relative/path/example.md', { name: 'example2' })
 * //=> 'relative/path/example2.md'
 */
export const renameFile = (input, { name: nextName, ext: nextExtension }) => {
  const { name, dir, ext } = path.parse(input)

  return path.join(dir, `${nextName ?? name}${nextExtension ?? ext}`)
}

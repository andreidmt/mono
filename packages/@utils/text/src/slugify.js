/**
 * Slugify a string.
 * - Convert to lowercase
 * - Turn all non alphanumeric characters into dashes
 * - Remove duplicate dashes
 * - Remove leading and trailing dashes
 * @param {string} input
 * @returns {string}
 */
export const slugify = input => {
  return input
    .toLowerCase()
    .replaceAll(/\W+/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-|-$/g, "")
}

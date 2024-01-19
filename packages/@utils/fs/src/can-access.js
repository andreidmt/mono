import { access } from "node:fs/promises"

/**
 * Predicate to check if file or folder exists
 * @param {string} input
 * @returns {Promise<boolean>}
 */
export const canAccess = async input => {
  try {
    await access(input)
    return true
  } catch {
    return false
  }
}

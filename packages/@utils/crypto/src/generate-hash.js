import { createHash } from "node:crypto"

/**
 * Generate an MD5 hash from a string
 * @param {string} input
 * @returns {string}
 */
export const generateHash = input =>
  createHash("md5").update(input).digest("hex")

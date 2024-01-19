/**
 * Wraps input in bold ANSI escape codes
 * @param {any} input
 * @returns {string}
 */
export const bold = input => `\u001B[1m${input}\u001B[22m`

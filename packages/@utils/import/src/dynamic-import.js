/* eslint-disable unicorn/no-await-expression-member */

/**
 * Dynamic import a module and return its default export
 * @param {string} path
 * @returns {Promise<unknown>}
 */
export const importDefault = async path => (await import(path)).default

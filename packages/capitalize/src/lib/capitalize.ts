/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 *
 * @param str - The string to capitalize
 * @returns The capitalized string
 *
 * @example
 * ```typescript
 * capitalize('hello world') // 'Hello world'
 * capitalize('HELLO WORLD') // 'Hello world'
 * capitalize('') // ''
 * capitalize('a') // 'A'
 * ```
 *
 * @public
 */
export function capitalize(str: string): string {
  if (str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

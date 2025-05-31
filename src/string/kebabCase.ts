/**
 * Converts a string to kebab-case.
 * 
 * @param str - The string to convert to kebab-case
 * @returns The kebab-cased string
 * 
 * @example
 * ```typescript
 * kebabCase('Hello World') // 'hello-world'
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('hello_world') // 'hello-world'
 * kebabCase('HELLO WORLD') // 'hello-world'
 * kebabCase('Hello-World') // 'hello-world'
 * kebabCase('') // ''
 * ```
 * 
 * @public
 */
export function kebabCase(str: string): string {
  if (str.length === 0) {
    return str;
  }
  
  return str
    // Insert a hyphen before any uppercase letter that follows a lowercase letter
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Convert to lowercase
    .toLowerCase()
    // Remove any leading or trailing hyphens
    .replace(/^-+|-+$/g, '');
}

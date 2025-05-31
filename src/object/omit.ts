/**
 * Creates a new object with specified keys omitted.
 * 
 * @param obj - The source object
 * @param keys - Array of keys to omit from the object
 * @returns A new object with the specified keys omitted
 * 
 * @example
 * ```typescript
 * const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' }
 * 
 * omit(user, ['password']) 
 * // { id: 1, name: 'John', email: 'john@example.com' }
 * 
 * omit(user, ['password', 'email']) 
 * // { id: 1, name: 'John' }
 * 
 * omit({}, ['any']) 
 * // {}
 * ```
 * 
 * @public
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  
  for (const key of keys) {
    delete result[key];
  }
  
  return result as Omit<T, K>;
}

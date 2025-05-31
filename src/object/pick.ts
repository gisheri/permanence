/**
 * Creates a new object with only the specified keys picked from the source object.
 * 
 * @param obj - The source object
 * @param keys - Array of keys to pick from the object
 * @returns A new object with only the specified keys
 * 
 * @example
 * ```typescript
 * const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' }
 * 
 * pick(user, ['name', 'email']) 
 * // { name: 'John', email: 'john@example.com' }
 * 
 * pick(user, ['id']) 
 * // { id: 1 }
 * 
 * pick({}, ['any']) 
 * // {}
 * 
 * pick(user, []) 
 * // {}
 * ```
 * 
 * @public
 */
export function pick<T extends Record<string, any>, K extends (keyof T)[]>(
  obj: T,
  keys: K
): Pick<T, K[number]> {
  const result = {} as Pick<T, K[number]>;

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}

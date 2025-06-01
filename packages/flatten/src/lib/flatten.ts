/**
 * Flattens an array one level deep.
 * 
 * @param array - The array to flatten
 * @returns A new array with one level of nesting flattened
 * 
 * @example
 * ```typescript
 * flatten([1, [2, 3], [4, [5]]]) // [1, 2, 3, 4, [5]]
 * flatten(['a', ['b', 'c']]) // ['a', 'b', 'c']
 * flatten([]) // []
 * ```
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  const result: T[] = [];
  
  for (const item of array) {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item as T);
    }
  }
  
  return result;
}

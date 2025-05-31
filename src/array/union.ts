/**
 * Creates an array of unique values from all given arrays, in order of first occurrence.
 * 
 * @example
 * ```typescript
 * import { union } from '@permanence/core/array/union';
 * 
 * union([1, 2], [2, 3], [3, 4]);
 * // => [1, 2, 3, 4]
 * 
 * union(['a', 'b'], ['b', 'c'], ['c', 'd']);
 * // => ['a', 'b', 'c', 'd']
 * 
 * union([], [1, 2], []);
 * // => [1, 2]
 * ```
 * 
 * @param arrays - The arrays to inspect
 * @returns Returns the new array of combined values
 * 
 * @public
 */
export function union<T>(...arrays: readonly (readonly T[])[]): T[] {
  const seen = new Set<T>();
  const result: T[] = [];

  for (const array of arrays) {
    for (const item of array) {
      if (!seen.has(item)) {
        seen.add(item);
        result.push(item);
      }
    }
  }

  return result;
}

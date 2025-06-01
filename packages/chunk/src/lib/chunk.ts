/**
 * Creates an array of elements split into groups the length of size.
 * If array can't be split evenly, the final chunk will be the remaining elements.
 * 
 * @example
 * ```typescript
 * import { chunk } from '@permanence/core/array/chunk';
 * 
 * chunk([1, 2, 3, 4, 5], 2);
 * // => [[1, 2], [3, 4], [5]]
 * 
 * chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 * 
 * chunk([], 2);
 * // => []
 * ```
 * 
 * @param array - The array to process
 * @param size - The length of each chunk
 * @returns Returns the new array of chunks
 * 
 * @public
 */
export function chunk<T>(array: readonly T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Size must be greater than 0');
  }
  
  if (array.length === 0) {
    return [];
  }
  
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  
  return result;
}

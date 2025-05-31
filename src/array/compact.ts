/**
 * Creates an array with all falsy values removed.
 * The values false, null, 0, "", undefined, and NaN are falsy.
 * 
 * @example
 * ```typescript
 * import { compact } from '@permanence/core/array/compact';
 * 
 * compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 * 
 * compact([null, undefined, 'hello', 0, true, NaN]);
 * // => ['hello', true]
 * 
 * compact([]);
 * // => []
 * ```
 * 
 * @param array - The array to compact
 * @returns Returns the new array of filtered values
 * 
 * @public
 */
export function compact<T>(array: readonly (T | null | undefined | false | 0 | '')[]): T[] {
  return array.filter((value): value is T => Boolean(value));
}

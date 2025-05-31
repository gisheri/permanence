/**
 * Checks if a value is null or undefined.
 * 
 * @example
 * ```typescript
 * import { isNil } from '@permanence/core/type/isNil';
 * 
 * isNil(null);
 * // => true
 * 
 * isNil(undefined);
 * // => true
 * 
 * isNil(0);
 * // => false
 * 
 * isNil('');
 * // => false
 * ```
 * 
 * @param value - The value to check
 * @returns Returns true if value is null or undefined, else false
 * 
 * @public
 */
export function isNil(value: unknown): value is null | undefined {
  // eslint-disable-next-line eqeqeq
  return value == null;
}

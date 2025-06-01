/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * 
 * @example
 * ```typescript
 * import { debounce } from '@permanence/core/function/debounce';
 * 
 * const debouncedSave = debounce(() => {
 *   console.log('Saving...');
 * }, 300);
 * 
 * // Will only execute once after 300ms of no calls
 * debouncedSave();
 * debouncedSave();
 * debouncedSave();
 * ```
 * 
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns Returns the new debounced function
 * 
 * @public
 */
export function debounce<TArgs extends unknown[]>(
  func: (...args: TArgs) => void,
  wait: number,
): (...args: TArgs) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: TArgs): void {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

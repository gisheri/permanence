/**
 * Returns a random integer between min and max (inclusive).
 * 
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random integer between min and max
 * 
 * @example
 * ```typescript
 * randomInt(1, 10) // Random integer between 1 and 10
 * randomInt(0, 100) // Random integer between 0 and 100
 * randomInt(5, 5) // Always returns 5
 * ```
 */
export function randomInt(min: number, max: number): number {
  if (min > max) {
    throw new Error('min cannot be greater than max');
  }
  
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error('min and max must be integers');
  }
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

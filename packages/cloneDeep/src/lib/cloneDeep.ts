/**
 * Creates a deep clone of the given value.
 * Supports primitives, arrays, objects, Date, RegExp, and nested structures.
 * 
 * @example
 * ```typescript
 * import { cloneDeep } from '@permanence/core/utility/cloneDeep';
 * 
 * const original = { 
 *   name: 'John', 
 *   items: [1, 2, { nested: true }],
 *   date: new Date()
 * };
 * 
 * const cloned = cloneDeep(original);
 * cloned.items.push(3);
 * cloned.items[2].nested = false;
 * 
 * console.log(original.items); // [1, 2, { nested: true }]
 * console.log(cloned.items);   // [1, 2, { nested: false }, 3]
 * ```
 * 
 * @param value - The value to clone
 * @returns Returns the deep cloned value
 * 
 * @public
 */
export function cloneDeep<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => cloneDeep(item)) as T;
  }

  // Handle plain objects
  const cloned = {} as T;
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      cloned[key] = cloneDeep(value[key]);
    }
  }
  return cloned;
}

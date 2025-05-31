// Main entry point - exports all utilities
// This allows for bulk imports if desired: import { capitalize, omit } from '@permanence/core'

// String utilities
export { capitalize } from './string/capitalize';
export { kebabCase } from './string/kebabCase';

// Object utilities
export { omit } from './object/omit';
export { pick } from './object/pick';

// Array utilities
export { chunk } from './array/chunk';
export { compact } from './array/compact';
export { flatten } from './array/flatten';
export { union } from './array/union';

// Type utilities
export { isNil } from './type/isNil';

// Function utilities
export { debounce } from './function/debounce';
export { throttle } from './function/throttle';

// Math utilities
export { randomInt } from './math/randomInt';

// Utility functions
export { cloneDeep } from './utility/cloneDeep';

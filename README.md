# @permanence/core

A suite of tiny utility functions with zero dependencies that will never have a backward incompatible change. Fully tree-shakeable, fully typed, with comprehensive JSDoc comments.

## Installation

```bash
npm install @permanence/core
```

## Usage

This package supports both individual function imports for optimal tree-shaking and bulk imports:

### Individual Function Imports (Recommended)

```typescript
// String utilities
import { capitalize } from '@permanence/core/string/capitalize';
import { kebabCase } from '@permanence/core/string/kebabCase';

// Object utilities
import { omit } from '@permanence/core/object/omit';
import { pick } from '@permanence/core/object/pick';

// Array utilities
import { chunk } from '@permanence/core/array/chunk';
import { compact } from '@permanence/core/array/compact';
import { union } from '@permanence/core/array/union';

// Type utilities
import { isNil } from '@permanence/core/type/isNil';

// Function utilities
import { debounce } from '@permanence/core/function/debounce';

// Utility functions
import { cloneDeep } from '@permanence/core/utility/cloneDeep';

// Use the functions
const title = capitalize('hello world');
const slug = kebabCase('Hello World');
const safeUser = omit(user, ['password']);
const publicData = pick(user, ['name', 'email']); 
const groups = chunk(items, 3);
const filtered = compact(array);
```

### Bulk Imports

```typescript
import { 
  capitalize, 
  kebabCase, 
  omit, 
  pick, 
  chunk, 
  compact, 
  union,
  isNil, 
  debounce,
  cloneDeep
} from '@permanence/core';

// Use the functions
capitalize('hello world');
kebabCase('Hello World');
omit(user, ['password']);
pick(user, ['name', 'email']);
chunk(items, 3);
compact(array);
isNil(value);
debounce(callback, 300);
```

## Available Functions

### String Functions

#### `capitalize(str: string): string`

Capitalizes the first letter of a string and converts the rest to lowercase.

```typescript
import { capitalize } from '@permanence/core/string/capitalize'

capitalize('hello world') // 'Hello world'
capitalize('HELLO WORLD') // 'Hello world'
capitalize('') // ''
capitalize('a') // 'A'
```

#### `kebabCase(str: string): string`

Converts a string to kebab-case.

```typescript
import { kebabCase } from '@permanence/core/string/kebabCase'

kebabCase('Hello World') // 'hello-world'
kebabCase('helloWorld') // 'hello-world'
kebabCase('hello_world') // 'hello-world'
kebabCase('HELLO WORLD') // 'hello-world'
```

### Object Functions

#### `omit<T, K>(obj: T, keys: K[]): Omit<T, K>`

Creates a new object with specified keys omitted.

```typescript
import { omit } from '@permanence/core/object/omit'

const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' }

omit(user, ['password']) 
// { id: 1, name: 'John', email: 'john@example.com' }

omit(user, ['password', 'email']) 
// { id: 1, name: 'John' }
```

#### `pick<T, K>(obj: T, keys: K[]): Pick<T, K>`

Creates a new object with only the specified keys picked from the source object.

```typescript
import { pick } from '@permanence/core/object/pick'

const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' }

pick(user, ['name', 'email']) 
// { name: 'John', email: 'john@example.com' }

pick(user, ['id']) 
// { id: 1 }
```

### Array Functions

#### `chunk<T>(array: readonly T[], size: number): T[][]`

Creates an array of elements split into groups the length of size.

```typescript
import { chunk } from '@permanence/core/array/chunk';

chunk([1, 2, 3, 4, 5], 2);
// [[1, 2], [3, 4], [5]]

chunk(['a', 'b', 'c', 'd'], 3);
// [['a', 'b', 'c'], ['d']]

chunk([], 2);
// []
```

#### `compact<T>(array: readonly (T | null | undefined | false | 0 | '')[]): T[]`

Creates an array with all falsy values removed.

```typescript
import { compact } from '@permanence/core/array/compact';

compact([0, 1, false, 2, '', 3]);
// [1, 2, 3]

compact([null, undefined, 'hello', 0, true, NaN]);
// ['hello', true]

compact([]);
// []
```

#### `union<T>(...arrays: readonly (readonly T[])[]): T[]`

Creates an array of unique values from all given arrays, in order of first occurrence.

```typescript
import { union } from '@permanence/core/array/union';

union([1, 2], [2, 3], [3, 4]);
// [1, 2, 3, 4]

union(['a', 'b'], ['b', 'c'], ['c', 'd']);
// ['a', 'b', 'c', 'd']

union([], [1, 2], []);
// [1, 2]
```

### Type Functions

#### `isNil(value: unknown): value is null | undefined`

Checks if a value is null or undefined.

```typescript
import { isNil } from '@permanence/core/type/isNil';

isNil(null);        // true
isNil(undefined);   // true
isNil(0);           // false
isNil('');          // false
isNil(false);       // false

// Type guard usage
const value: string | null | undefined = getValue();
if (!isNil(value)) {
  // TypeScript knows value is string here
  console.log(value.length);
}
```

### Function Functions

#### `debounce<TArgs>(func: (...args: TArgs) => void, wait: number): (...args: TArgs) => void`

Creates a debounced function that delays invoking func until after wait milliseconds.

```typescript
import { debounce } from '@permanence/core/function/debounce';

const debouncedSave = debounce(() => {
  console.log('Saving...');
}, 300);

// Will only execute once after 300ms of no calls
debouncedSave();
debouncedSave();
debouncedSave();

// With arguments
const debouncedLog = debounce((message: string) => {
  console.log(message);
}, 100);

debouncedLog('Hello');
debouncedLog('World'); // Only 'World' will be logged after 100ms
```

### Utility Functions

#### `cloneDeep<T>(value: T): T`

Creates a deep clone of the given value. Supports primitives, arrays, objects, Date, RegExp, and nested structures.

```typescript
import { cloneDeep } from '@permanence/core/utility/cloneDeep';

const original = { 
  name: 'John', 
  items: [1, 2, { nested: true }],
  date: new Date()
};

const cloned = cloneDeep(original);
cloned.items.push(3);
cloned.items[2].nested = false;

console.log(original.items); // [1, 2, { nested: true }]
console.log(cloned.items);   // [1, 2, { nested: false }, 3]
```

## Features

- ✅ **Fully Tree-Shakeable**: Import only what you need
- ✅ **TypeScript First**: Written in TypeScript with full type safety
- ✅ **Zero Dependencies**: No external dependencies
- ✅ **ESM + CJS**: Supports both ES modules and CommonJS
- ✅ **Comprehensive JSDoc**: Rich documentation with examples
- ✅ **Small Bundle Size**: Optimized for minimal impact

## Bundle Sizes

- `capitalize`: ~141B gzipped (167B raw)
- `kebabCase`: ~184B gzipped (255B raw)
- `omit`: ~129B gzipped (150B raw)
- `pick`: ~136B gzipped (176B raw)
- `chunk`: ~201B gzipped (308B raw)
- `compact`: ~102B gzipped (100B raw)
- `union`: ~187B gzipped (292B raw)
- `isNil`: ~81B gzipped (70B raw)
- `debounce`: ~162B gzipped (247B raw)
- `cloneDeep`: ~295B gzipped (621B raw)

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Build in watch mode
npm run dev
```

## License

MIT

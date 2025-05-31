# @permanence/core

A suite of utility functions that never change. Fully tree-shakeable, fully typed, with comprehensive JSDoc comments.

## Installation

```bash
npm install @permanence/core
```

## Usage

This package supports both individual function imports for optimal tree-shaking and bulk imports:

### Individual Function Imports (Recommended)

```typescript
import { capitalize } from '@permanence/core/string/capitalize'
import { kebabCase } from '@permanence/core/string/kebabCase'
import { omit } from '@permanence/core/object/omit'
import { pick } from '@permanence/core/object/pick'

// Use the functions
const title = capitalize('hello world') // 'Hello world'
const slug = kebabCase('Hello World') // 'hello-world'
const safeUser = omit(user, ['password']) // { id: 1, name: 'John', email: '...' }
const publicData = pick(user, ['name', 'email']) // { name: 'John', email: '...' }
```

### Bulk Imports

```typescript
import { capitalize, kebabCase, omit, pick } from '@permanence/core'

// Use the functions
const title = capitalize('hello world')
const slug = kebabCase('Hello World')
const safeUser = omit(user, ['password'])
const publicData = pick(user, ['name', 'email'])
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

## Features

- ✅ **Fully Tree-Shakeable**: Import only what you need
- ✅ **TypeScript First**: Written in TypeScript with full type safety
- ✅ **Zero Dependencies**: No external dependencies
- ✅ **ESM + CJS**: Supports both ES modules and CommonJS
- ✅ **Comprehensive JSDoc**: Rich documentation with examples
- ✅ **Small Bundle Size**: Optimized for minimal impact

## Bundle Sizes

- `capitalize`: ~167B (ESM)
- `kebabCase`: ~210B (ESM)
- `omit`: ~150B (ESM)
- `pick`: ~176B (ESM)

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

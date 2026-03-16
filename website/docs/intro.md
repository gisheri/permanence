---
id: intro
sidebar_position: 1
title: Introduction
---

# Permanence

Permanence is a small, focused set of TypeScript utility functions that **never introduce breaking changes**.

- **Zero dependencies**: everything is implemented from scratch.
- **Tree-shakeable**: import only what you need.
- **Typed first**: written in TypeScript with rich JSDoc.

You can install individual packages or the all-in-one bundle:

```bash
npm install @permanence/all
# or per-package
npm install @permanence/array @permanence/string @permanence/object @permanence/function @permanence/math @permanence/type @permanence/utility
```

## Import styles

Recommended: import from the **domain packages** or the **leaf utilities**:

```ts
// String
import { capitalize } from '@permanence/string';
import { kebabCase } from '@permanence/string';

// Array
import { chunk, compact, flatten, union } from '@permanence/array';

// Object
import { omit, pick } from '@permanence/object';

// Type
import { isNil } from '@permanence/type';

// Function
import { debounce, throttle } from '@permanence/function';

// Math
import { randomInt } from '@permanence/math';

// Utility
import { cloneDeep } from '@permanence/utility';
```

Or use the **all-in-one** bundle:

```ts
import {
  capitalize,
  kebabCase,
  chunk,
  compact,
  flatten,
  union,
  omit,
  pick,
  isNil,
  debounce,
  throttle,
  randomInt,
  cloneDeep,
} from '@permanence/all';
```


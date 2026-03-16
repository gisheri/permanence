---
id: utility
sidebar_position: 8
title: Utility helpers
---

# Utility helpers

General-purpose helpers that don't fit into other categories.

## `cloneDeep`

Creates a deep clone of a value. Supports primitives, arrays, objects, `Date`,
`RegExp`, and nested structures.

```ts
import { cloneDeep } from '@permanence/utility';

const original = {
  name: 'John',
  items: [1, 2, { nested: true }],
  date: new Date(),
};

const cloned = cloneDeep(original);

cloned.items.push(3);
cloned.items[2].nested = false;

console.log(original.items);
// [1, 2, { nested: true }]

console.log(cloned.items);
// [1, 2, { nested: false }, 3]
```


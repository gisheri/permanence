---
id: array
sidebar_position: 3
title: Array utilities
---

# Array utilities

Helpers for working with arrays.

## `chunk`

Splits an array into chunks of the given size.

```ts
import { chunk } from '@permanence/array';

chunk([1, 2, 3, 4, 5], 2);
// [[1, 2], [3, 4], [5]]

chunk(['a', 'b', 'c', 'd'], 3);
// [['a', 'b', 'c'], ['d']]

chunk([], 2);
// []
```

## `compact`

Removes falsy values (`false`, `null`, `0`, `''`, `undefined`, `NaN`) from an array.

```ts
import { compact } from '@permanence/array';

compact([0, 1, false, 2, '', 3]);
// [1, 2, 3]

compact([null, undefined, 'hello', 0, true, NaN]);
// ['hello', true]
```

## `flatten`

Flattens an array one level deep.

```ts
import { flatten } from '@permanence/array';

flatten([1, [2, 3], [4, [5]]]);
// [1, 2, 3, 4, [5]]

flatten(['a', ['b', 'c']]);
// ['a', 'b', 'c']
```

## `union`

Creates an array of unique values from all given arrays, in order of first occurrence.

```ts
import { union } from '@permanence/array';

union([1, 2], [2, 3], [3, 4]);
// [1, 2, 3, 4]

union(['a', 'b'], ['b', 'c'], ['c', 'd']);
// ['a', 'b', 'c', 'd']
```


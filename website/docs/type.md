---
id: type
sidebar_position: 5
title: Type utilities
---

# Type utilities

Helpers for working with nullable values.

## `isNil`

Checks if a value is `null` or `undefined`. Acts as a type guard.

```ts
import { isNil } from '@permanence/type';

isNil(null);      // true
isNil(undefined); // true
isNil(0);         // false
isNil('');        // false

// Type guard usage
const value: string | null | undefined = getValue();

if (!isNil(value)) {
  // value is now typed as string
  console.log(value.length);
}
```


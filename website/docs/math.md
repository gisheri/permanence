---
id: math
sidebar_position: 7
title: Math utilities
---

# Math utilities

Helpers for common numeric tasks.

## `randomInt`

Returns a random integer between `min` and `max` (inclusive).

```ts
import { randomInt } from '@permanence/math';

randomInt(1, 10);  // Random integer between 1 and 10
randomInt(0, 100); // Random integer between 0 and 100
randomInt(5, 5);   // Always 5
```


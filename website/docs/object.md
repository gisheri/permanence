---
id: object
sidebar_position: 4
title: Object utilities
---

# Object utilities

Helpers for picking and omitting properties from objects.

## `omit`

Creates a new object with specified keys omitted.

```ts
import { omit } from '@permanence/object';

const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };

omit(user, ['password']);
// { id: 1, name: 'John', email: 'john@example.com' }

omit(user, ['password', 'email']);
// { id: 1, name: 'John' }
```

## `pick`

Creates a new object with only the specified keys picked from the source object.

```ts
import { pick } from '@permanence/object';

const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };

pick(user, ['name', 'email']);
// { name: 'John', email: 'john@example.com' }

pick(user, ['id']);
// { id: 1 }
```


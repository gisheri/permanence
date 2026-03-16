---
id: string
sidebar_position: 2
title: String utilities
---

# String utilities

String helpers for common casing tasks.

## `capitalize`

Capitalizes the first letter of a string and converts the rest to lowercase.

```ts
import { capitalize } from '@permanence/string';

capitalize('hello world'); // 'Hello world'
capitalize('HELLO WORLD'); // 'Hello world'
capitalize('');            // ''
capitalize('a');           // 'A'
```

## `kebabCase`

Converts a string to kebab-case.

```ts
import { kebabCase } from '@permanence/string';

kebabCase('Hello World');   // 'hello-world'
kebabCase('helloWorld');    // 'hello-world'
kebabCase('hello_world');   // 'hello-world'
kebabCase('HELLO WORLD');   // 'hello-world'
kebabCase('Hello-World');   // 'hello-world'
```


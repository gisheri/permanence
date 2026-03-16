---
id: function
sidebar_position: 6
title: Function utilities
---

# Function utilities

Helpers for controlling how often functions are called.

## `debounce`

Creates a debounced function that delays invoking the original function until after
`wait` milliseconds have elapsed since the last call.

```ts
import { debounce } from '@permanence/function';

const debouncedSave = debounce(() => {
  console.log('Saving...');
}, 300);

// Will only execute once after 300ms of no calls
debouncedSave();
debouncedSave();
debouncedSave();
```

## `throttle`

Creates a throttled function that only invokes the original function at most once
per `wait` milliseconds.

```ts
import { throttle } from '@permanence/function';

const logScroll = throttle(() => {
  console.log('scrolled');
}, 100);

window.addEventListener('scroll', logScroll);
```


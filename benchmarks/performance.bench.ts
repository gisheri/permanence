import { bench, describe } from 'vitest';
import { capitalize } from '../src/string/capitalize';
import { kebabCase } from '../src/string/kebabCase';
import { omit } from '../src/object/omit';
import { pick } from '../src/object/pick';
import { chunk } from '../src/array/chunk';
import { compact } from '../src/array/compact';
import { flatten } from '../src/array/flatten';
import { isNil } from '../src/type/isNil';
import { debounce } from '../src/function/debounce';
import { throttle } from '../src/function/throttle';
import { randomInt } from '../src/math/randomInt';
import { cloneDeep } from '../src/utility/cloneDeep';
import { union } from '../src/array/union';

describe('String utilities performance', () => {
  bench('capitalize - short string', () => {
    capitalize('hello world');
  });

  bench('capitalize - long string', () => {
    capitalize('the quick brown fox jumps over the lazy dog'.repeat(10));
  });

  bench('kebabCase - camelCase', () => {
    kebabCase('helloWorldThisIsATest');
  });

  bench('kebabCase - mixed format', () => {
    kebabCase('Hello World_test-case');
  });
});

describe('Object utilities performance', () => {
  const largeObject = Object.fromEntries(
    Array.from({ length: 100 }, (_, i) => [`key${i}`, `value${i}`])
  );

  bench('omit - small object', () => {
    omit({ a: 1, b: 2, c: 3, d: 4, e: 5 }, ['b', 'd']);
  });

  bench('omit - large object', () => {
    omit(largeObject, ['key10', 'key20', 'key30']);
  });

  bench('pick - small object', () => {
    pick({ a: 1, b: 2, c: 3, d: 4, e: 5 }, ['a', 'c', 'e']);
  });

  bench('pick - large object', () => {
    pick(largeObject, ['key1', 'key5', 'key10']);
  });
});

describe('Array utilities performance', () => {
  const smallArray = Array.from({ length: 100 }, (_, i) => i);
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const mixedArray = [1, null, 2, undefined, 3, false, 4, '', 5, 0, 6];

  bench('chunk - small array', () => {
    chunk(smallArray, 10);
  });

  bench('chunk - large array', () => {
    chunk(largeArray, 100);
  });

  bench('compact - mixed array', () => {
    compact(mixedArray);
  });

  bench('compact - large mixed array', () => {
    compact([...mixedArray, ...mixedArray, ...mixedArray]);
  });

  bench('union - small arrays', () => {
    union([1, 2, 3], [3, 4, 5], [5, 6, 7]);
  });

  bench('union - large arrays', () => {
    union(
      Array.from({ length: 1000 }, (_, i) => i),
      Array.from({ length: 1000 }, (_, i) => i + 500),
      Array.from({ length: 1000 }, (_, i) => i + 1000)
    );
  });

  bench('flatten - nested arrays', () => {
    flatten([1, [2, 3], [4, 5], 6, [7, [8, 9]]]);
  });

  bench('flatten - large nested array', () => {
    const nested = Array.from({ length: 100 }, (_, i) => [i, i + 1]);
    flatten(nested);
  });
});

describe('Type utilities performance', () => {
  const values = [null, undefined, 0, '', false, 'hello', 42, {}, []];

  bench('isNil - mixed values', () => {
    values.forEach(value => isNil(value));
  });
});

describe('Function utilities performance', () => {
  bench('debounce creation', () => {
    debounce(() => {}, 100);
  });

  bench('throttle creation', () => {
    throttle(() => {}, 100);
  });
});

describe('Math utilities performance', () => {
  bench('randomInt generation', () => {
    randomInt(1, 100);
  });

  bench('randomInt large range', () => {
    randomInt(1, 1000000);
  });
});

describe('Utility functions performance', () => {
  const complexObject = {
    name: 'John',
    age: 30,
    items: [1, 2, { nested: true, date: new Date() }],
    metadata: {
      created: new Date(),
      tags: ['tag1', 'tag2'],
      config: { enabled: true, timeout: 5000 }
    }
  };

  bench('cloneDeep - complex object', () => {
    cloneDeep(complexObject);
  });

  bench('cloneDeep - large array', () => {
    cloneDeep(Array.from({ length: 1000 }, (_, i) => ({ id: i, value: `item${i}` })));
  });
});

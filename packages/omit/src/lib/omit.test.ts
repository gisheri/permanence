import { describe, it, expect } from 'vitest';
import { omit } from './omit';

describe('omit', () => {
  it('should omit specified keys from an object', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = omit(obj, ['b', 'd']);

    expect(result).toEqual({ a: 1, c: 3 });
    expect(result).not.toHaveProperty('b');
    expect(result).not.toHaveProperty('d');
  });

  it('should not mutate the original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const original = { ...obj };
    const result = omit(obj, ['b']);

    expect(obj).toEqual(original);
    expect(result).not.toBe(obj);
  });

  it('should handle empty key arrays', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, []);

    expect(result).toEqual(obj);
    expect(result).not.toBe(obj); // Should still be a new object
  });

  it('should handle empty objects', () => {
    //@ts-expect-error - Testing keys that don't exist on empty object
    const result = omit({}, ['any', 'keys']);
    expect(result).toEqual({});
  });

  it('should handle non-existent keys', () => {
    const obj = { a: 1, b: 2 };
    //@ts-expect-error - Testing non-existent keys on object
    const result = omit(obj, ['c', 'd']);

    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should handle mixed existing and non-existent keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    //@ts-expect-error - Testing mix of valid and invalid keys
    const result = omit(obj, ['b', 'nonexistent', 'c']);

    expect(result).toEqual({ a: 1 });
  });

  it('should work with complex object values', () => {
    const obj = {
      id: 1,
      name: 'John',
      address: { street: '123 Main St', city: 'Boston' },
      hobbies: ['reading', 'coding'],
      metadata: null,
      isActive: true,
    };

    const result = omit(obj, ['address', 'metadata']);

    expect(result).toEqual({
      id: 1,
      name: 'John',
      hobbies: ['reading', 'coding'],
      isActive: true,
    });
  });

  it('should preserve the type information', () => {
    const user = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: 'secret',
    };

    const safeUser = omit(user, ['password']);

    // Type should be { id: number; name: string; email: string }
    expect(safeUser).toEqual({
      id: 1,
      name: 'John',
      email: 'john@example.com',
    });
  });

  it('should handle objects with undefined and null values', () => {
    const obj = { a: 1, b: undefined, c: null, d: 'test' };
    const result = omit(obj, ['b', 'c']);

    expect(result).toEqual({ a: 1, d: 'test' });
  });

  it('should work with symbol keys in the object (but cannot omit them)', () => {
    const sym = Symbol('test');
    const obj = { a: 1, b: 2, [sym]: 'symbol value' };
    const result = omit(obj, ['b']);

    expect(result).toEqual({ a: 1, [sym]: 'symbol value' });
  });
});

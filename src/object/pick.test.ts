import { describe, it, expect } from 'vitest';
import { pick } from './pick';

describe('pick', () => {
  it('should pick specified keys from an object', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = pick(obj, ['a', 'c']);

    expect(result).toEqual({ a: 1, c: 3 });
    expect(result).toHaveProperty('a');
    expect(result).toHaveProperty('c');
    expect(result).not.toHaveProperty('b');
    expect(result).not.toHaveProperty('d');
  });

  it('should not mutate the original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const original = { ...obj };
    const result = pick(obj, ['a', 'b']);

    expect(obj).toEqual(original);
    expect(result).not.toBe(obj);
  });

  it('should handle empty key arrays', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, []);

    expect(result).toEqual({});
  });

  it('should handle empty objects', () => {
    //@ts-expect-error
    const result = pick({}, ['any', 'keys']);
    expect(result).toEqual({});
  });

  it('should handle non-existent keys', () => {
    const obj = { a: 1, b: 2 };
    //@ts-expect-error
    const result = pick(obj, ['c', 'd']);

    expect(result).toEqual({});
  });

  it('should handle mixed existing and non-existent keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    //@ts-expect-error
    const result = pick(obj, ['a', 'nonexistent', 'c']);

    expect(result).toEqual({ a: 1, c: 3 });
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

    const result = pick(obj, ['name', 'address', 'isActive']);

    expect(result).toEqual({
      name: 'John',
      address: { street: '123 Main St', city: 'Boston' },
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

    const publicUser = pick(user, ['id', 'name']);

    // Type should be { id: number; name: string }
    expect(publicUser).toEqual({
      id: 1,
      name: 'John',
    });
  });

  it('should handle objects with undefined and null values', () => {
    const obj = { a: 1, b: undefined, c: null, d: 'test' };
    const result = pick(obj, ['a', 'b', 'c']);

    expect(result).toEqual({ a: 1, b: undefined, c: null });
  });

  it('should work with symbol keys in the object (but cannot pick them with string keys)', () => {
    const sym = Symbol('test');
    const obj = { a: 1, b: 2, [sym]: 'symbol value' };
    const result = pick(obj, ['a']);

    expect(result).toEqual({ a: 1 });
    expect(Object.getOwnPropertySymbols(result)).toHaveLength(0);
  });

  it('should handle picking all keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ['a', 'b', 'c']);

    expect(result).toEqual(obj);
    expect(result).not.toBe(obj); // Should still be a new object
  });

  it('should work with real-world use case', () => {
    const userProfile = {
      id: 123,
      username: 'johndoe',
      email: 'john@example.com',
      password: 'secretPassword123',
      firstName: 'John',
      lastName: 'Doe',
      role: 'admin',
      lastLogin: '2025-05-31',
      createdAt: '2025-01-15',
    };

    // API response fields
    const apiResponse = pick(userProfile, ['id', 'username', 'email', 'role']);
    expect(apiResponse).toEqual({
      id: 123,
      username: 'johndoe',
      email: 'john@example.com',
      role: 'admin',
    });

    // Display name fields
    const displayData = pick(userProfile, [
      'firstName',
      'lastName',
      'username',
    ]);
    expect(displayData).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
    });
  });
});

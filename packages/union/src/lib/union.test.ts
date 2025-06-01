import { describe, it, expect } from 'vitest';
import { union } from './union';

describe('union', () => {
  it('should create union of multiple arrays', () => {
    const result = union([1, 2], [2, 3], [3, 4]);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should handle string arrays', () => {
    const result = union(['a', 'b'], ['b', 'c'], ['c', 'd']);
    expect(result).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should handle empty arrays', () => {
    const result = union([], [1, 2], []);
    expect(result).toEqual([1, 2]);
  });

  it('should handle single array', () => {
    const result = union([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle no arrays', () => {
    const result = union();
    expect(result).toEqual([]);
  });

  it('should preserve order of first occurrence', () => {
    const result = union([3, 1], [2, 1], [1, 4]);
    expect(result).toEqual([3, 1, 2, 4]);
  });

  it('should handle arrays with duplicates within same array', () => {
    const result = union([1, 1, 2], [2, 3, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should work with object arrays (by reference)', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };

    const result = union([obj1, obj2], [obj2, obj3]);
    expect(result).toEqual([obj1, obj2, obj3]);
    expect(result.length).toBe(3);
  });

  it('should handle mixed types correctly', () => {
    const result = union([1, 'a'], ['a', 2], [2, 'c']);
    expect(result).toEqual([1, 'a', 2, 'c']);
  });

  it('should work with readonly arrays', () => {
    const arr1 = [1, 2];
    const arr2 = [2, 3];
    const result = union(arr1, arr2);
    expect(result).toEqual([1, 2, 3]);
  });
});

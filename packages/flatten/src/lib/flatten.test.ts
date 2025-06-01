import { flatten } from './flatten';
import { describe, it, expect } from 'vitest';

describe('flatten', () => {
  it('should flatten array one level deep', () => {
    const input = [1, [2, 3], [4, 5]];
    const result = flatten(input);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle mixed types', () => {
    const input = ['a', ['b', 'c'], 'd'];
    const result = flatten(input);
    expect(result).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should not flatten deeply nested arrays', () => {
    const input = [1, [2, [3, 4]], 5];
    const result = flatten(input);
    expect(result).toEqual([1, 2, [3, 4], 5]);
  });

  it('should handle empty arrays', () => {
    const result = flatten([]);
    expect(result).toEqual([]);
  });

  it('should handle arrays with empty sub-arrays', () => {
    const input = [1, [], [2, 3], []];
    const result = flatten(input);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle arrays with only nested arrays', () => {
    const input = [[1, 2], [3, 4], [5]];
    const result = flatten(input);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle arrays with only non-nested items', () => {
    const input = [1, 2, 3, 4];
    const result = flatten(input);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should work with readonly arrays', () => {
    const input = [1, [2, 3]];
    const result = flatten(input);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should preserve object references', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 2 };
    const input = [obj1, [obj2]];
    const result = flatten(input);
    expect(result).toEqual([obj1, obj2]);
    expect(result[0]).toBe(obj1);
    expect(result[1]).toBe(obj2);
  });
});

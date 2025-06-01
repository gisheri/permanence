import { describe, it, expect } from 'vitest';
import { chunk } from './chunk';

describe('chunk', () => {
  it('should split array into chunks of specified size', () => {
    const result = chunk([1, 2, 3, 4, 5], 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('should handle exact divisions', () => {
    const result = chunk([1, 2, 3, 4], 2);
    expect(result).toEqual([[1, 2], [3, 4]]);
  });

  it('should handle larger chunk size than array length', () => {
    const result = chunk([1, 2], 5);
    expect(result).toEqual([[1, 2]]);
  });

  it('should handle chunk size of 1', () => {
    const result = chunk([1, 2, 3], 1);
    expect(result).toEqual([[1], [2], [3]]);
  });

  it('should handle empty arrays', () => {
    const result = chunk([], 2);
    expect(result).toEqual([]);
  });

  it('should handle string arrays', () => {
    const result = chunk(['a', 'b', 'c', 'd'], 3);
    expect(result).toEqual([['a', 'b', 'c'], ['d']]);
  });

  it('should throw error for invalid chunk size', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow('Size must be greater than 0');
    expect(() => chunk([1, 2, 3], -1)).toThrow('Size must be greater than 0');
  });

  it('should work with readonly arrays', () => {
    const readonlyArray: readonly number[] = [1, 2, 3, 4, 5];
    const result = chunk(readonlyArray, 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('should preserve object references', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    const result = chunk([obj1, obj2, obj3], 2);
    
    expect(result).toEqual([[obj1, obj2], [obj3]]);
    expect(result[0][0]).toBe(obj1);
    expect(result[0][1]).toBe(obj2);
    expect(result[1][0]).toBe(obj3);
  });
});

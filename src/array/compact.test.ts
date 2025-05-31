import { describe, it, expect } from 'vitest';
import { compact } from './compact';

describe('compact', () => {
  it('should remove falsy values', () => {
    const result = compact([0, 1, false, 2, '', 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should remove null and undefined', () => {
    const result = compact([null, undefined, 'hello', 0, true, NaN]);
    expect(result).toEqual(['hello', true]);
  });

  it('should handle empty arrays', () => {
    const result = compact([]);
    expect(result).toEqual([]);
  });

  it('should handle arrays with only falsy values', () => {
    const result = compact([false, null, undefined, 0, '', NaN]);
    expect(result).toEqual([]);
  });

  it('should handle arrays with only truthy values', () => {
    const result = compact([1, 'hello', true, {}, []]);
    expect(result).toEqual([1, 'hello', true, {}, []]);
  });

  it('should preserve object and array references', () => {
    const obj = { a: 1 };
    const arr = [1, 2, 3];
    const result = compact([obj, null, arr, false]);
    
    expect(result).toEqual([obj, arr]);
    expect(result[0]).toBe(obj);
    expect(result[1]).toBe(arr);
  });

  it('should handle mixed types correctly', () => {
    const result = compact([
      'test',
      0,
      { key: 'value' },
      null,
      42,
      '',
      [1, 2],
      undefined,
      true,
      false,
    ]);
    
    expect(result).toEqual(['test', { key: 'value' }, 42, [1, 2], true]);
  });

  it('should work with readonly arrays', () => {
    const readonlyArray: readonly (string | null | undefined)[] = ['a', null, 'b', undefined, 'c'];
    const result = compact(readonlyArray);
    expect(result).toEqual(['a', 'b', 'c']);
  });
});

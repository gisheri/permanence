import { describe, it, expect } from 'vitest';
import { cloneDeep } from './cloneDeep';

describe('cloneDeep', () => {
  it('should clone primitives', () => {
    expect(cloneDeep(1)).toBe(1);
    expect(cloneDeep('hello')).toBe('hello');
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(null)).toBe(null);
    expect(cloneDeep(undefined)).toBe(undefined);
  });

  it('should clone arrays', () => {
    const original = [1, 2, 3];
    const cloned = cloneDeep(original);
    
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    
    cloned.push(4);
    expect(original).toEqual([1, 2, 3]);
    expect(cloned).toEqual([1, 2, 3, 4]);
  });

  it('should clone objects', () => {
    const original = { a: 1, b: 'hello' };
    const cloned = cloneDeep(original);
    
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    
    cloned.a = 2;
    expect(original.a).toBe(1);
    expect(cloned.a).toBe(2);
  });

  it('should clone nested objects', () => {
    const original = {
      level1: {
        level2: {
          value: 'deep',
        },
      },
    };
    const cloned = cloneDeep(original);
    
    expect(cloned).toEqual(original);
    expect(cloned.level1).not.toBe(original.level1);
    expect(cloned.level1.level2).not.toBe(original.level1.level2);
    
    cloned.level1.level2.value = 'modified';
    expect(original.level1.level2.value).toBe('deep');
    expect(cloned.level1.level2.value).toBe('modified');
  });

  it('should clone nested arrays', () => {
    const original = [1, [2, [3, 4]]];
    const cloned = cloneDeep(original);
    
    expect(cloned).toEqual(original);
    expect(cloned[1]).not.toBe(original[1]);
    expect(cloned[1][1]).not.toBe(original[1][1]);
    
    (cloned[1] as number[])[0] = 99;
    expect((original[1] as number[])[0]).toBe(2);
    expect((cloned[1] as number[])[0]).toBe(99);
  });

  it('should clone Date objects', () => {
    const original = new Date('2023-01-01T00:00:00.000Z');
    const originalYear = original.getFullYear();
    const cloned = cloneDeep(original);
    
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned instanceof Date).toBe(true);
    
    cloned.setFullYear(2024);
    expect(original.getFullYear()).toBe(originalYear);
    expect(cloned.getFullYear()).toBe(2024);
  });

  it('should clone RegExp objects', () => {
    const original = /test/gi;
    const cloned = cloneDeep(original);
    
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned instanceof RegExp).toBe(true);
    expect(cloned.source).toBe('test');
    expect(cloned.flags).toBe('gi');
  });

  it('should clone complex mixed structures', () => {
    const original = {
      string: 'hello',
      number: 42,
      boolean: true,
      array: [1, { nested: 'value' }],
      object: {
        date: new Date('2023-01-01T00:00:00.000Z'),
        regex: /pattern/i,
      },
      nullValue: null,
      undefinedValue: undefined,
    };
    
    const originalYear = original.object.date.getFullYear();
    const cloned = cloneDeep(original);
    
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.array).not.toBe(original.array);
    expect(cloned.array[1]).not.toBe(original.array[1]);
    expect(cloned.object).not.toBe(original.object);
    expect(cloned.object.date).not.toBe(original.object.date);
    expect(cloned.object.regex).not.toBe(original.object.regex);
    
    // Modify cloned structure
    cloned.string = 'modified';
    (cloned.array[1] as { nested: string }).nested = 'changed';
    cloned.object.date.setFullYear(2024);
    
    expect(original.string).toBe('hello');
    expect((original.array[1] as { nested: string }).nested).toBe('value');
    expect(original.object.date.getFullYear()).toBe(originalYear);
  });
});

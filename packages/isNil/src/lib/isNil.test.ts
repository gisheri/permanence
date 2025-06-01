import { describe, it, expect } from 'vitest';
import { isNil } from './isNil';

describe('isNil', () => {
  it('should return true for null', () => {
    expect(isNil(null)).toBe(true);
  });

  it('should return true for undefined', () => {
    expect(isNil(undefined)).toBe(true);
  });

  it('should return false for 0', () => {
    expect(isNil(0)).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isNil('')).toBe(false);
  });

  it('should return false for false', () => {
    expect(isNil(false)).toBe(false);
  });

  it('should return false for NaN', () => {
    expect(isNil(NaN)).toBe(false);
  });

  it('should return false for objects', () => {
    expect(isNil({})).toBe(false);
    expect(isNil([])).toBe(false);
    expect(isNil({ a: 1 })).toBe(false);
  });

  it('should return false for strings', () => {
    expect(isNil('hello')).toBe(false);
    expect(isNil('0')).toBe(false);
  });

  it('should return false for numbers', () => {
    expect(isNil(1)).toBe(false);
    expect(isNil(-1)).toBe(false);
    expect(isNil(3.14)).toBe(false);
  });

  it('should work as type guard', () => {
    const value: string | null | undefined = 'test';
    
    if (!isNil(value)) {
      // TypeScript should know value is string here
      expect(value.length).toBe(4);
    }
    
    const nullValue: string | null = null;
    if (isNil(nullValue)) {
      // TypeScript should know nullValue is null here
      expect(nullValue).toBe(null);
    }
  });
});

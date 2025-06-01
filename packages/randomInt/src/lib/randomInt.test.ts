import { randomInt } from './randomInt';
import { describe, it, expect, vi } from 'vitest';

describe('randomInt', () => {
  it('should return integer within range', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('should return the same value when min equals max', () => {
    expect(randomInt(5, 5)).toBe(5);
    expect(randomInt(0, 0)).toBe(0);
    expect(randomInt(-5, -5)).toBe(-5);
  });

  it('should work with negative numbers', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(-10, -1);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(-1);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('should work with zero', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(0, 5);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(5);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('should throw error when min is greater than max', () => {
    expect(() => randomInt(10, 5)).toThrow('min cannot be greater than max');
    expect(() => randomInt(1, 0)).toThrow('min cannot be greater than max');
  });

  it('should throw error for non-integer inputs', () => {
    expect(() => randomInt(1.5, 5)).toThrow('min and max must be integers');
    expect(() => randomInt(1, 5.5)).toThrow('min and max must be integers');
    expect(() => randomInt(1.1, 5.9)).toThrow('min and max must be integers');
  });

  it('should produce different values over multiple calls', () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(randomInt(1, 100));
    }
    // With a range of 1-100, we should get multiple different values
    expect(results.size).toBeGreaterThan(10);
  });

  it('should use Math.random correctly', () => {
    const mockRandom = vi.spyOn(Math, 'random');
    mockRandom.mockReturnValue(0.5);

    const result = randomInt(1, 10);
    expect(result).toBe(6); // 0.5 * (10-1+1) + 1 = 5 + 1 = 6

    mockRandom.mockReturnValue(0);
    const result2 = randomInt(1, 10);
    expect(result2).toBe(1);

    mockRandom.mockReturnValue(0.999);
    const result3 = randomInt(1, 10);
    expect(result3).toBe(10);

    mockRandom.mockRestore();
  });
});

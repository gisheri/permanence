import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should delay function execution', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledOnce();
  });

  it('should reset timer on subsequent calls', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    vi.advanceTimersByTime(50);
    debouncedFunc();
    vi.advanceTimersByTime(50);
    
    expect(func).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(50);
    expect(func).toHaveBeenCalledOnce();
  });

  it('should pass arguments correctly', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc('arg1', 'arg2', 123);
    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledWith('arg1', 'arg2', 123);
  });

  it('should use latest arguments when called multiple times', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc('first');
    debouncedFunc('second');
    debouncedFunc('third');
    
    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledOnce();
    expect(func).toHaveBeenCalledWith('third');
  });

  it('should handle zero wait time', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 0);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(0);
    expect(func).toHaveBeenCalledOnce();
  });

  it('should work with different argument types', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    const obj = { key: 'value' };
    const arr = [1, 2, 3];
    
    debouncedFunc(obj, arr, 42, 'string', true);
    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledWith(obj, arr, 42, 'string', true);
  });

  it('should handle multiple rapid calls correctly', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    // Call 10 times rapidly
    for (let i = 0; i < 10; i++) {
      debouncedFunc(i);
      vi.advanceTimersByTime(10);
    }

    expect(func).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledOnce();
    expect(func).toHaveBeenCalledWith(9); // Last call wins
  });
});

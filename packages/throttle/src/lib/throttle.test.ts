import { throttle } from './throttle';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should execute function immediately on first call', () => {
    const fn = vi.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should throttle subsequent calls within wait period', () => {
    const fn = vi.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn();
    throttledFn();
    throttledFn();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should allow execution after wait period', () => {
    const fn = vi.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    throttledFn();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should pass arguments correctly', () => {
    const fn = vi.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn('arg1', 'arg2');
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should use latest arguments for throttled calls', () => {
    const fn = vi.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn('first');
    throttledFn('second'); // This should be ignored
    
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('first');
  });

  it('should handle zero wait time', () => {
    const fn = vi.fn();
    const throttledFn = throttle(fn, 0);

    throttledFn();
    throttledFn();
    throttledFn();

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should work with different argument types', () => {
    const fn = vi.fn();
    const throttledFn = throttle(fn, 100);

    const obj = { a: 1 };
    throttledFn(42, 'string', obj);
    
    expect(fn).toHaveBeenCalledWith(42, 'string', obj);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should maintain separate timers for different throttled functions', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const throttledFn1 = throttle(fn1, 100);
    const throttledFn2 = throttle(fn2, 200);

    throttledFn1();
    throttledFn2();

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    throttledFn1();
    throttledFn2(); // Should still be throttled

    expect(fn1).toHaveBeenCalledTimes(2);
    expect(fn2).toHaveBeenCalledTimes(1);
  });
});

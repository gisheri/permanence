/**
 * Throttles a function to execute at most once per specified wait time.
 * Unlike debounce, throttle ensures the function is called at regular intervals.
 * 
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to wait between calls
 * @returns A throttled version of the function
 * 
 * @example
 * ```typescript
 * const logScroll = throttle(() => console.log('scrolled'), 100);
 * window.addEventListener('scroll', logScroll);
 * 
 * const updateStatus = throttle((status: string) => {
 *   console.log('Status:', status);
 * }, 1000);
 * updateStatus('active'); // Will execute immediately
 * updateStatus('busy');   // Will be throttled
 * ```
 */
export function throttle<TArgs extends unknown[]>(
  func: (...args: TArgs) => void,
  wait: number,
): (...args: TArgs) => void {
  let lastCall = 0;
  
  return (...args: TArgs): void => {
    const now = Date.now();
    
    if (now - lastCall >= wait) {
      lastCall = now;
      func(...args);
    }
  };
}

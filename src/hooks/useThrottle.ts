import { useCallback, useRef } from 'react';

export default function useThrottle(fn: Function, delay: number = 0) {
  const timer = useRef(-1);
  const throttle = useCallback(() => {
    if (timer.current > -1) {
      return;
    }
    timer.current = window.setTimeout(() => {
      fn();
      timer.current = -1;
      clearTimeout(timer.current);
    }, delay);
  }, [fn, delay]);
  return throttle;
}
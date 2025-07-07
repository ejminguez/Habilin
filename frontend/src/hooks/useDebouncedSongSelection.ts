import { useCallback, useRef } from "react";

export const useDebouncedSongSelection = (
  callback: (index: number, autoPlay?: boolean) => void,
  delay: number = 300,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallRef = useRef<number>(0);

  const debouncedCallback = useCallback(
    (index: number, autoPlay?: boolean) => {
      const now = Date.now();

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // If it's been less than the delay since the last call, debounce it
      if (now - lastCallRef.current < delay) {
        timeoutRef.current = setTimeout(() => {
          callback(index, autoPlay);
          lastCallRef.current = Date.now();
        }, delay);
      } else {
        // Execute immediately if enough time has passed
        callback(index, autoPlay);
        lastCallRef.current = now;
      }
    },
    [callback, delay],
  );

  return debouncedCallback;
};

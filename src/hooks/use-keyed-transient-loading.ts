import { useEffect, useRef, useState } from 'react';

export function useKeyedTransientLoading(key: string, delayMs = 260) {
  const shouldBypassDelay = import.meta.env.MODE === 'test';
  const isFirstRender = useRef(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shouldBypassDelay) {
      setIsLoading(false);
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsLoading(true);
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [delayMs, key, shouldBypassDelay]);

  return isLoading;
}

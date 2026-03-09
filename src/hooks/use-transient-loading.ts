import { useEffect, useState } from 'react';

export function useTransientLoading(active = true, delayMs = 320) {
  const shouldBypassDelay = import.meta.env.MODE === 'test';
  const [isLoading, setIsLoading] = useState(active);

  useEffect(() => {
    if (shouldBypassDelay) {
      setIsLoading(false);
      return;
    }

    if (!active) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [active, delayMs, shouldBypassDelay]);

  return isLoading;
}

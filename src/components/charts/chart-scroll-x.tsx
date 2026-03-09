import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ChartScrollXProps = {
  children: ReactNode;
  minWidthPx?: number;
  initialScrollX?: 'start' | 'center';
  recenterOnResize?: boolean;
  className?: string;
};

export function ChartScrollX({
  children,
  minWidthPx = 720,
  initialScrollX = 'start',
  recenterOnResize = false,
  className,
}: ChartScrollXProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const style = {
    '--chart-scroll-x-min-width': `${minWidthPx}px`,
  } as CSSProperties;

  useLayoutEffect(() => {
    if (initialScrollX !== 'center') return;

    const element = containerRef.current;
    if (!element) return;

    const center = () => {
      if (element.scrollWidth <= element.clientWidth) return;
      element.scrollLeft = Math.max(0, (element.scrollWidth - element.clientWidth) / 2);
    };

    center();

    if (!recenterOnResize) return;

    window.addEventListener('resize', center);
    return () => window.removeEventListener('resize', center);
  }, [initialScrollX, recenterOnResize, minWidthPx]);

  return (
    <div
      ref={containerRef}
      style={style}
      className={cn(
        'h-full w-full min-w-0 overflow-x-auto overflow-y-hidden lg:overflow-x-visible',
        className,
      )}
    >
      <div className="h-full min-w-[var(--chart-scroll-x-min-width)] lg:min-w-0">
        {children}
      </div>
    </div>
  );
}

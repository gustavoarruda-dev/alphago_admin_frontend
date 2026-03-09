import type { ReactNode } from 'react';
import { BgFilter } from '@/components/bg-filter';
import { cn } from '@/lib/utils';

type AdminFilterPopoverSurfaceProps = {
  children: ReactNode;
  className?: string;
};

export function AdminFilterPopoverSurface({
  children,
  className,
}: AdminFilterPopoverSurfaceProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-[30px]',
        'border border-border bg-background text-foreground shadow-none',
        'dark:border-transparent dark:bg-[#1f1d20] dark:text-white',
        className,
      )}
    >
      <div className="hidden dark:block">
        <BgFilter />
        <div
          className="pointer-events-none absolute inset-[1px] rounded-[29px] border-[1px] opacity-60"
          style={{
            borderImage:
              'linear-gradient(120deg, rgba(120, 100, 200, 0.00), rgba(77, 75, 200, 0.60), rgba(87, 75, 200, 0.60), rgba(82, 75, 200, 0.00)) 1',
          }}
          aria-hidden
        />
      </div>
      <div className="relative z-10 max-h-[80vh] overflow-y-auto">{children}</div>
    </div>
  );
}

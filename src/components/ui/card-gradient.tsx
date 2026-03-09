import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardGradientProps {
  children: ReactNode;
  className?: string;
}

export function CardGradient({ children, className }: CardGradientProps) {
  return (
    <div
      className={cn(
        'relative rounded-[30px] z-10 px-4 py-3 card-gradient-bg card-shadow-light',
        className,
      )}
    >
      <div className="absolute left-0 top-1/4 bottom-1/4 w-px z-20 hidden dark:block card-gradient-border-left" />
      <div className="absolute right-0 top-1/4 bottom-1/4 w-px z-20 hidden dark:block card-gradient-border-right" />
      {children}
    </div>
  );
}

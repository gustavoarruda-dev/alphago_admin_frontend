import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonBorderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

export const ButtonBorder = React.forwardRef<HTMLButtonElement, ButtonBorderProps>(
  ({ children, className, isActive = false, disabled = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          isActive &&
            [
              'button-border--active',
              'dark:border-white/35 dark:from-white/35 dark:to-white/10',
            ].join(' '),
          'relative inline-flex h-10 overflow-hidden rounded-full border-2 bg-gradient-to-br transition-all shadow-[0px_1.197px_29.915px_0px_rgba(69,42,124,0.10)] backdrop-blur-[35px]',
          disabled && 'opacity-40 cursor-not-allowed',
          !isActive &&
            [
              'border-border/40 from-background/40 to-background/10',
              'hover:from-background/55 hover:to-background/20',
              'dark:border-b-white/20 dark:border-t-white/20 dark:border-r-white/10 dark:border-l-white/10',
              'dark:from-white/10 dark:to-purple-950/15 dark:hover:from-white/20 dark:hover:to-white/4',
            ].join(' '),
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            'inline-flex size-full items-center justify-center rounded-[18px] px-3 py-1 text-sm font-medium text-foreground',
            isActive && 'force-white',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          )}
        >
          {children}
        </span>
      </button>
    );
  },
);

ButtonBorder.displayName = 'ButtonBorder';

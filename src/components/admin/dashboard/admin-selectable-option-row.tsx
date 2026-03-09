import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AdminSelectableOptionRowProps = {
  label: ReactNode;
  checked: boolean;
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
};

export function AdminSelectableOptionRow({
  label,
  checked,
  onClick,
  ariaLabel,
  className,
}: AdminSelectableOptionRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={checked}
      className={cn(
        'group flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-left',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5340F6]/40',
        checked ? 'bg-[#5340F6]/10' : 'bg-transparent',
        className,
      )}
    >
      <span
        className={cn(
          'flex size-4 items-center justify-center rounded-full border',
          checked
            ? 'border-[#5340F6]/70 bg-[#5340F6]/15'
            : 'border-border bg-transparent dark:border-white/20',
        )}
        aria-hidden
      >
        <span
          className={cn(
            'size-2 rounded-full transition-opacity',
            checked ? 'bg-[#5340F6] opacity-100' : 'opacity-0',
          )}
        />
      </span>
      <span
        className={cn(
          'text-[14px] transition-colors',
          checked
            ? 'font-medium text-foreground dark:text-white'
            : 'text-foreground/80 group-hover:text-foreground dark:text-white/80 dark:group-hover:text-white',
        )}
      >
        {label}
      </span>
    </button>
  );
}

import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AdminMiniPopoverSkeleton } from '@/components/admin/admin-mini-popover-skeleton';
import { AdminSelectableOptionRow } from '@/components/admin/dashboard/admin-selectable-option-row';
import { AdminUsersSelectPopoverSurface } from '@/components/admin/users/admin-users-form-field';
import { useTransientLoading } from '@/hooks';
import { cn } from '@/lib/utils';

export function AdminFeaturesCategorySelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isLoading = useTransientLoading(open);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            'relative inline-flex h-9 min-w-[168px] items-center justify-between overflow-hidden rounded-full border-2 bg-gradient-to-br px-5 text-left transition-all shadow-[0px_1.197px_29.915px_0px_rgba(69,42,124,0.10)] backdrop-blur-[35px]',
            'border-border/40 from-background/40 to-background/10 hover:from-background/55 hover:to-background/20',
            'dark:border-b-white/20 dark:border-t-white/20 dark:border-r-white/10 dark:border-l-white/10 dark:from-white/10 dark:to-purple-950/15 dark:hover:from-white/20 dark:hover:to-white/4',
          )}
        >
          <span className="text-[12px] text-foreground dark:text-white">{value}</span>
          <ChevronDown className="size-4 text-foreground/60 dark:text-white/55" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={8}
          avoidCollisions={false}
          className="z-[85] outline-none"
        >
          {isLoading ? (
            <AdminMiniPopoverSkeleton rows={4} widthClassName="w-[220px]" />
          ) : (
            <AdminUsersSelectPopoverSurface className="w-[var(--radix-popover-trigger-width)] min-w-[220px]">
              <div className="max-h-[240px] overflow-y-auto p-2">
                {options.map((option) => (
                  <Popover.Close asChild key={option}>
                    <div>
                      <AdminSelectableOptionRow
                        ariaLabel={option}
                        checked={value === option}
                        label={option}
                        onClick={() => onChange(option)}
                        className="dark:text-white"
                      />
                    </div>
                  </Popover.Close>
                ))}
              </div>
            </AdminUsersSelectPopoverSurface>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

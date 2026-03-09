import * as Popover from '@radix-ui/react-popover';
import type { ReactNode } from 'react';
import { ButtonBorder } from '@/components/ui/button-border';
import { cn } from '@/lib/utils';
import type { AdminDashboardFilterItem } from '@/data/admin-dashboard';

type AdminDashboardFilterSummaryProps = {
  items: AdminDashboardFilterItem[];
  filterPopoverContent: ReactNode;
};

export function AdminDashboardFilterSummary({
  items,
  filterPopoverContent,
}: AdminDashboardFilterSummaryProps) {
  const mdColsClass =
    items.length <= 1
      ? 'md:grid-cols-1'
      : items.length === 2
        ? 'md:grid-cols-2'
        : items.length === 3
          ? 'md:grid-cols-[minmax(0,0.95fr)_minmax(0,0.95fr)_minmax(0,1.35fr)]'
          : 'md:grid-cols-4';

  return (
    <div className="w-full" data-export-ignore="true">
      <div className="flex flex-col gap-6 py-1 md:flex-row md:items-start md:justify-between">
        <div className={cn('grid flex-1 grid-cols-1 gap-6', mdColsClass)}>
          {items.map((item) => (
            <div key={item.title}>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground dark:text-white">
                {item.title}
              </p>
              <div className="mt-1 text-[13px] leading-relaxed text-foreground/70 dark:text-white/50">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <Popover.Root>
          <Popover.Trigger asChild>
            <ButtonBorder
              type="button"
              className="h-9 w-full px-6 text-sm md:mt-1 md:w-auto"
              data-testid="admin-dashboard-filters-open"
            >
              Filtrar
            </ButtonBorder>
          </Popover.Trigger>
          {filterPopoverContent}
        </Popover.Root>
      </div>
    </div>
  );
}

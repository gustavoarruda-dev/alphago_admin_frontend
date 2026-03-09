import { cn } from '@/lib/utils';

type AdminDashboardChartLegendProps = {
  items: Array<{
    label: string;
    color: string;
  }>;
  className?: string;
};

export function AdminDashboardChartLegend({
  items,
  className,
}: AdminDashboardChartLegendProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-2', className)}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: item.color }}
            aria-hidden
          />
          <span className="text-[12px] text-foreground/60 dark:text-white/55">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

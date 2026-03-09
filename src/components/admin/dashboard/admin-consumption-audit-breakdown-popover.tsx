import * as Popover from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import type { AdminConsumptionAuditBreakdown } from '@/data/admin-consumption-audit';

type AdminConsumptionAuditBreakdownPopoverProps = {
  label: string;
  breakdown: AdminConsumptionAuditBreakdown[];
};

export function AdminConsumptionAuditBreakdownPopover({
  label,
  breakdown,
}: AdminConsumptionAuditBreakdownPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex items-center justify-end text-right text-[12px] text-white/65 transition-colors',
            'hover:text-white focus:outline-none focus:ring-2 focus:ring-ring/40',
          )}
        >
          {label}
        </button>
      </Popover.Trigger>

      <Popover.Content
        side="top"
        align="center"
        sideOffset={12}
        className={cn(
          'z-50 w-[165px] rounded-[22px] border px-4 py-3 shadow-[0px_18px_40px_rgba(0,0,0,0.34)]',
          'border-white/15 card-gradient-bg-modal backdrop-blur-[30px]',
        )}
      >
        <div className="space-y-1.5">
          {breakdown.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 text-[11px]">
              <span className={cn(item.label === 'Total' ? 'font-semibold text-white' : 'text-white/60')}>
                {item.label}
              </span>
              <span className={cn(item.label === 'Total' ? 'font-semibold text-white' : 'text-white/72')}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

import { cn } from '@/lib/utils';
import type { AdminBillingInvoiceStatus } from '@/data/admin-billing';

const toneByStatus: Record<AdminBillingInvoiceStatus, string> = {
  paid: 'bg-[#17352E] text-[#52E2A6]',
  'high-usage': 'bg-[#431A24] text-[#FF5B7C]',
  'awaiting-payment': 'bg-[#453714] text-[#FFD400]',
};

export function AdminBillingStatusPill({
  status,
  label,
}: {
  status: AdminBillingInvoiceStatus;
  label: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex min-h-6 items-center justify-center rounded-full px-2.5 text-[10px] font-medium leading-none',
        toneByStatus[status],
      )}
    >
      {label}
    </span>
  );
}

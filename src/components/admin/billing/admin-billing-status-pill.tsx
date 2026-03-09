import { cn } from '@/lib/utils';
import type { AdminBillingInvoiceStatus } from '@/data/admin-billing';

const toneByStatus: Record<AdminBillingInvoiceStatus, string> = {
  paid:
    'border-[#1CE590]/28 bg-[#0E3E2D] text-[#3AF0A5]',
  'high-usage':
    'border-[#FF4D73]/26 bg-[#4A1524] text-[#FF6E8E]',
  'awaiting-payment':
    'border-[#FFCF33]/28 bg-[#4A3910] text-[#FFD84D]',
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
        'inline-flex min-h-6 items-center justify-center rounded-full border px-2.5 text-[10px] font-semibold leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
        toneByStatus[status],
      )}
    >
      {label}
    </span>
  );
}

import { cn } from '@/lib/utils';

export function AdminUsersStatusPill({
  active,
  label,
}: {
  active: boolean;
  label: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex min-h-6 items-center justify-center rounded-full border px-2.5 text-[10px] font-semibold leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
        active
          ? 'border-[#1CE590]/28 bg-[#0E3E2D] text-[#3AF0A5]'
          : 'border-[#6F7284]/24 bg-[#323545] text-[#D9DCE7]',
      )}
    >
      {label}
    </span>
  );
}

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
        'inline-flex min-h-6 items-center justify-center rounded-full px-2.5 text-[10px] font-medium leading-none',
        active ? 'bg-[#17352E] text-[#52E2A6]' : 'bg-white/10 text-white/55',
      )}
    >
      {label}
    </span>
  );
}

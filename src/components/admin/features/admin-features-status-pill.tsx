import { cn } from '@/lib/utils';

export function AdminFeaturesStatusPill({
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
        active ? 'bg-[#17352E] text-[#52E2A6]' : 'bg-[#431A24] text-[#FF5B7C]',
      )}
    >
      {label}
    </span>
  );
}

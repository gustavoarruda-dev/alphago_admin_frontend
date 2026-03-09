import { Skeleton } from '@/components/ui/skeleton';

export function AdminMiniPopoverSkeleton({
  rows = 4,
  widthClassName = 'w-48',
}: {
  rows?: number;
  widthClassName?: string;
}) {
  return (
    <div
      className={`rounded-[22px] border border-white/10 card-gradient-bg-modal p-3 shadow-[0px_12px_36px_rgba(0,0,0,0.32)] ${widthClassName}`}
    >
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

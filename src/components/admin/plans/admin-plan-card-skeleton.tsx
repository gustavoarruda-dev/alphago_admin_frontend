import { Skeleton } from '@/components/ui/skeleton';

export function AdminPlanCardSkeleton() {
  return (
    <div className="rounded-[28px] border border-white/10 px-5 py-5 shadow-[0_18px_36px_rgba(0,0,0,0.16)]">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-24 rounded-md" />
          <Skeleton className="h-4 w-36 rounded-md" />
          <Skeleton className="h-6 w-28 rounded-md" />
          <Skeleton className="h-4 w-32 rounded-md" />
        </div>
        <Skeleton className="size-4 rounded-full" />
      </div>

      <div className="mt-4 space-y-0">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-t border-white/10 py-3"
          >
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="size-4 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

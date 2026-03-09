import { Skeleton } from '@/components/ui/skeleton';

export function AdminDashboardContentSkeleton({
  mode,
}: {
  mode: 'subscribers' | 'consumption-audit';
}) {
  if (mode === 'consumption-audit') {
    return (
      <div className="mt-10">
        <Skeleton className="h-8 w-64 rounded-md" />
        <div className="mt-6 rounded-[22px] card-gradient-bg p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="h-7 w-56 rounded-md" />
            <Skeleton className="size-7 rounded-full" />
          </div>
          <div className="mt-6 space-y-4">
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-[1.1fr_0.7fr_1.2fr_0.9fr_0.9fr_0.7fr] gap-4 border-b border-white/10 pb-4"
              >
                {Array.from({ length: 6 }).map((__, cellIndex) => (
                  <Skeleton key={cellIndex} className="h-4 w-full rounded-md" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Skeleton className="h-8 w-40 rounded-md" />
      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-[22px] card-gradient-bg p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-7 w-64 rounded-md" />
                <Skeleton className="h-4 w-40 rounded-md" />
              </div>
              <Skeleton className="size-7 rounded-full" />
            </div>
            <Skeleton className="mt-6 h-[220px] w-full rounded-[18px]" />
          </div>
        ))}
        <div className="xl:col-span-2 rounded-[22px] card-gradient-bg p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="h-7 w-72 rounded-md" />
            <Skeleton className="size-7 rounded-full" />
          </div>
          <Skeleton className="mt-6 h-[280px] w-full rounded-[18px]" />
        </div>
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={`bottom-${index}`} className="rounded-[22px] card-gradient-bg p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <Skeleton className="h-7 w-64 rounded-md" />
              <Skeleton className="size-7 rounded-full" />
            </div>
            <Skeleton className="mt-6 h-[220px] w-full rounded-[18px]" />
          </div>
        ))}
        <div className="xl:col-span-2 rounded-[22px] card-gradient-bg p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="h-7 w-72 rounded-md" />
            <Skeleton className="size-7 rounded-full" />
          </div>
          <Skeleton className="mt-6 h-[280px] w-full rounded-[18px]" />
        </div>
      </div>
    </div>
  );
}

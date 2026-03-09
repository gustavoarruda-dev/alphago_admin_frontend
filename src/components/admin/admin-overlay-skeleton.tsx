import { Skeleton } from '@/components/ui/skeleton';

export function AdminOverlaySkeleton({
  showCalendar = false,
  showDualSelects = false,
  showSections = 0,
}: {
  showCalendar?: boolean;
  showDualSelects?: boolean;
  showSections?: number;
}) {
  return (
    <div className="px-6 py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-52 rounded-md" />
          <Skeleton className="h-4 w-72 rounded-md" />
        </div>
        <Skeleton className="size-8 rounded-full" />
      </div>

      {showCalendar ? (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="mx-auto h-5 w-28 rounded-md" />
              <Skeleton className="h-[250px] w-full rounded-[18px]" />
              <Skeleton className="h-4 w-44 rounded-md" />
            </div>
          ))}
        </div>
      ) : null}

      {showDualSelects ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Skeleton className="h-12 w-full rounded-full" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      ) : null}

      {showSections > 0 ? (
        <div className="mt-6 space-y-4">
          {Array.from({ length: showSections }).map((_, index) => (
            <div
              key={index}
              className="rounded-[22px] card-gradient-bg px-5 py-4"
            >
              <Skeleton className="h-5 w-44 rounded-md" />
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((__, fieldIndex) => (
                  <div key={fieldIndex} className="space-y-2">
                    <Skeleton className="h-3 w-24 rounded-md" />
                    <Skeleton className="h-4 w-36 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-9 flex flex-col items-center gap-5">
        <Skeleton className="h-10 min-w-[190px] rounded-full" />
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>
    </div>
  );
}

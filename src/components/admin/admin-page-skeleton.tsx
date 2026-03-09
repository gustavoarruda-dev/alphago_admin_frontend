import { Skeleton } from '@/components/ui/skeleton';

export function AdminPageSkeleton() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden app-gradient bg-background text-foreground p-4 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1440px] gap-4">
        <div className="card-sidebar hidden w-[88px] rounded-[22px] px-4 py-6 md:block">
          <div className="flex h-full flex-col items-center">
            <Skeleton className="size-12 rounded-full" />
            <div className="mt-10 flex flex-col items-center gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="size-6 rounded-full" />
              ))}
            </div>
            <div className="mt-auto">
              <Skeleton className="size-6 rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-6 rounded-[36px] px-2 py-4 md:px-8 md:py-8">
          <Skeleton className="h-10 w-56 rounded-full" />
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-8 w-80 rounded-full" />
            <Skeleton className="h-6 w-48 rounded-full" />
          </div>
          <div className="card-gradient-bg rounded-[30px] p-8">
            <Skeleton className="mb-8 h-8 w-40 rounded-full" />
            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="dashboard-tile--disabled h-[148px] rounded-[28px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

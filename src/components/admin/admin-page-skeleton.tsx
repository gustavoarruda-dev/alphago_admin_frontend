import { Skeleton } from '@/components/ui/skeleton';

export function AdminPageSkeleton() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden app-gradient bg-background text-foreground">
      <div className="hidden md:block fixed left-5 top-5 bottom-5 z-20 h-[calc(100vh-2.5rem)] w-[88px]">
        <div className="card-sidebar h-full rounded-[18px] px-4 py-6">
          <div className="flex h-full flex-col items-center">
            <Skeleton className="size-12 rounded-full" />
            <div className="mt-10 flex flex-col items-center gap-6">
              {Array.from({ length: 7 }).map((_, index) => (
                <Skeleton key={index} className="size-6 rounded-full" />
              ))}
            </div>
            <div className="mt-auto">
              <Skeleton className="size-6 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 md:ml-[120px] p-4 sm:p-6 pb-16 sm:pb-24 md:pb-6">
        <section className="w-full max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-10 w-44 rounded-md" />
            <Skeleton className="size-6 rounded-full" />
          </div>

          <div className="mt-4 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-4">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-5 w-72 rounded-full" />
              </div>
              <div className="mt-6 space-y-3">
                <Skeleton className="h-8 w-48 rounded-md" />
                <Skeleton className="h-5 w-80 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-5 w-56 rounded-md xl:mt-[3.6rem]" />
          </div>

          <div className="mt-6 rounded-[22px] card-gradient-bg p-6 sm:p-7">
            <Skeleton className="h-8 w-44 rounded-md" />
            <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="dashboard-tile--disabled h-[148px] rounded-[28px]"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

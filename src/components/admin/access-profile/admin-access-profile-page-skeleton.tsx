import { Skeleton } from '@/components/ui/skeleton';

export function AdminAccessProfilePageSkeleton() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden app-gradient bg-background text-foreground"
      data-testid="admin-access-profile-page-skeleton"
    >
      <div className="hidden md:block fixed left-0 top-0 z-20 h-full w-[120px] p-5">
        <div className="card-sidebar h-full rounded-[22px] px-4 py-6">
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
                <Skeleton className="h-8 w-56 rounded-md" />
                <Skeleton className="h-5 w-72 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-5 w-56 rounded-md xl:mt-[3.6rem]" />
          </div>

          <div className="mt-6 rounded-[22px] card-gradient-bg p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <Skeleton className="h-7 w-44 rounded-md" />
                <Skeleton className="h-4 w-80 rounded-md" />
              </div>
              <Skeleton className="h-9 w-[180px] rounded-full" />
            </div>

            <div className="mt-6 rounded-[22px] border border-white/10 p-5">
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-6 w-28 rounded-md" />
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="size-7 rounded-full" />
                  ))}
                </div>
              </div>
              <div className="mt-5 space-y-5">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton className="h-5 w-28 rounded-md" />
                    <div className="flex flex-wrap gap-3">
                      {Array.from({ length: 5 }).map((__, chipIndex) => (
                        <Skeleton
                          key={chipIndex}
                          className="h-5 w-[132px] rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} className="h-[54px] w-full rounded-[18px]" />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

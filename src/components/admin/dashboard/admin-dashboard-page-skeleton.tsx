import { CardGradient } from '@/components/ui/card-gradient';
import { Skeleton } from '@/components/ui/skeleton';

export function AdminDashboardPageSkeleton() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden app-gradient bg-background text-foreground"
      data-testid="admin-dashboard-page-skeleton"
    >
      <div className="hidden md:block fixed left-0 top-0 z-20 h-full w-[120px] p-5">
        <div className="card-sidebar h-full rounded-[22px] px-4 py-6">
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
                <Skeleton className="h-8 w-40 rounded-md" />
                <Skeleton className="h-5 w-80 rounded-md" />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="h-9 w-28 rounded-full" />
                <Skeleton className="h-9 w-44 rounded-full" />
              </div>
            </div>

            <Skeleton className="h-5 w-56 rounded-md xl:mt-[3.6rem]" />
          </div>

          <div className="mt-8 flex flex-col gap-6 py-1 md:flex-row md:items-start md:justify-between">
            <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-3 w-32 rounded-full" />
                <Skeleton className="h-4 w-48 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-24 rounded-full" />
                <Skeleton className="h-4 w-40 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-9 w-full rounded-full md:mt-1 md:w-28" />
          </div>

          <div className="mt-10">
            <Skeleton className="h-8 w-40 rounded-md" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <CardGradient key={`line-card-${index}`} className="rounded-[22px] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-7 w-72 rounded-md" />
                    <Skeleton className="h-4 w-56 rounded-md" />
                  </div>
                  <Skeleton className="size-7 rounded-full" />
                </div>
                <Skeleton className="mt-6 h-[252px] w-full rounded-[18px] bg-foreground/5 dark:bg-white/5" />
              </CardGradient>
            ))}

            {Array.from({ length: 2 }).map((_, index) => (
              <CardGradient key={`donut-card-${index}`} className="rounded-[22px] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <Skeleton className="h-7 w-64 rounded-md" />
                  <Skeleton className="size-7 rounded-full" />
                </div>
                <Skeleton className="mt-6 h-[220px] w-full rounded-[18px] bg-foreground/5 dark:bg-white/5" />
                <div className="mt-4 flex gap-4">
                  {Array.from({ length: 5 }).map((__, legendIndex) => (
                    <Skeleton key={legendIndex} className="h-4 w-10 rounded-full" />
                  ))}
                </div>
              </CardGradient>
            ))}

            <div className="xl:col-span-2">
              <CardGradient className="rounded-[22px] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <Skeleton className="h-7 w-80 rounded-md" />
                  <Skeleton className="size-7 rounded-full" />
                </div>
                <Skeleton className="mt-6 h-[280px] w-full rounded-[18px] bg-foreground/5 dark:bg-white/5" />
                <div className="mt-4 flex gap-4">
                  {Array.from({ length: 5 }).map((_, legendIndex) => (
                    <Skeleton key={legendIndex} className="h-4 w-10 rounded-full" />
                  ))}
                </div>
              </CardGradient>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

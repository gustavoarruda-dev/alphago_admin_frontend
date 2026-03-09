import { useRef, type ReactNode } from 'react';
import { CardGradient } from '@/components/ui/card-gradient';
import { cn } from '@/lib/utils';
import { AdminKebabExportMenu } from './admin-kebab-export-menu';

type AdminDashboardCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  exportBaseFileName?: string;
  headerAction?: ReactNode;
};

export function AdminDashboardCard({
  title,
  subtitle,
  children,
  className,
  contentClassName,
  exportBaseFileName,
  headerAction,
}: AdminDashboardCardProps) {
  const exportRef = useRef<HTMLDivElement>(null);

  return (
    <CardGradient className={cn('rounded-[22px] p-5 sm:p-6', className)}>
      <div ref={exportRef}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-foreground dark:text-white text-[20px] font-semibold leading-tight">
              {title}
            </h3>
            {subtitle ? (
              <p className="mt-1 text-[12px] text-foreground/60 dark:text-white/50">
                {subtitle}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            {headerAction}
            {exportBaseFileName ? (
              <AdminKebabExportMenu
                kind="chart"
                baseFileName={exportBaseFileName}
                targetRef={exportRef}
              />
            ) : null}
          </div>
        </div>
        <div className={cn('mt-5', contentClassName)}>{children}</div>
      </div>
    </CardGradient>
  );
}

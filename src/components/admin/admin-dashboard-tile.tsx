import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { AdminTileItem } from '@/data/admin-account-sections';

export function AdminDashboardTile({ item }: { item: AdminTileItem }) {
  const isDisabled = !item.active;

  const Wrapper: React.FC<PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
  }) =>
    isDisabled ? (
      <button
        type="button"
        aria-label={item.label}
        aria-disabled
        disabled
        className={cn(className, 'cursor-default')}
      >
        {children}
      </button>
    ) : item.href ? (
      <Link to={item.href} aria-label={item.label} className={className}>
        {children}
      </Link>
    ) : (
      <button type="button" aria-label={item.label} className={className}>
        {children}
      </button>
    );

  const baseSize =
    'shrink-0 grow-0 w-full aspect-square sm:w-[120px] sm:h-[118px] md:w-[128px] md:h-[126px] rounded-[30px] overflow-hidden transition-all duration-200 ease-out transform-gpu will-change-transform flex items-center justify-center';

  const transformHover = isDisabled
    ? ''
    : 'hover:-translate-y-0.5 hover:scale-[1.015] motion-reduce:hover:transform-none';

  const cardClasses = cn(
    baseSize,
    transformHover,
    'dashboard-tile',
    isDisabled ? 'dashboard-tile--disabled' : 'dashboard-tile--enabled',
  );

  return (
    <Wrapper className="block w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 rounded-3xl">
      <div className={cardClasses}>
        <div className="flex flex-col items-center justify-center h-full p-2">
          <div className="flex items-center justify-center">
            <img
              src={item.src}
              alt=""
              width={36}
              height={36}
              className="size-9 object-contain dashboard-tile-icon"
            />
          </div>

          <h4
            className={cn(
              'mt-1 text-[10px] min-[360px]:text-[11px] sm:text-xs text-center leading-tight px-1 line-clamp-2',
              isDisabled ? 'text-foreground opacity-60' : 'force-white',
            )}
          >
            {item.label}
          </h4>
        </div>
      </div>
    </Wrapper>
  );
}

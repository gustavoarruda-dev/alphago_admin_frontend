import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme';
import type { AdminSidebarLink } from '@/data/admin-sidebar';
import { AdminSidebarIcon } from './admin-sidebar-icon';

export function AdminSidebar({
  entries,
  footer,
  activeId,
  onSelect,
}: {
  entries: AdminSidebarLink[];
  footer: AdminSidebarLink;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const renderItem = (entry: AdminSidebarLink) => {
    const isActive = entry.id === activeId;
    const isDisabled = entry.disabled || !entry.href;

    return (
      <button
        key={entry.id}
        type="button"
        onClick={() => {
          if (isDisabled) return;
          onSelect(entry.id);
        }}
        className={cn('w-full text-left', isActive && 'rounded-md', isDisabled && 'cursor-default')}
        aria-label={entry.label}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        title={entry.label}
      >
        <div className="group/item flex items-center gap-3 p-2 rounded-md transition-colors">
          <div className="relative flex justify-center items-center p-2 min-w-[40px] min-h-[40px] rounded-full transition-colors">
            <span
              className={cn(
                'absolute aspect-square scale-150 brand-purple-bg px-4 py-2 rounded-full blur-0 dark:blur-[2px] transition-opacity',
                isActive ? 'opacity-100' : 'opacity-0',
              )}
            />
            <AdminSidebarIcon
              src={entry.icon}
              isActive={isActive}
              isDisabled={isDisabled}
              className="relative transition-transform duration-200 group-hover/item:scale-110"
            />
          </div>

          <div
            className={cn(
              'flex items-center justify-between flex-1 gap-2',
              'opacity-0 group-hover:opacity-100 transition-all duration-200',
              'group-hover/item:translate-x-0.5 group-hover/item:scale-[1.02]',
            )}
          >
            <span
              className={cn(
                'text-sm font-medium whitespace-nowrap',
                isDisabled
                  ? 'text-foreground/40'
                  : isActive
                    ? 'text-[#5340F6]'
                    : 'text-foreground/80',
              )}
            >
              {entry.label}
            </span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <>
      <aside
        className="
          hidden md:flex
          group card-sidebar
          fixed left-5 top-5 bottom-5 z-50
          w-[88px] hover:w-[224px]
          rounded-[18px] py-4 pl-4 pr-0
          flex-col gap-5
          transition-all duration-300 overflow-hidden
        "
      >
        <div className="dashboard-sidebar-scroll h-full overflow-y-hidden group-hover:overflow-y-auto overflow-x-hidden">
          <div className="flex h-full flex-col gap-4 pr-4" data-export-ignore="true">
            {entries.map(renderItem)}

            <div className="mt-auto pb-2">
              <div className="px-1 pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ThemeToggle className="w-full justify-start" showLabel />
              </div>
              {renderItem(footer)}
            </div>
          </div>
        </div>
      </aside>

    </>
  );
}

import type { ReactNode } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { ADMIN_SIDEBAR_ENTRIES, ADMIN_SIDEBAR_FOOTER } from '@/data/admin-sidebar';
import { useNavigate } from 'react-router-dom';

export function AdminShell({
  children,
  activeSidebarItem = 'account',
}: {
  children: ReactNode;
  activeSidebarItem?: string;
}) {
  const navigate = useNavigate();

  const handleSidebarSelect = (id: string) => {
    const target = [...ADMIN_SIDEBAR_ENTRIES, ADMIN_SIDEBAR_FOOTER].find(
      (entry) => entry.id === id,
    );

    if (target?.href) {
      navigate(target.href);
      return;
    }

  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden app-gradient bg-background text-foreground">
      <AdminSidebar
        entries={ADMIN_SIDEBAR_ENTRIES}
        footer={ADMIN_SIDEBAR_FOOTER}
        activeId={activeSidebarItem}
        onSelect={handleSidebarSelect}
      />

      <main className="relative z-10 md:ml-[120px] p-4 sm:p-6 pb-16 sm:pb-24 md:pb-6">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </main>

      <div className="pointer-events-none absolute inset-0 z-0 hidden dark:block">
        <div className="absolute -top-24 -left-20 size-[576px] rounded-full opacity-90 blur-[120px] bg-[radial-gradient(closest-side,#0A064E,transparent_90%)]" />
      </div>
    </div>
  );
}

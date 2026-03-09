import { useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { AdminSectionHeader } from '@/components/admin/admin-section-header';
import { AdminUsersPageSkeleton } from '@/components/admin/users/admin-users-page-skeleton';
import { AdminUsersTableCard } from '@/components/admin/users/admin-users-table-card';
import type { DataTableSortState } from '@/components/ui/data-table';
import { ADMIN_USERS_ROWS } from '@/data/admin-users';
import { useCurrentDateTime, useTransientLoading } from '@/hooks';

export function AdminUsersPage() {
  const currentDateTime = useCurrentDateTime();
  const isLoading = useTransientLoading();
  const [usersSort, setUsersSort] = useState<DataTableSortState>({
    sortBy: 'name',
    sortOrder: 'asc',
  });

  if (isLoading) {
    return <AdminUsersPageSkeleton />;
  }

  return (
    <AdminShell activeSidebarItem="users">
      <section className="w-full max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-16">
        <AdminSectionHeader
          currentDateTime={currentDateTime}
          breadcrumb={[
            { label: 'Minha conta' },
            { label: 'Usuários Admin', current: true },
          ]}
          title="Usuários Administrativos"
          description="Gerencie os administradores do sistema"
          backTo="/account"
          logoLinkTo="/dashboard"
        />

        <div className="mt-6">
          <AdminUsersTableCard
            title="Lista de Usuários Admin"
            rows={ADMIN_USERS_ROWS}
            sort={usersSort}
            onSortChange={setUsersSort}
          />
        </div>
      </section>
    </AdminShell>
  );
}

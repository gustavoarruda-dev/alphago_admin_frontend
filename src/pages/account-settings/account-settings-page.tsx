import { AdminShell } from '@/components/admin/admin-shell';
import { AdminPageSkeleton } from '@/components/admin/admin-page-skeleton';
import { AdminSectionHeader } from '@/components/admin/admin-section-header';
import { AdminSettingsSectionCard } from '@/components/admin/admin-settings-section-card';
import { ADMIN_ACCOUNT_SECTION } from '@/data/admin-account-sections';
import { useCurrentDateTime, useTransientLoading } from '@/hooks';

export function AccountSettingsPage() {
  const currentDateTime = useCurrentDateTime();
  const isLoading = useTransientLoading();

  if (isLoading) {
    return <AdminPageSkeleton />;
  }

  return (
    <AdminShell activeSidebarItem="account">
      <section className="w-full max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-16">
        <AdminSectionHeader
          currentDateTime={currentDateTime}
          breadcrumb={[
            { label: 'Configurações' },
            { label: 'Minha Conta', current: true },
          ]}
          title="Minha Conta"
          description="Selecione a função que deseja configurar"
          backTo="/account"
        />

        <div className="flex flex-col gap-4 mt-6 w-full">
          <AdminSettingsSectionCard section={ADMIN_ACCOUNT_SECTION} />
        </div>
      </section>
    </AdminShell>
  );
}

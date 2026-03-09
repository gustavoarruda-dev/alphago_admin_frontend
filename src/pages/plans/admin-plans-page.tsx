import { useMemo, useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { AdminSectionHeader } from '@/components/admin/admin-section-header';
import { AdminPlanCard } from '@/components/admin/plans/admin-plan-card';
import { AdminPlanCardSkeleton } from '@/components/admin/plans/admin-plan-card-skeleton';
import { AdminPlansPageSkeleton } from '@/components/admin/plans/admin-plans-page-skeleton';
import { ButtonBorder } from '@/components/ui/button-border';
import {
  ADMIN_PLAN_AUDIENCE_OPTIONS,
  ADMIN_PLANS,
  type AdminPlanAudience,
} from '@/data/admin-plans';
import { useCurrentDateTime, useKeyedTransientLoading, useTransientLoading } from '@/hooks';

export function AdminPlansPage() {
  const currentDateTime = useCurrentDateTime();
  const isLoading = useTransientLoading();
  const [selectedAudience, setSelectedAudience] =
    useState<AdminPlanAudience>('agencias');
  const isPlansLoading = useKeyedTransientLoading(selectedAudience);

  const filteredPlans = useMemo(
    () => ADMIN_PLANS.filter((plan) => plan.audience === selectedAudience),
    [selectedAudience],
  );

  if (isLoading) {
    return <AdminPlansPageSkeleton />;
  }

  return (
    <AdminShell activeSidebarItem="plans">
      <section className="w-full max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-16">
        <AdminSectionHeader
          currentDateTime={currentDateTime}
          breadcrumb={[
            { label: 'Minha Conta' },
            { label: 'Planos', current: true },
          ]}
          title="Planos"
          description="Escolha o plano ideal para você"
          backTo="/account"
          logoLinkTo="/dashboard"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          {ADMIN_PLAN_AUDIENCE_OPTIONS.map((option) => (
            <ButtonBorder
              key={option.value}
              type="button"
              isActive={selectedAudience === option.value}
              className="h-10 min-w-[108px] px-5 text-[12px]"
              onClick={() => setSelectedAudience(option.value)}
            >
              {option.label}
            </ButtonBorder>
          ))}
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-4">
          {isPlansLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <AdminPlanCardSkeleton key={index} />
              ))
            : filteredPlans.map((plan) => <AdminPlanCard key={plan.id} plan={plan} />)}
        </div>
      </section>
    </AdminShell>
  );
}

export default AdminPlansPage;

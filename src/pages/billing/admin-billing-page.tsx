import { useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { AdminSectionHeader } from '@/components/admin/admin-section-header';
import { AdminBillingPageSkeleton } from '@/components/admin/billing/admin-billing-page-skeleton';
import { AdminBillingInvoicesTableCard } from '@/components/admin/billing/admin-billing-invoices-table-card';
import { AdminBillingMixedChartCard } from '@/components/admin/billing/admin-billing-mixed-chart-card';
import { AdminDashboardLineChartCard } from '@/components/admin/dashboard/admin-dashboard-line-chart-card';
import { ButtonBorder } from '@/components/ui/button-border';
import type { DataTableSortState } from '@/components/ui/data-table';
import {
  ADMIN_BILLING_CURRENT_MONTH_CONSUMPTION,
  ADMIN_BILLING_EXCESS_CONSUMPTION,
  ADMIN_BILLING_EXCESS_COST_EVOLUTION,
  ADMIN_BILLING_INVOICE_ROWS,
} from '@/data/admin-billing';
import { useCurrentDateTime, useToast, useTransientLoading } from '@/hooks';

function formatCurrencyCompact(value: number): string {
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toLocaleString('pt-BR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}M`;
  }

  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}K`;
  }

  return `R$ ${value.toLocaleString('pt-BR')}`;
}

function formatCurrencyPrecise(value: number): string {
  return `R$ ${value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function AdminBillingPage() {
  const currentDateTime = useCurrentDateTime();
  const { toast } = useToast();
  const isLoading = useTransientLoading();
  const [invoiceSort, setInvoiceSort] = useState<DataTableSortState>({
    sortBy: 'issuedAt',
    sortOrder: 'desc',
  });

  if (isLoading) {
    return <AdminBillingPageSkeleton />;
  }

  return (
    <AdminShell activeSidebarItem="billing">
      <section className="w-full max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-16">
        <AdminSectionHeader
          currentDateTime={currentDateTime}
          breadcrumb={[
            { label: 'Minha Conta' },
            { label: 'Faturamento', current: true },
          ]}
          title="Faturamento"
          description="Acompanhe receitas, transações e métricas financeiras"
          backTo="/account"
          logoLinkTo="/dashboard"
        />

        <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
          <AdminDashboardLineChartCard
            title={ADMIN_BILLING_CURRENT_MONTH_CONSUMPTION.title}
            data={ADMIN_BILLING_CURRENT_MONTH_CONSUMPTION.data}
            series={ADMIN_BILLING_CURRENT_MONTH_CONSUMPTION.series}
            showLegend={false}
            chartClassName="h-[252px] sm:h-[272px]"
            labelFormatter={(label) => label}
            valueFormatter={(value) => formatCurrencyPrecise(value)}
            yAxisFormatter={(value) => formatCurrencyCompact(value)}
            xTickAngle={-45}
            xTickHeight={76}
            xTickMargin={12}
            xAxisInterval={0}
            chartTopMargin={12}
            chartLeftMargin={4}
            chartRightMargin={10}
            chartBottomMargin={2}
            yAxisWidth={68}
            minChartWidthPx={760}
          />

          <AdminBillingMixedChartCard
            title={ADMIN_BILLING_EXCESS_CONSUMPTION.title}
            subtitle={ADMIN_BILLING_EXCESS_CONSUMPTION.subtitle}
            data={ADMIN_BILLING_EXCESS_CONSUMPTION.data}
            series={ADMIN_BILLING_EXCESS_CONSUMPTION.series}
            valueFormatter={(value) => formatCurrencyPrecise(value)}
            yAxisFormatter={(value) => formatCurrencyCompact(value)}
            minChartWidthPx={760}
          />

          <div className="xl:col-span-2">
            <AdminDashboardLineChartCard
              title={ADMIN_BILLING_EXCESS_COST_EVOLUTION.title}
              data={ADMIN_BILLING_EXCESS_COST_EVOLUTION.data}
              series={ADMIN_BILLING_EXCESS_COST_EVOLUTION.series}
              chartClassName="h-[240px] sm:h-[280px]"
              labelFormatter={(label) => label}
              valueFormatter={(value) => formatCurrencyPrecise(value)}
              yAxisFormatter={(value) => value.toLocaleString('pt-BR')}
              headerAction={
                <ButtonBorder
                  type="button"
                  className="h-8 px-4 text-[11px]"
                  onClick={() =>
                    toast({
                      title: 'Revisão de plano',
                      description: 'A análise do plano anual será conectada na próxima etapa.',
                    })
                  }
                >
                  Revisar Plano Anual
                </ButtonBorder>
              }
            />
          </div>

          <div className="xl:col-span-2">
            <AdminBillingInvoicesTableCard
              title="Lista de Faturas"
              rows={ADMIN_BILLING_INVOICE_ROWS}
              sort={invoiceSort}
              onSortChange={setInvoiceSort}
            />
          </div>
        </div>
      </section>
    </AdminShell>
  );
}

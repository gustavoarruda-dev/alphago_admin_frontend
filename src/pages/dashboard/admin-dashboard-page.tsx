import { useMemo, useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { AdminConsumptionAuditTableCard } from '@/components/admin/dashboard/admin-consumption-audit-table-card';
import { AdminDashboardDonutCard } from '@/components/admin/dashboard/admin-dashboard-donut-card';
import {
  AdminDashboardFilterPopoverContent,
  type AdminDashboardFilterValue,
} from '@/components/admin/dashboard/admin-dashboard-filter-popover';
import { AdminDashboardHeader } from '@/components/admin/dashboard/admin-dashboard-header';
import { AdminDashboardLineChartCard } from '@/components/admin/dashboard/admin-dashboard-line-chart-card';
import type { DataTableSortState } from '@/components/ui/data-table';
import {
  ADMIN_CONSUMPTION_AUDIT_MODELS,
  ADMIN_CONSUMPTION_AUDIT_ROWS,
} from '@/data/admin-consumption-audit';
import {
  ADMIN_DASHBOARD_VIEWS,
  type AdminDashboardFilterItem,
  type AdminDashboardTabId,
} from '@/data/admin-dashboard';
import { useCurrentDateTime, useToast } from '@/hooks';
import { formatDateRangePt } from '@/lib/iso-date';

function formatCurrency(value: number) {
  return `R$ ${value.toLocaleString('pt-BR')}`;
}

function formatCurrencyPrecise(value: number) {
  return `R$ ${value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function buildInitialFiltersByTab(): Record<AdminDashboardTabId, AdminDashboardFilterValue> {
  return {
    agents: structuredClone(ADMIN_DASHBOARD_VIEWS.agents.defaultFilterValue),
    subscribers: structuredClone(ADMIN_DASHBOARD_VIEWS.subscribers.defaultFilterValue),
    'consumption-audit': structuredClone(
      ADMIN_DASHBOARD_VIEWS['consumption-audit'].defaultFilterValue,
    ),
  };
}

function formatComparisonLabel(value: AdminDashboardFilterValue): string {
  if (value.comparison.mode === 'none') return '-';
  if (value.comparison.mode === 'previous_period') return 'Automático';
  if (!value.comparison.period) return '-';
  return formatDateRangePt(
    value.comparison.period.startDate,
    value.comparison.period.endDate,
  );
}

export function AdminDashboardPage() {
  const currentDateTime = useCurrentDateTime();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminDashboardTabId>('subscribers');
  const [consumptionAuditSort, setConsumptionAuditSort] = useState<DataTableSortState>({
    sortBy: 'dateTime',
    sortOrder: 'desc',
  });
  const [filtersByTab, setFiltersByTab] = useState<Record<AdminDashboardTabId, AdminDashboardFilterValue>>(
    () => buildInitialFiltersByTab(),
  );

  const view = ADMIN_DASHBOARD_VIEWS[activeTab];
  const activeFilters = filtersByTab[activeTab];
  const isSubscribersTab = activeTab === 'subscribers';
  const isConsumptionAuditTab = activeTab === 'consumption-audit';
  const filterItems = useMemo(
    () => {
      const selectedConsumptionModels =
        activeFilters.models ?? [...ADMIN_CONSUMPTION_AUDIT_MODELS];
      const items: AdminDashboardFilterItem[] = [
        {
          title: 'Período analisado',
          value: formatDateRangePt(
            activeFilters.period.startDate,
            activeFilters.period.endDate,
          ),
        },
        {
          title: 'Período de comparação',
          value: formatComparisonLabel(activeFilters),
        },
      ];

      if (isConsumptionAuditTab) {
        items.push({
          title: 'Modelo',
          value: (
            <span className="flex max-w-[15rem] flex-wrap gap-x-1 gap-y-0.5">
              {selectedConsumptionModels.length > 0 ? (
                selectedConsumptionModels.map((model, index) => (
                  <span key={model} className="whitespace-nowrap">
                    {model}
                    {index < selectedConsumptionModels.length - 1 ? ',' : ''}
                  </span>
                ))
              ) : (
                <span>-</span>
              )}
            </span>
          ),
        });
      }

      return items;
    },
    [activeFilters, isConsumptionAuditTab],
  );

  const filteredConsumptionAuditRows = useMemo(() => {
    const selectedModels = activeFilters.models ?? [...ADMIN_CONSUMPTION_AUDIT_MODELS];

    return ADMIN_CONSUMPTION_AUDIT_ROWS.filter((row) =>
      selectedModels.includes(row.modelFamily),
    );
  }, [activeFilters.models]);

  return (
    <AdminShell activeSidebarItem="dashboard">
      <section className="w-full max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-16">
        <AdminDashboardHeader
          activeTab={activeTab}
          currentDateTime={currentDateTime}
          filterItems={filterItems}
          filterPopoverContent={
            <AdminDashboardFilterPopoverContent
              value={activeFilters}
              onApply={(next) => {
                setFiltersByTab((previous) => ({
                  ...previous,
                  [activeTab]: next,
                }));
                toast({
                  title: 'Filtros atualizados',
                  description: 'O dashboard foi atualizado com o período selecionado.',
                });
              }}
              onClear={() => {
                setFiltersByTab((previous) => ({
                  ...previous,
                  [activeTab]: structuredClone(view.defaultFilterValue),
                }));
              }}
              dialogTitle={isConsumptionAuditTab ? 'Selecionar Periodo' : 'Filtros'}
              dialogLabel={isConsumptionAuditTab ? 'Selecionar Periodo' : 'Filtros'}
              comparisonTitle={
                isConsumptionAuditTab
                  ? 'Selecione o período de comparação'
                  : 'Comparação'
              }
              comparisonPeriodTitle={
                isConsumptionAuditTab
                  ? 'Selecionar periodo de comparação'
                  : 'Período de comparação'
              }
              showModels={isConsumptionAuditTab}
              modelOptions={ADMIN_CONSUMPTION_AUDIT_MODELS}
              comparisonOptions={
                isConsumptionAuditTab
                  ? [
                      { mode: 'previous_period', label: 'Automático' },
                      { mode: 'none', label: 'Não comparar' },
                      { mode: 'custom', label: 'Manual' },
                    ]
                  : undefined
              }
            />
          }
          onTabChange={setActiveTab}
        />

        {isSubscribersTab ? (
          <>
            <div className="mt-10">
              <h2 className="text-[26px] font-semibold text-slate-950 dark:text-white">
                Assinantes
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
              <AdminDashboardLineChartCard
                title={view.last90Days.title}
                subtitle={view.last90Days.subtitle}
                data={view.last90Days.data}
                series={view.last90Days.series}
                showLegend={false}
                chartClassName="h-[252px] sm:h-[272px]"
                labelFormatter={(label) => label}
                valueFormatter={(value) => formatCurrency(value)}
                yAxisFormatter={(value) => formatCurrency(value)}
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

              <AdminDashboardLineChartCard
                title={view.novemberOverage.title}
                subtitle={view.novemberOverage.subtitle}
                data={view.novemberOverage.data}
                series={view.novemberOverage.series}
                chartClassName="h-[252px] sm:h-[272px]"
                labelFormatter={(label) => label}
                valueFormatter={(value) => formatCurrency(value)}
                yAxisFormatter={(value) => formatCurrency(value)}
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

              <AdminDashboardDonutCard
                title={view.dailyTokens.title}
                data={view.dailyTokens.data}
              />

              <AdminDashboardDonutCard
                title={view.monthlyTokens.title}
                data={view.monthlyTokens.data}
              />

              <div className="xl:col-span-2">
                <AdminDashboardLineChartCard
                  title={view.tokenEvolution.title}
                  data={view.tokenEvolution.data}
                  series={view.tokenEvolution.series}
                  chartClassName="h-[240px] sm:h-[280px]"
                  labelFormatter={(label) => label}
                  valueFormatter={(value) => `${value.toLocaleString('pt-BR')} Tokens`}
                  yAxisFormatter={(value) => value.toLocaleString('pt-BR')}
                />
              </div>

              <AdminDashboardDonutCard
                title={view.dailyExcessCosts.title}
                data={view.dailyExcessCosts.data}
                valueFormatter={formatCurrencyPrecise}
              />

              <AdminDashboardDonutCard
                title={view.monthlyExcessCosts.title}
                data={view.monthlyExcessCosts.data}
                valueFormatter={formatCurrencyPrecise}
              />

              <div className="xl:col-span-2">
                <AdminDashboardLineChartCard
                  title={view.excessCostEvolution.title}
                  data={view.excessCostEvolution.data}
                  series={view.excessCostEvolution.series}
                  chartClassName="h-[240px] sm:h-[280px]"
                  labelFormatter={(label) => label}
                  valueFormatter={formatCurrencyPrecise}
                  yAxisFormatter={(value) => value.toLocaleString('pt-BR')}
                />
              </div>
            </div>
          </>
        ) : null}

        {isConsumptionAuditTab ? (
          <>
            <div className="mt-10">
              <h2 className="text-[26px] font-semibold text-slate-950 dark:text-white">
                Auditoria de Consumo
              </h2>
            </div>

            <div className="mt-6">
              <AdminConsumptionAuditTableCard
                title="Lista de Consumo"
                rows={filteredConsumptionAuditRows}
                sort={consumptionAuditSort}
                onSortChange={setConsumptionAuditSort}
              />
            </div>
          </>
        ) : null}
      </section>
    </AdminShell>
  );
}

export default AdminDashboardPage;

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CardGradient } from '@/components/ui/card-gradient';
import { DataTable, type DataTableColumn, type DataTableSortState } from '@/components/ui/data-table';
import { AdminKebabExportMenu } from '@/components/admin/dashboard/admin-kebab-export-menu';
import { Button } from '@/components/ui/button';
import type { TabularExportData } from '@/lib/export-element';
import type { AdminFeatureCategory, AdminFeatureRow } from '@/data/admin-features';
import { useKeyedTransientLoading } from '@/hooks';
import { AdminFeaturesStatusPill } from './admin-features-status-pill';
import { AdminFeatureToggleConfirmDialog } from './admin-feature-toggle-confirm-dialog';

function FeatureToggle({
  enabled,
  onToggle,
  label,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        enabled ? 'bg-[#17D982]' : 'bg-white/20'
      }`}
    >
      <span
        className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

export function AdminFeaturesCategoryCard({
  category,
  expanded,
  onToggleExpand,
}: {
  category: AdminFeatureCategory;
  expanded: boolean;
  onToggleExpand: () => void;
}) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(category.rows);
  const [pendingFeature, setPendingFeature] = useState<AdminFeatureRow | null>(null);
  const [pendingNextEnabled, setPendingNextEnabled] = useState(false);
  const [sort, setSort] = useState<DataTableSortState>({
    sortBy: 'priority',
    sortOrder: 'asc',
  });
  const rowsLoadingKey = JSON.stringify({
    categoryId: category.id,
    rowsCount: category.rows.length,
  });
  const isRowsLoading = useKeyedTransientLoading(rowsLoadingKey);

  useEffect(() => {
    setRows(category.rows);
  }, [category.rows]);

  const handleRequestToggle = (feature: AdminFeatureRow) => {
    setPendingFeature(feature);
    setPendingNextEnabled(!feature.enabled);
  };

  const handleConfirmToggle = () => {
    if (!pendingFeature) return;

    setRows((current) =>
      current.map((item) =>
        item.id === pendingFeature.id ? { ...item, enabled: pendingNextEnabled } : item,
      ),
    );
    setPendingFeature(null);
  };

  const columns = useMemo<Array<DataTableColumn<AdminFeatureRow>>>(
    () => [
      {
        id: 'name',
        header: 'Funcionalidade',
        sortKey: 'name',
        defaultSortOrder: 'asc',
        sortValue: (row) => row.name,
        cell: (row) => row.name,
      },
      {
        id: 'priority',
        header: 'Prioridade',
        sortKey: 'priority',
        defaultSortOrder: 'asc',
        sortValue: (row) => row.priority,
        cell: (row) => row.priority.toString(),
      },
      {
        id: 'status',
        header: 'Status',
        sortKey: 'status',
        defaultSortOrder: 'desc',
        sortValue: (row) => row.statusLabel,
        cell: (row) => (
          <AdminFeaturesStatusPill
            active={row.status === 'active'}
            label={row.statusLabel}
          />
        ),
      },
      {
        id: 'premium',
        header: 'Premium',
        sortKey: 'premium',
        defaultSortOrder: 'desc',
        sortValue: (row) => (row.premium ? 1 : 0),
        cell: (row) => (row.premium ? 'Sim' : 'Não'),
      },
      {
        id: 'updatedAt',
        header: 'Atualizado em',
        sortKey: 'updatedAt',
        defaultSortOrder: 'desc',
        sortValue: (row) => row.updatedAt,
        cell: (row) => row.updatedAt,
      },
      {
        id: 'enabled',
        header: 'Ligar / desligar funcionalidade',
        align: 'center',
        sortable: false,
        cell: (row) => (
          <div className="flex justify-center">
            <FeatureToggle
              enabled={row.enabled}
              label={`Alternar funcionalidade ${row.name}`}
              onToggle={() => handleRequestToggle(row)}
            />
          </div>
        ),
      },
    ],
    [],
  );

  const exportData = useMemo<TabularExportData>(
    () => ({
      sheetName: category.label,
      headers: ['Funcionalidade', 'Prioridade', 'Status', 'Premium', 'Atualizado em', 'Habilitada'],
      rows: rows.map((row) => [
        row.name,
        row.priority.toString(),
        row.statusLabel,
        row.premium ? 'Sim' : 'Não',
        row.updatedAt,
        row.enabled ? 'Sim' : 'Não',
      ]),
    }),
    [category.label, rows],
  );

  if (!expanded) {
    return (
      <Button
        type="button"
        variant="ghost"
        onClick={onToggleExpand}
        className="h-auto w-full justify-between rounded-[18px] border border-white/10 card-gradient-bg px-5 py-4 text-left text-foreground hover:bg-white/5 dark:text-white"
      >
        <span className="text-[16px]">{category.label}</span>
        <ChevronDown className="size-4 opacity-70" />
      </Button>
    );
  }

  return (
    <CardGradient className="rounded-[22px] p-4 sm:p-5">
      <div ref={exportRef}>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-[18px] font-medium text-foreground dark:text-white">
            {category.label}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Recolher ${category.label}`}
              onClick={onToggleExpand}
              className="inline-flex size-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronUp className="size-4" />
            </button>
            <AdminKebabExportMenu
              kind="table"
              baseFileName={`funcionalidades-${category.label}`}
              targetRef={exportRef}
              tableData={exportData}
            />
          </div>
        </div>

        <div className="mt-4">
          <DataTable
            columns={columns}
            rows={rows}
            isLoading={isRowsLoading}
            getRowKey={(row) => row.id}
            minWidthPx={1180}
            variant="dark"
            sort={sort}
            onSortChange={setSort}
            tableClassName="table-fixed"
          />
        </div>
      </div>

      <AdminFeatureToggleConfirmDialog
        feature={pendingFeature}
        nextEnabled={pendingNextEnabled}
        open={pendingFeature !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPendingFeature(null);
          }
        }}
        onConfirm={handleConfirmToggle}
      />
    </CardGradient>
  );
}

import { useMemo, useRef } from 'react';
import { CardGradient } from '@/components/ui/card-gradient';
import { DataTable, type DataTableColumn, type DataTableSortState } from '@/components/ui/data-table';
import { cn } from '@/lib/utils';
import type { TabularExportData } from '@/lib/export-element';
import type { AdminConsumptionAuditRow } from '@/data/admin-consumption-audit';
import { AdminKebabExportMenu } from './admin-kebab-export-menu';
import { AdminConsumptionAuditBreakdownPopover } from './admin-consumption-audit-breakdown-popover';

type AdminConsumptionAuditTableCardProps = {
  title: string;
  rows: AdminConsumptionAuditRow[];
  sort: DataTableSortState;
  onSortChange: (next: DataTableSortState) => void;
  className?: string;
};

export function AdminConsumptionAuditTableCard({
  title,
  rows,
  sort,
  onSortChange,
  className,
}: AdminConsumptionAuditTableCardProps) {
  const exportRef = useRef<HTMLDivElement>(null);

  const columns = useMemo<Array<DataTableColumn<AdminConsumptionAuditRow>>>(
    () => [
      {
        id: 'dateTime',
        header: 'Data / Hora',
        sortKey: 'dateTime',
        defaultSortOrder: 'desc',
        sortValue: (row) => row.dateTime,
        cell: (row) => row.dateTime,
      },
      {
        id: 'type',
        header: 'Tipo',
        sortKey: 'type',
        defaultSortOrder: 'asc',
        sortValue: (row) => row.type,
        cell: (row) => row.type,
      },
      {
        id: 'model',
        header: 'Modelo',
        sortKey: 'model',
        defaultSortOrder: 'asc',
        sortValue: (row) => row.model,
        cell: (row) => (
          <span className="break-words text-left leading-relaxed text-white/58">
            {row.model}
          </span>
        ),
      },
      {
        id: 'availableTokens',
        header: 'Quantidade de\nTokens Disponíveis',
        align: 'right',
        sortKey: 'availableTokens',
        defaultSortOrder: 'desc',
        sortValue: (row) => row.availableTokens,
        cell: (row) => (
          <AdminConsumptionAuditBreakdownPopover
            label={row.availableTokensLabel}
            breakdown={row.availableTokensBreakdown}
          />
        ),
      },
      {
        id: 'usedTokens',
        header: 'Quantidade de\nTokens Usada',
        align: 'right',
        sortKey: 'usedTokens',
        defaultSortOrder: 'desc',
        sortValue: (row) => row.usedTokens,
        cell: (row) => row.usedTokensLabel,
      },
      {
        id: 'cost',
        header: 'Custo',
        align: 'right',
        sortKey: 'cost',
        defaultSortOrder: 'desc',
        sortValue: (row) => row.cost,
        cell: (row) => row.costLabel,
      },
    ],
    [],
  );

  const exportData = useMemo<TabularExportData>(
    () => ({
      sheetName: title,
      headers: columns.map((column) => column.header.replace('\n', ' ')),
      rows: rows.map((row) => [
        row.dateTime,
        row.type,
        row.model,
        row.availableTokensLabel,
        row.usedTokensLabel,
        row.costLabel,
      ]),
    }),
    [columns, rows, title],
  );

  return (
    <CardGradient className={cn('rounded-[22px] p-6 sm:p-7', className)}>
      <div ref={exportRef}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-[20px] font-semibold leading-tight text-foreground dark:text-white">
              {title}
            </h3>
          </div>

          <AdminKebabExportMenu
            kind="table"
            baseFileName={`tabela-${title}`}
            targetRef={exportRef}
            tableData={exportData}
          />
        </div>

        <div className="mt-6">
          <DataTable
            columns={columns}
            rows={rows}
            getRowKey={(row) => row.id}
            minWidthPx={980}
            variant="dark"
            sort={sort}
            onSortChange={onSortChange}
            tableClassName="table-fixed"
            className="md:overflow-x-hidden"
          />
        </div>
      </div>
    </CardGradient>
  );
}

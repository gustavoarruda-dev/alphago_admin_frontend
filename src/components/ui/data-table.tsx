import { useMemo, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { dataTableAlignClass, nodeToText, type DataTableAlign } from './data-table-utils';

export type DataTableSortOrder = 'asc' | 'desc';
export type DataTableSortState = { sortBy: string; sortOrder: DataTableSortOrder } | null;

export type DataTableColumn<Row> = {
  id: string;
  header: string;
  align?: DataTableAlign;
  cell: (row: Row) => ReactNode;
  sortKey?: string;
  defaultSortOrder?: DataTableSortOrder;
  sortable?: boolean;
  sortValue?: (row: Row) => string | number | Date | null | undefined;
};

type DataTableProps<Row> = {
  columns: Array<DataTableColumn<Row>>;
  rows: Row[];
  getRowKey?: (row: Row, idx: number) => string;
  minWidthPx?: number;
  variant?: 'default' | 'dark';
  onRowClick?: (row: Row) => void;
  sort?: DataTableSortState;
  onSortChange?: (next: DataTableSortState) => void;
  defaultSort?: DataTableSortState;
  clientSortEnabled?: boolean;
  isLoading?: boolean;
  emptyState?: ReactNode;
  className?: string;
  tableClassName?: string;
};

function resolveSortBy<Row>(column: DataTableColumn<Row>): string {
  return column.sortKey ?? column.id;
}

function defaultOrderFor<Row>(column: DataTableColumn<Row>): DataTableSortOrder {
  return column.defaultSortOrder ?? 'desc';
}

function isSortable<Row>(
  column: DataTableColumn<Row>,
  hasServerSort: boolean,
  allowClientSort: boolean,
): boolean {
  const enabled = column.sortable ?? true;
  if (!enabled) return false;
  if (hasServerSort) return !!column.sortKey;
  return allowClientSort;
}

function compareMaybe(
  left: string | number | Date | null | undefined,
  right: string | number | Date | null | undefined,
): number {
  const leftNull = left === null || typeof left === 'undefined';
  const rightNull = right === null || typeof right === 'undefined';
  if (leftNull && rightNull) return 0;
  if (leftNull) return 1;
  if (rightNull) return -1;

  if (typeof left === 'number' && typeof right === 'number') return left - right;

  const leftDate = left instanceof Date ? left.getTime() : null;
  const rightDate = right instanceof Date ? right.getTime() : null;
  if (typeof leftDate === 'number' && typeof rightDate === 'number') return leftDate - rightDate;

  return String(left).localeCompare(String(right), 'pt-BR', {
    numeric: true,
    sensitivity: 'base',
  });
}

function SortIcon({ state }: { state: 'asc' | 'desc' | 'none' }) {
  if (state === 'asc') return <ArrowUp className="size-4 opacity-90" aria-hidden="true" />;
  if (state === 'desc') return <ArrowDown className="size-4 opacity-90" aria-hidden="true" />;
  return <ArrowUpDown className="size-4 opacity-60" aria-hidden="true" />;
}

function splitHeaderLines(label: string): string[] {
  return label.split('\n').map((line) => line.trim()).filter(Boolean);
}

function headerLabelAlignClass(align: DataTableAlign): string {
  if (align === 'right') return 'items-end text-right';
  if (align === 'center') return 'items-center text-center';
  return 'items-start text-left';
}

function renderHeaderLabel(label: string, align: DataTableAlign): ReactNode {
  const lines = splitHeaderLines(label);
  if (lines.length <= 1) return <span>{label}</span>;

  return (
    <span className={cn('inline-flex flex-col leading-tight', headerLabelAlignClass(align))}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>{line}</span>
      ))}
    </span>
  );
}

function isNumericLike(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;

  const normalized = trimmed
    .replace(/[%\sR$()]/g, '')
    .replace(/[.,]/g, '')
    .replace(/[–—-]/g, '');

  return normalized.length > 0 && /^\d+$/.test(normalized);
}

function resolveColumnAlign<Row>(column: DataTableColumn<Row>, rows: Row[]): DataTableAlign {
  if (column.align === 'center') return 'center';

  for (const row of rows) {
    if (column.sortValue) {
      const value = column.sortValue(row);
      if (typeof value === 'number') return 'right';
      if (value instanceof Date) return 'left';
      if (typeof value === 'string' && isNumericLike(value)) return 'right';
    }

    const text = nodeToText(column.cell(row)).trim();
    if (!text) continue;
    return isNumericLike(text) ? 'right' : 'left';
  }

  return 'left';
}

export function DataTable<Row>({
  columns,
  rows,
  getRowKey,
  minWidthPx,
  variant = 'default',
  onRowClick,
  sort,
  onSortChange,
  defaultSort = null,
  clientSortEnabled = true,
  isLoading = false,
  emptyState,
  className,
  tableClassName,
}: DataTableProps<Row>) {
  const [internalSort, setInternalSort] = useState<DataTableSortState>(defaultSort);
  const effectiveSort = onSortChange ? sort ?? null : internalSort;
  const hasServerSort = typeof onSortChange === 'function';

  const alignById = useMemo(() => {
    const map = new Map<string, DataTableAlign>();
    for (const column of columns) {
      map.set(column.id, resolveColumnAlign(column, rows));
    }
    return map;
  }, [columns, rows]);

  const sortedRows = useMemo(() => {
    if (!clientSortEnabled) return rows;
    if (!effectiveSort) return rows;

    const activeColumn =
      columns.find((column) => resolveSortBy(column) === effectiveSort.sortBy) ?? null;
    if (!activeColumn) return rows;

    const getValue = (row: Row): string | number | Date | null | undefined => {
      if (activeColumn.sortValue) return activeColumn.sortValue(row);
      return nodeToText(activeColumn.cell(row));
    };

    const copy = [...rows];
    copy.sort((left, right) => {
      const comparison = compareMaybe(getValue(left), getValue(right));
      return effectiveSort.sortOrder === 'asc' ? comparison : -comparison;
    });
    return copy;
  }, [clientSortEnabled, columns, effectiveSort, rows]);

  const requestSort = (column: DataTableColumn<Row>) => {
    if (!isSortable(column, hasServerSort, clientSortEnabled)) return;

    const sortBy = resolveSortBy(column);
    const current = effectiveSort;
    const next: DataTableSortState =
      current && current.sortBy === sortBy
        ? { sortBy, sortOrder: current.sortOrder === 'asc' ? 'desc' : 'asc' }
        : { sortBy, sortOrder: defaultOrderFor(column) };

    if (onSortChange) onSortChange(next);
    else setInternalSort(next);
  };

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table
        className={cn('w-full text-left', tableClassName)}
        style={minWidthPx ? { minWidth: `${minWidthPx}px` } : undefined}
      >
        <thead>
          <tr className="border-b border-border dark:border-white/15">
            {columns.map((column) => {
              const sortBy = resolveSortBy(column);
              const isActive = !!effectiveSort && effectiveSort.sortBy === sortBy;
              const ariaSort: 'none' | 'ascending' | 'descending' =
                !isActive
                  ? 'none'
                  : effectiveSort!.sortOrder === 'asc'
                    ? 'ascending'
                    : 'descending';
              const iconState: 'asc' | 'desc' | 'none' =
                !isActive
                  ? 'none'
                  : effectiveSort!.sortOrder === 'asc'
                    ? 'asc'
                    : 'desc';
              const align = alignById.get(column.id) ?? 'left';
              const alignClass = dataTableAlignClass(align);
              const justify =
                align === 'right'
                  ? 'justify-end'
                  : align === 'center'
                    ? 'justify-center'
                    : 'justify-start';
              const headerContent = renderHeaderLabel(column.header, align);
              const sortable = isSortable(column, hasServerSort, clientSortEnabled);
              const headerTextClass =
                variant === 'dark' ? 'text-white' : 'text-foreground dark:text-white';

              return (
                <th
                  key={column.id}
                  scope="col"
                  className={cn(
                    'px-4 py-4 text-[12px] font-normal leading-tight',
                    headerTextClass,
                    alignClass,
                  )}
                  aria-sort={ariaSort}
                >
                  {sortable ? (
                    <button
                      type="button"
                      className={cn(
                        'inline-flex w-full select-none items-center gap-2',
                        justify,
                        variant === 'dark'
                          ? 'cursor-pointer hover:text-white'
                          : 'cursor-pointer hover:text-foreground dark:hover:text-white',
                      )}
                      onClick={() => requestSort(column)}
                    >
                      {headerContent}
                      <SortIcon state={iconState} />
                    </button>
                  ) : (
                    <div className={cn('inline-flex w-full items-center gap-2 opacity-80', justify)}>
                      {headerContent}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className="border-b border-border/60 dark:border-white/10">
              <td colSpan={columns.length} className="px-4 py-6 text-sm text-gray-400">
                Carregando dados...
              </td>
            </tr>
          ) : sortedRows.length === 0 ? (
            <tr className="border-b border-border/60 dark:border-white/10">
              <td colSpan={columns.length} className="px-4 py-6">
                {emptyState ?? <p className="text-sm text-gray-400">Sem dados.</p>}
              </td>
            </tr>
          ) : (
            sortedRows.map((row, index) => {
              const key = getRowKey ? getRowKey(row, index) : String(index);
              const cellTextClass =
                variant === 'dark'
                  ? 'text-white/50'
                  : 'text-foreground/80 dark:text-white/80';
              const rowClickable = typeof onRowClick === 'function';
              const rowHoverClass = rowClickable
                ? variant === 'dark'
                  ? 'cursor-pointer transition-colors hover:bg-white/5'
                  : 'cursor-pointer transition-colors hover:bg-black/5 dark:hover:bg-white/5'
                : '';

              return (
                <tr
                  key={key}
                  className={cn(
                    'last:border-b-0 border-b border-border/60 dark:border-white/10',
                    rowHoverClass,
                  )}
                  tabIndex={rowClickable ? 0 : undefined}
                  role={rowClickable ? 'button' : undefined}
                  onClick={rowClickable ? () => onRowClick(row) : undefined}
                  onKeyDown={
                    rowClickable
                      ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            onRowClick(row);
                          }
                        }
                      : undefined
                  }
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        'min-w-0 px-4 py-4 text-[12px]',
                        cellTextClass,
                        dataTableAlignClass(alignById.get(column.id)),
                      )}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

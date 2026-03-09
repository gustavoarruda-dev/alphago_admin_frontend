import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Eye, Search } from 'lucide-react';
import { CardGradient } from '@/components/ui/card-gradient';
import { DataTable, type DataTableColumn, type DataTableSortState } from '@/components/ui/data-table';
import { ButtonBorder } from '@/components/ui/button-border';
import { useToast } from '@/hooks';
import { cn } from '@/lib/utils';
import type { TabularExportData } from '@/lib/export-element';
import {
  ADMIN_BILLING_DEFAULT_INVOICE_FILTERS,
  getAdminBillingInvoiceDetails,
  type AdminBillingInvoiceRow,
  type AdminBillingInvoicesFilterValue,
} from '@/data/admin-billing';
import { AdminKebabExportMenu } from '@/components/admin/dashboard/admin-kebab-export-menu';
import { AdminBillingInvoicesFilterPopover } from './admin-billing-invoices-filter-popover';
import { AdminBillingInvoiceDetailsDialog } from './admin-billing-invoice-details-dialog';
import { AdminBillingStatusPill } from './admin-billing-status-pill';

const PAGE_SIZE = 8;

export function AdminBillingInvoicesTableCard({
  title,
  rows,
  sort,
  onSortChange,
  className,
}: {
  title: string;
  rows: AdminBillingInvoiceRow[];
  sort: DataTableSortState;
  onSortChange: (next: DataTableSortState) => void;
  className?: string;
}) {
  const exportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<AdminBillingInvoiceRow | null>(null);
  const [filters, setFilters] = useState<AdminBillingInvoicesFilterValue>(
    ADMIN_BILLING_DEFAULT_INVOICE_FILTERS,
  );

  const filteredRows = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return rows.filter((row) => {
      const issuedAtDate = row.issuedAt.slice(0, 10);
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          row.invoiceNumber,
          row.referenceCode,
          row.statusLabel,
          row.paymentMethod,
          row.amountLabel,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesPeriod =
        issuedAtDate >= filters.period.startDate && issuedAtDate <= filters.period.endDate;
      const matchesStatus = !filters.status || row.status === filters.status;
      const matchesPaymentMethod =
        !filters.paymentMethod || row.paymentMethod === filters.paymentMethod;

      return matchesSearch && matchesPeriod && matchesStatus && matchesPaymentMethod;
    });
  }, [filters.paymentMethod, filters.period.endDate, filters.period.startDate, filters.status, rows, searchTerm]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchTerm, filters]);

  const visibleRows = filteredRows.slice(0, visibleCount);
  const hasMoreRows = visibleCount < filteredRows.length;

  const handlePayInvoice = useCallback((row: AdminBillingInvoiceRow) => {
    toast({
      title: 'Fluxo de cobrança',
      description: `A ação de pagamento da fatura ${row.invoiceNumber} entra na próxima etapa.`,
    });
  }, [toast]);

  const selectedInvoiceDetails = selectedInvoice
    ? getAdminBillingInvoiceDetails(selectedInvoice)
    : null;

  const columns = useMemo<Array<DataTableColumn<AdminBillingInvoiceRow>>>(
    () => [
      {
        id: 'invoice',
        header: 'Fatura',
        sortKey: 'invoiceNumber',
        defaultSortOrder: 'desc',
        sortValue: (row) => row.invoiceNumber,
        cell: (row) => (
          <div className="space-y-0.5 text-left leading-tight">
            <div className="text-white/65">{row.invoiceNumber}</div>
            <div className="text-white/35">{row.referenceCode}</div>
          </div>
        ),
      },
      {
        id: 'amount',
        header: 'Valor',
        align: 'right',
        sortKey: 'amount',
        defaultSortOrder: 'desc',
        sortValue: (row) => row.amount,
        cell: (row) => row.amountLabel,
      },
      {
        id: 'status',
        header: 'Status',
        sortKey: 'status',
        defaultSortOrder: 'asc',
        sortValue: (row) => row.statusLabel,
        cell: (row) => (
          <AdminBillingStatusPill status={row.status} label={row.statusLabel} />
        ),
      },
      {
        id: 'paymentMethod',
        header: 'Meio de Pagamento',
        sortKey: 'paymentMethod',
        defaultSortOrder: 'asc',
        sortValue: (row) => row.paymentMethod,
        cell: (row) => row.paymentMethod,
      },
      {
        id: 'issuedAt',
        header: 'Data e Hora',
        sortKey: 'issuedAt',
        defaultSortOrder: 'desc',
        sortValue: (row) => row.issuedAt,
        cell: (row) => row.issuedAtLabel,
      },
      {
        id: 'pay',
        header: '',
        align: 'center',
        sortable: false,
        cell: (row) => (
          <ButtonBorder
            type="button"
            className="h-8 min-w-[82px] px-3 text-[11px]"
            disabled={row.status === 'paid'}
            onClick={() => handlePayInvoice(row)}
          >
            Pagar
          </ButtonBorder>
        ),
      },
      {
        id: 'view',
        header: '',
        align: 'center',
        sortable: false,
        cell: (row) => (
          <button
            type="button"
            aria-label={`Visualizar fatura ${row.invoiceNumber}`}
            onClick={() => {
              setSelectedInvoice(row);
              setDetailsOpen(true);
            }}
            className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Eye className="size-4" />
          </button>
        ),
      },
    ],
    [handlePayInvoice],
  );

  const exportData = useMemo<TabularExportData>(
    () => ({
      sheetName: title,
      headers: [
        'Fatura',
        'Referência',
        'Valor',
        'Status',
        'Meio de Pagamento',
        'Data e Hora',
      ],
      rows: filteredRows.map((row) => [
        row.invoiceNumber,
        row.referenceCode,
        row.amountLabel,
        row.statusLabel,
        row.paymentMethod,
        row.issuedAtLabel,
      ]),
    }),
    [filteredRows, title],
  );

  return (
    <CardGradient className={cn('rounded-[22px] p-6 sm:p-7', className)}>
      <div ref={exportRef}>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0">
            <h3 className="text-[20px] font-semibold leading-tight text-foreground dark:text-white">
              {title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 xl:justify-end">
            <label
              className={cn(
                'relative inline-flex h-12 w-full min-w-[210px] items-center overflow-hidden rounded-full border-2 bg-gradient-to-br px-5 text-foreground transition-all shadow-[0px_1.197px_29.915px_0px_rgba(69,42,124,0.10)] backdrop-blur-[35px] xl:w-[220px]',
                'h-9',
                'border-border/40 from-background/40 to-background/10 hover:from-background/55 hover:to-background/20',
                'dark:border-b-white/20 dark:border-t-white/20 dark:border-r-white/10 dark:border-l-white/10 dark:from-white/10 dark:to-purple-950/15 dark:hover:from-white/20 dark:hover:to-white/4 dark:text-white',
              )}
            >
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Busca rápida"
                className="h-full w-full bg-transparent pr-8 text-[12px] text-inherit placeholder:text-foreground/60 focus:outline-none dark:placeholder:text-white/55"
              />
              <Search className="pointer-events-none absolute right-4 size-4 text-foreground/60 dark:text-white/55" />
            </label>

            <AdminBillingInvoicesFilterPopover
              value={filters}
              onApply={setFilters}
              onClear={() => setFilters(ADMIN_BILLING_DEFAULT_INVOICE_FILTERS)}
            />

            <AdminKebabExportMenu
              kind="table"
              baseFileName={`tabela-${title}`}
              targetRef={exportRef}
              tableData={exportData}
            />
          </div>
        </div>

        <div className="mt-6">
          <DataTable
            columns={columns}
            rows={visibleRows}
            getRowKey={(row) => row.id}
            minWidthPx={1160}
            variant="dark"
            sort={sort}
            onSortChange={onSortChange}
            tableClassName="table-fixed"
            emptyState={
              <p className="text-sm text-white/55">
                Nenhuma fatura encontrada com os filtros atuais.
              </p>
            }
          />
        </div>

        {hasMoreRows ? (
          <div className="mt-6 flex justify-center">
            <ButtonBorder
              type="button"
              className="h-10 min-w-[160px] px-6 text-[12px]"
              onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
            >
              Ver mais
            </ButtonBorder>
          </div>
        ) : null}
      </div>

      <AdminBillingInvoiceDetailsDialog
        row={selectedInvoice}
        details={selectedInvoiceDetails}
        open={detailsOpen}
        onOpenChange={(open) => {
          setDetailsOpen(open);
          if (!open) setSelectedInvoice(null);
        }}
        onPay={handlePayInvoice}
      />
    </CardGradient>
  );
}

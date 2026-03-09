import * as Popover from '@radix-ui/react-popover';
import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { AdminOverlaySkeleton } from '@/components/admin/admin-overlay-skeleton';
import { ButtonBorder } from '@/components/ui/button-border';
import { useToast, useTransientLoading } from '@/hooks';
import { fromIsoDate, toIsoDate } from '@/lib/iso-date';
import { cn } from '@/lib/utils';
import { AdminCalendarRange, type DateRangeValue } from '@/components/admin/dashboard/admin-calendar-range';
import { AdminFilterPopoverSurface } from '@/components/admin/dashboard/admin-filter-popover-surface';
import { AdminSelectableOptionRow } from '@/components/admin/dashboard/admin-selectable-option-row';
import { AdminUsersSelectPopoverSurface } from '@/components/admin/users/admin-users-form-field';
import {
  ADMIN_BILLING_DEFAULT_INVOICE_FILTERS,
  ADMIN_BILLING_PAYMENT_METHODS,
  ADMIN_BILLING_STATUSES,
  type AdminBillingInvoiceStatus,
  type AdminBillingInvoicesFilterValue,
} from '@/data/admin-billing';

type FilterSelectOption<T extends string | null> = {
  value: T;
  label: string;
};

function BillingFilterSelect<T extends string | null>({
  placeholder,
  value,
  options,
  onChange,
}: {
  placeholder: string;
  value: T;
  options: Array<FilterSelectOption<T>>;
  onChange: (value: T) => void;
}) {
  const selectedLabel =
    value === null
      ? placeholder
      : options.find((option) => option.value === value)?.label ?? placeholder;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            'relative inline-flex h-12 w-full items-center justify-between overflow-hidden rounded-full border-2 bg-gradient-to-br px-5 text-left transition-all shadow-[0px_1.197px_29.915px_0px_rgba(69,42,124,0.10)] backdrop-blur-[35px]',
            'border-border/40 from-background/40 to-background/10 hover:from-background/55 hover:to-background/20',
            'dark:border-b-white/20 dark:border-t-white/20 dark:border-r-white/10 dark:border-l-white/10 dark:from-white/10 dark:to-purple-950/15 dark:hover:from-white/20 dark:hover:to-white/4',
          )}
        >
          <span
            className={cn(
              'text-[14px]',
              value ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/55',
            )}
          >
            {selectedLabel}
          </span>
          <ChevronDown className="size-4 text-foreground/60 dark:text-white/55" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={8}
          avoidCollisions={false}
          className="z-[85] w-[var(--radix-popover-trigger-width)] min-w-[220px] outline-none"
        >
          <AdminUsersSelectPopoverSurface>
            <div className="max-h-[240px] overflow-y-auto p-2">
              {options.map((option) => {
                const checked = option.value === value;

                return (
                  <Popover.Close asChild key={option.label}>
                    <div>
                      <AdminSelectableOptionRow
                        ariaLabel={option.label}
                        checked={checked}
                        label={option.label}
                        onClick={() => onChange(option.value)}
                        className="dark:text-white"
                      />
                    </div>
                  </Popover.Close>
                );
              })}
            </div>
          </AdminUsersSelectPopoverSurface>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function AdminBillingInvoicesFilterPopover({
  value,
  onApply,
  onClear,
}: {
  value: AdminBillingInvoicesFilterValue;
  onApply: (value: AdminBillingInvoicesFilterValue) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [period, setPeriod] = useState<DateRangeValue>(() => ({
    from: fromIsoDate(value.period.startDate),
    to: fromIsoDate(value.period.endDate),
  }));
  const [status, setStatus] = useState<AdminBillingInvoiceStatus | null>(value.status);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(value.paymentMethod);
  const isLoading = useTransientLoading(open);
  const { toast } = useToast();

  useEffect(() => {
    setPeriod({
      from: fromIsoDate(value.period.startDate),
      to: fromIsoDate(value.period.endDate),
    });
    setStatus(value.status);
    setPaymentMethod(value.paymentMethod);
  }, [value]);

  const initialMonth = useMemo(() => {
    const base = period.from ?? period.to ?? fromIsoDate(value.period.startDate);
    return new Date(base.getFullYear(), base.getMonth(), 1);
  }, [period.from, period.to, value.period.startDate]);

  const statusOptions = useMemo<Array<FilterSelectOption<AdminBillingInvoiceStatus | null>>>(
    () => [
      { value: null, label: 'Todos os status' },
      ...ADMIN_BILLING_STATUSES.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    ],
    [],
  );

  const paymentOptions = useMemo<Array<FilterSelectOption<string | null>>>(
    () => [
      { value: null, label: 'Todos os pagamentos' },
      ...ADMIN_BILLING_PAYMENT_METHODS.map((method) => ({
        value: method,
        label: method,
      })),
    ],
    [],
  );

  const handleApply = () => {
    if (!period.from || !period.to) {
      toast({
        title: 'Filtros inválidos',
        description: 'Selecione um período inicial e final antes de aplicar.',
        variant: 'destructive',
      });
      return;
    }

    onApply({
      period: {
        startDate: toIsoDate(period.from),
        endDate: toIsoDate(period.to),
      },
      status,
      paymentMethod,
    });
    setOpen(false);
  };

  const handleClear = () => {
    setPeriod({
      from: fromIsoDate(ADMIN_BILLING_DEFAULT_INVOICE_FILTERS.period.startDate),
      to: fromIsoDate(ADMIN_BILLING_DEFAULT_INVOICE_FILTERS.period.endDate),
    });
    setStatus(null);
    setPaymentMethod(null);
    onClear();
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <ButtonBorder
          type="button"
          className="h-9 px-5 text-[12px]"
          data-testid="billing-invoices-filters-open"
        >
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal className="size-3.5" aria-hidden />
            Filtrar
          </span>
        </ButtonBorder>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={10}
          avoidCollisions={false}
          className="z-[70] w-[calc(100vw-2rem)] max-w-[760px] outline-none"
          role="dialog"
          aria-label="Selecionar Período"
        >
          <AdminFilterPopoverSurface>
            {isLoading ? (
              <AdminOverlaySkeleton showCalendar showDualSelects />
            ) : (
            <div className="px-6 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[18px] font-medium text-foreground dark:text-white">
                    Selecionar Período
                  </h3>
                </div>
                <Popover.Close
                  aria-label="Fechar filtro de faturas"
                  className={cn(
                    'flex size-8 items-center justify-center rounded-full',
                    'border border-white/15 bg-white/5 text-white/75 transition-colors',
                    'hover:bg-white/10 hover:text-white',
                  )}
                >
                  <X className="size-4" />
                </Popover.Close>
              </div>

              <div className="mt-8">
                <AdminCalendarRange
                  value={period}
                  onChange={setPeriod}
                  initialMonth={initialMonth}
                />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <BillingFilterSelect
                  placeholder="Tipo de status"
                  value={status}
                  options={statusOptions}
                  onChange={setStatus}
                />
                <BillingFilterSelect
                  placeholder="Tipo de pagamento"
                  value={paymentMethod}
                  options={paymentOptions}
                  onChange={setPaymentMethod}
                />
              </div>

              <div className="mt-9 flex items-center justify-center">
                <ButtonBorder
                  type="button"
                  className="h-10 min-w-[190px] px-6"
                  onClick={handleApply}
                >
                  Aplicar filtros
                </ButtonBorder>
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-[13px] font-medium underline text-foreground/80 transition-colors hover:text-foreground dark:text-white/72 dark:hover:text-white"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
            )}
          </AdminFilterPopoverSurface>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

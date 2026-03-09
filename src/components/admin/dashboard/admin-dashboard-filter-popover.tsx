import * as Popover from '@radix-ui/react-popover';
import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';
import { ButtonBorder } from '@/components/ui/button-border';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks';
import { fromIsoDate, toIsoDate } from '@/lib/iso-date';
import { AdminCalendarRange, type DateRangeValue } from './admin-calendar-range';
import { AdminFilterPopoverSurface } from './admin-filter-popover-surface';
import { AdminSelectableOptionRow } from './admin-selectable-option-row';

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid date format.' });

const dateRangeSchema = z
  .object({
    startDate: isoDateSchema,
    endDate: isoDateSchema,
  })
  .strict()
  .refine((range) => range.startDate <= range.endDate, {
    message: 'Start date must be before or equal to end date.',
  });

export const adminDashboardFiltersSchema = z
  .object({
    period: dateRangeSchema,
    models: z.array(z.string()).optional(),
    comparison: z
      .object({
        mode: z.enum(['none', 'previous_period', 'custom']),
        period: dateRangeSchema.optional(),
      })
      .strict()
      .superRefine((value, ctx) => {
        if (value.mode === 'custom' && !value.period) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Selecione um período de comparação (data inicial e final).',
            path: ['period'],
          });
        }
        if (value.mode !== 'custom' && value.period) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Período de comparação só é permitido no modo personalizado.',
            path: ['period'],
          });
        }
      }),
  })
  .strict();

export type AdminDashboardFilterValue = z.infer<typeof adminDashboardFiltersSchema>;

type AdminDashboardFilterPopoverContentProps = {
  value: AdminDashboardFilterValue;
  onApply: (value: AdminDashboardFilterValue) => void;
  onClear: () => void;
  leftPx?: number;
  dialogTitle?: string;
  dialogLabel?: string;
  comparisonTitle?: string;
  comparisonPeriodTitle?: string;
  showModels?: boolean;
  modelOptions?: readonly string[];
  comparisonOptions?: Array<{
    mode: AdminDashboardFilterValue['comparison']['mode'];
    label: string;
  }>;
};

export function AdminDashboardFilterPopoverContent({
  value,
  onApply,
  onClear,
  leftPx = -222,
  dialogTitle = 'Filtros',
  dialogLabel = 'Filtros',
  comparisonTitle = 'Comparação',
  comparisonPeriodTitle = 'Período de comparação',
  showModels = false,
  modelOptions = [],
  comparisonOptions = [
    { mode: 'none', label: 'Não comparar' },
    { mode: 'previous_period', label: 'Período anterior' },
    { mode: 'custom', label: 'Personalizado' },
  ],
}: AdminDashboardFilterPopoverContentProps) {
  const [period, setPeriod] = useState<DateRangeValue>(() => ({
    from: fromIsoDate(value.period.startDate),
    to: fromIsoDate(value.period.endDate),
  }));
  const [comparisonMode, setComparisonMode] = useState<AdminDashboardFilterValue['comparison']['mode']>(
    () => value.comparison.mode,
  );
  const [comparisonPeriod, setComparisonPeriod] = useState<DateRangeValue>(() => ({
    from:
      value.comparison.mode === 'custom' && value.comparison.period
        ? fromIsoDate(value.comparison.period.startDate)
        : null,
    to:
      value.comparison.mode === 'custom' && value.comparison.period
        ? fromIsoDate(value.comparison.period.endDate)
        : null,
  }));
  const [selectedModels, setSelectedModels] = useState<string[]>(() => value.models ?? [...modelOptions]);
  const { toast } = useToast();

  useEffect(() => {
    setPeriod({
      from: fromIsoDate(value.period.startDate),
      to: fromIsoDate(value.period.endDate),
    });
    setComparisonMode(value.comparison.mode);
    setComparisonPeriod({
      from:
        value.comparison.mode === 'custom' && value.comparison.period
          ? fromIsoDate(value.comparison.period.startDate)
          : null,
      to:
        value.comparison.mode === 'custom' && value.comparison.period
          ? fromIsoDate(value.comparison.period.endDate)
          : null,
    });
    setSelectedModels(value.models ?? [...modelOptions]);
  }, [modelOptions, value]);

  const initialMonth = useMemo(() => {
    const base = period.from ?? period.to ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  }, [period.from, period.to]);

  const comparisonInitialMonth = useMemo(() => {
    const base = comparisonPeriod.from ?? comparisonPeriod.to ?? period.from ?? period.to ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  }, [comparisonPeriod.from, comparisonPeriod.to, period.from, period.to]);

  const handleApply = () => {
    if (!period.from || !period.to) {
      toast({
        title: 'Filtros inválidos',
        description: 'Selecione um período (data inicial e final) e tente novamente.',
        variant: 'destructive',
      });
      return;
    }

    if (comparisonMode === 'custom' && (!comparisonPeriod.from || !comparisonPeriod.to)) {
      toast({
        title: 'Filtros inválidos',
        description: 'Selecione um período de comparação (data inicial e final) e tente novamente.',
        variant: 'destructive',
      });
      return;
    }

    const parsed = adminDashboardFiltersSchema.safeParse({
      period: {
        startDate: toIsoDate(period.from),
        endDate: toIsoDate(period.to),
      },
      models: showModels ? selectedModels : undefined,
      comparison:
        comparisonMode === 'custom'
          ? {
              mode: comparisonMode,
              period: {
                startDate: toIsoDate(comparisonPeriod.from!),
                endDate: toIsoDate(comparisonPeriod.to!),
              },
            }
          : { mode: comparisonMode },
    });

    if (!parsed.success) {
      toast({
        title: 'Filtros inválidos',
        description:
          parsed.error.issues[0]?.message ?? 'Revise o período e tente novamente.',
        variant: 'destructive',
      });
      return;
    }

    onApply(parsed.data);
  };

  const toggleModel = (model: string) => {
    setSelectedModels((current) =>
      current.includes(model)
        ? current.filter((item) => item !== model)
        : [...current, model],
    );
  };

  return (
    <Popover.Portal>
      <Popover.Content
        side="bottom"
        align="end"
        sideOffset={10}
        style={{ left: leftPx }}
        className="z-[60] w-[calc(100vw-2rem)] max-w-[760px] outline-none"
        role="dialog"
        aria-label={dialogLabel}
      >
        <AdminFilterPopoverSurface>
          <div className="px-6 py-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[18px] font-medium text-foreground dark:text-white">
                  {dialogTitle}
                </h3>
              </div>
              <Popover.Close
                aria-label="Fechar modal"
                className={cn(
                  'flex size-8 items-center justify-center rounded-full',
                  'border border-white/15 bg-white/5 text-white/75 transition-colors',
                  'hover:bg-white/10 hover:text-white',
                )}
              >
                <X className="size-4" />
              </Popover.Close>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-foreground dark:text-white">
                Período analisado
              </h4>
              <div className="mt-4">
                <AdminCalendarRange
                  value={period}
                  onChange={setPeriod}
                  initialMonth={initialMonth}
                />
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-medium text-foreground dark:text-white">{comparisonTitle}</h4>
              <p className="mt-1 text-[13px] text-foreground/70 dark:text-white/50">
                Escolha se deseja comparar com outro período.
              </p>

              <div
                className={cn(
                  'mt-4',
                  showModels ? 'space-y-0' : 'grid grid-cols-1 gap-2 sm:grid-cols-3',
                )}
              >
                {comparisonOptions.map((option) => (
                  <AdminSelectableOptionRow
                    key={option.mode}
                    ariaLabel={option.label}
                    checked={comparisonMode === option.mode}
                    label={option.label}
                    onClick={() => {
                      setComparisonMode(option.mode);
                      if (option.mode !== 'custom') {
                        setComparisonPeriod({ from: null, to: null });
                      }
                    }}
                    className={
                      showModels
                        ? 'rounded-none border-b border-border/60 bg-transparent px-0 py-3 dark:border-white/10'
                        : undefined
                    }
                  />
                ))}
              </div>

              {comparisonMode === 'custom' ? (
                <div className="mt-6">
                  <h5 className="text-[13px] font-medium text-foreground dark:text-white">
                    {comparisonPeriodTitle}
                  </h5>
                  <div className="mt-4">
                    <AdminCalendarRange
                      value={comparisonPeriod}
                      onChange={setComparisonPeriod}
                      initialMonth={comparisonInitialMonth}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {showModels ? (
              <div className="mt-8">
                <h4 className="font-medium text-foreground dark:text-white">
                  Selecione os modelos
                </h4>

                <div className="mt-4 space-y-0">
                  {modelOptions.map((model) => (
                    <AdminSelectableOptionRow
                      key={model}
                      ariaLabel={model}
                      checked={selectedModels.includes(model)}
                      label={model}
                      onClick={() => toggleModel(model)}
                      className="rounded-none border-b border-border/60 bg-transparent px-0 py-3 dark:border-white/10"
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-14 flex flex-col items-center gap-6">
              <Popover.Close asChild>
                <ButtonBorder
                  type="button"
                  className="h-12 px-14 text-[16px] font-semibold"
                  onClick={handleApply}
                >
                  Aplicar filtro
                </ButtonBorder>
              </Popover.Close>
              <button
                type="button"
                onClick={onClear}
                className={cn(
                  'text-[15px] text-foreground underline transition-opacity hover:opacity-80',
                  'dark:text-white',
                )}
              >
                Limpar filtro
              </button>
            </div>
          </div>
        </AdminFilterPopoverSurface>
      </Popover.Content>
    </Popover.Portal>
  );
}

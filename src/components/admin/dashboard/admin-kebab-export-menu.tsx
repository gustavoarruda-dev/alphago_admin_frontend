import { useMemo, useRef, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { MoreVertical } from 'lucide-react';
import { AdminMiniPopoverSkeleton } from '@/components/admin/admin-mini-popover-skeleton';
import { useTransientLoading } from '@/hooks';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks';
import {
  exportElementAsPdf,
  exportElementAsPng,
  exportTableAsCsv,
  exportTableAsXls,
  type TabularExportData,
} from '@/lib/export-element';

type AdminKebabExportMenuKind = 'chart' | 'table';
type ExportFormat = 'png' | 'pdf' | 'csv' | 'xls';

type AdminKebabExportMenuProps = {
  kind: AdminKebabExportMenuKind;
  baseFileName: string;
  targetRef: React.RefObject<HTMLElement>;
  tableData?: TabularExportData;
};

export function AdminKebabExportMenu({
  kind,
  baseFileName,
  targetRef,
  tableData,
}: AdminKebabExportMenuProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState<ExportFormat | null>(null);
  const isLoading = useTransientLoading(isOpen);
  const isBusy = isExporting !== null;

  const items = useMemo(() => {
    if (kind === 'chart') return ['png', 'pdf'] as const;
    return ['png', 'pdf', 'csv', 'xls'] as const;
  }, [kind]);

  const targetElementRef = useRef<HTMLElement | null>(null);
  targetElementRef.current = targetRef.current;

  const handleExport = async (format: ExportFormat) => {
    if (isBusy) return;

    const element = targetElementRef.current;
    if (!element) {
      toast({
        title: 'Não foi possível exportar',
        description: 'Elemento do gráfico/tabela não encontrado na página.',
        variant: 'destructive',
      });
      return;
    }

    setIsExporting(format);
    try {
      if (format === 'png') {
        await exportElementAsPng({ element, baseFileName });
      } else if (format === 'pdf') {
        await exportElementAsPdf({ element, baseFileName });
      } else if (format === 'csv') {
        if (!tableData) throw new Error('Tabela sem dados para exportação.');
        exportTableAsCsv({ data: tableData, baseFileName });
      } else if (format === 'xls') {
        if (!tableData) throw new Error('Tabela sem dados para exportação.');
        await exportTableAsXls({ data: tableData, baseFileName });
      }

      toast({ title: 'Exportado com sucesso' });
      setIsOpen(false);
    } catch (error: unknown) {
      toast({
        title: 'Erro ao exportar',
        description: error instanceof Error ? error.message : 'Não foi possível exportar.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label="Abrir menu de exportação"
          data-export-ignore="true"
          className={cn(
            'inline-flex items-center justify-center rounded-md p-2',
            'text-foreground/70 hover:text-foreground hover:bg-foreground/5',
            'focus:outline-none focus:ring-2 focus:ring-ring/40',
            isBusy ? 'cursor-not-allowed opacity-60' : '',
          )}
          disabled={isBusy}
        >
          <MoreVertical className="size-5" />
        </button>
      </Popover.Trigger>
      <Popover.Content
        align="end"
        sideOffset={8}
        className="z-50 outline-none"
      >
        {isLoading ? (
          <AdminMiniPopoverSkeleton rows={kind === 'chart' ? 2 : 4} widthClassName="w-48" />
        ) : (
          <div
            className={cn(
              'w-48 rounded-xl border p-2 shadow-xl backdrop-blur-md',
              'border-border bg-background',
              'dark:border-white/10 dark:bg-[#0B0B12]/95',
            )}
          >
            <div className="flex flex-col">
              {items.map((format) => {
                const label =
                  format === 'png'
                    ? 'Exportar PNG'
                    : format === 'pdf'
                      ? 'Exportar PDF'
                      : format === 'csv'
                        ? 'Exportar CSV'
                        : 'Exportar XLS';
                const disabled =
                  isBusy ||
                  ((format === 'csv' || format === 'xls') &&
                    (!tableData || tableData.rows.length === 0));

                return (
                  <button
                    key={format}
                    type="button"
                    className={cn(
                      'w-full rounded-lg px-3 py-2 text-left text-sm',
                      'text-foreground/90 hover:bg-foreground/5',
                      'dark:text-white/85 dark:hover:bg-white/5',
                      'disabled:cursor-not-allowed disabled:opacity-40',
                    )}
                    disabled={disabled}
                    onClick={() => void handleExport(format)}
                  >
                    {isExporting === format ? 'Exportando…' : label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover.Root>
  );
}

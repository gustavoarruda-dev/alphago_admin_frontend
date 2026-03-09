import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { AdminFilterPopoverSurface } from '@/components/admin/dashboard/admin-filter-popover-surface';
import { ButtonBorder } from '@/components/ui/button-border';
import { CardGradient } from '@/components/ui/card-gradient';
import { cn } from '@/lib/utils';
import type { AdminBillingInvoiceDetails, AdminBillingInvoiceRow } from '@/data/admin-billing';

function DetailsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <CardGradient className="rounded-[22px] px-5 py-4">
      <h3 className="text-[13px] font-semibold text-foreground dark:text-white">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </CardGradient>
  );
}

function Field({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'success';
}) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] text-foreground/55 dark:text-white/45">{label}</div>
      <div
        className={cn(
          'mt-1 break-words text-[12px] text-foreground dark:text-white',
          tone === 'success' &&
            'inline-flex rounded-full bg-[#17352E] px-2 py-0.5 text-[10px] font-medium text-[#52E2A6]',
        )}
      >
        {value}
      </div>
    </div>
  );
}

export function AdminBillingInvoiceDetailsDialog({
  row,
  details,
  open,
  onOpenChange,
  onPay,
}: {
  row: AdminBillingInvoiceRow | null;
  details: AdminBillingInvoiceDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPay: (row: AdminBillingInvoiceRow) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-[2px]" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-[95] w-[calc(100vw-1.5rem)] max-w-[860px] -translate-x-1/2 -translate-y-1/2',
            'outline-none',
          )}
          aria-describedby={undefined}
        >
          <AdminFilterPopoverSurface className="max-h-[92vh] rounded-[28px] shadow-[0px_30px_80px_rgba(0,0,0,0.5)]">
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="text-[20px] font-semibold text-foreground dark:text-white">
                    Detalhes da Transação
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-[12px] text-foreground/60 dark:text-white/50">
                    Informações completas sobre a transação selecionada
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  aria-label="Fechar detalhes da transação"
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="size-4" />
                </Dialog.Close>
              </div>

              {row && details ? (
                <div className="mt-6 space-y-4">
                  <DetailsSection title="Informações da Transação">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      <Field label="ID da Transação:" value={details.transaction.id} />
                      <Field label="Status:" value={details.transaction.statusLabel} />
                      <Field label="Valor:" value={details.transaction.amountLabel} />
                      <Field label="Meio de Pagamento:" value={details.transaction.paymentMethod} />
                      <Field label="Data / Hora:" value={details.transaction.issuedAtLabel} />
                      <Field label="ID do Gateway:" value={details.transaction.gatewayId} />
                    </div>
                  </DetailsSection>

                  <DetailsSection title="Informações do Cliente">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <Field label="Nome Completo:" value={details.customer.name} />
                      <Field label="Empresa:" value={details.customer.company} />
                      <Field label="Website:" value={details.customer.website} />
                      <Field label="Razão Social:" value={details.customer.company} />
                      <Field label="CNPJ da Empresa:" value={details.customer.document} />
                      <Field label="Telefone:" value={details.customer.phone} />
                      <Field label="E-mail Pessoal:" value={details.customer.personalEmail} />
                      <Field label="Localização:" value={details.customer.city} />
                      <Field label="Situação:" value={details.customer.accountStatusLabel} tone="success" />
                      <Field label="E-mail de Faturamento:" value={details.customer.billingEmail} />
                      <Field label="E-mail da Empresa:" value={details.customer.companyEmail} />
                    </div>
                  </DetailsSection>

                  <DetailsSection title="Informações da Fatura">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      <Field label="Número da Fatura:" value={details.invoice.number} />
                      <Field label="Status da Fatura:" value={details.invoice.statusLabel} />
                      <Field label="Valor Previsto:" value={details.invoice.projectedAmountLabel} />
                      <Field label="Data de Vencimento:" value={details.invoice.dueDateLabel} />
                      <Field label="Data / Hora de Pagamento:" value={details.invoice.paidAtLabel} />
                      <Field label="Período de Cobrança:" value={details.invoice.billingPeriodLabel} />
                    </div>
                  </DetailsSection>

                  <DetailsSection title="Informações da Assinatura">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Plano:" value={details.subscription.plan} />
                      <Field label="Ciclo de Cobrança:" value={details.subscription.cycle} />
                    </div>
                  </DetailsSection>
                </div>
              ) : null}

              <div className="mt-6 flex items-center justify-center gap-6">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="text-[12px] font-medium underline text-foreground/80 transition-colors hover:text-foreground dark:text-white/72 dark:hover:text-white"
                  >
                    Cancelar
                  </button>
                </Dialog.Close>
                <ButtonBorder
                  type="button"
                  className="h-10 min-w-[156px] px-6 text-[12px]"
                  disabled={!row || row.status === 'paid'}
                  onClick={() => {
                    if (!row) return;
                    onPay(row);
                  }}
                >
                  Pagar Fatura
                </ButtonBorder>
              </div>
            </div>
          </AdminFilterPopoverSurface>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

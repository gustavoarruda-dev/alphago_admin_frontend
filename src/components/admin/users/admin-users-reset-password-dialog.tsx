import * as Dialog from '@radix-ui/react-dialog';
import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { AdminOverlaySkeleton } from '@/components/admin/admin-overlay-skeleton';
import { AdminFilterPopoverSurface } from '@/components/admin/dashboard/admin-filter-popover-surface';
import { ButtonBorder } from '@/components/ui/button-border';
import { useToast, useTransientLoading } from '@/hooks';
import { cn } from '@/lib/utils';
import type { AdminUserAdminRow } from '@/data/admin-users';
import { AdminUsersFormSection, AdminUsersTextField } from './admin-users-form-field';

export function AdminUsersResetPasswordDialog({
  user,
  open,
  onOpenChange,
}: {
  user: AdminUserAdminRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const isLoading = useTransientLoading(open);
  const { toast } = useToast();

  const canSubmit = useMemo(
    () =>
      password.trim().length > 0 &&
      passwordConfirmation.trim().length > 0 &&
      password === passwordConfirmation,
    [password, passwordConfirmation],
  );

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setPassword('');
      setPasswordConfirmation('');
    }
  };

  const handleSubmit = () => {
    if (!user) return;

    if (!canSubmit) {
      toast({
        title: 'Senha inválida',
        description: 'Preencha os dois campos com a mesma senha antes de continuar.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Senha atualizada',
      description: `A alteração de senha de ${user.name} foi preparada para a próxima etapa.`,
    });
    handleClose(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-[2px]" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-[95] w-[calc(100vw-1.5rem)] max-w-[760px] -translate-x-1/2 -translate-y-1/2 outline-none',
          )}
          aria-describedby={undefined}
        >
          <AdminFilterPopoverSurface className="max-h-[92vh] rounded-[28px] shadow-[0px_30px_80px_rgba(0,0,0,0.5)]">
            {isLoading ? (
              <AdminOverlaySkeleton showSections={1} />
            ) : (
              <div className="px-6 py-6 sm:px-8 sm:py-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Dialog.Title className="text-[20px] font-semibold text-foreground dark:text-white">
                      Alterar Senha
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-[13px] leading-5 text-foreground/60 dark:text-white/50">
                      Altere a senha do usuário admin
                    </Dialog.Description>
                  </div>
                  <Dialog.Close
                    aria-label="Fechar modal de alteração de senha"
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="size-5" />
                  </Dialog.Close>
                </div>

                <div className="mt-8">
                  <AdminUsersFormSection
                    title={user?.name ?? 'Usuário Admin'}
                    description="Altere a senha para este usuário"
                  >
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                      <AdminUsersTextField
                        placeholder="Digite aqui a nova senha"
                        value={password}
                        onChange={setPassword}
                        type="password"
                      />
                      <AdminUsersTextField
                        placeholder="Repita a nova senha"
                        value={passwordConfirmation}
                        onChange={setPasswordConfirmation}
                        type="password"
                      />
                    </div>
                  </AdminUsersFormSection>
                </div>

                <div className="mt-10 flex items-center justify-center gap-6">
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="text-[13px] font-medium underline text-foreground/80 transition-colors hover:text-foreground dark:text-white/72 dark:hover:text-white"
                    >
                      Cancelar
                    </button>
                  </Dialog.Close>
                  <ButtonBorder
                    type="button"
                    className="h-10 min-w-[148px] px-6 text-[13px]"
                    onClick={handleSubmit}
                  >
                    Alterar Senha
                  </ButtonBorder>
                </div>
              </div>
            )}
          </AdminFilterPopoverSurface>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

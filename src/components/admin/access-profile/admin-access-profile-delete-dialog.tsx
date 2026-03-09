import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { AdminOverlaySkeleton } from '@/components/admin/admin-overlay-skeleton';
import { AdminFilterPopoverSurface } from '@/components/admin/dashboard/admin-filter-popover-surface';
import { ButtonBorder } from '@/components/ui/button-border';
import { useTransientLoading } from '@/hooks';
import { cn } from '@/lib/utils';
import type { AdminAccessProfile } from '@/data/admin-access-profiles';

export function AdminAccessProfileDeleteDialog({
  profile,
  open,
  onOpenChange,
  onConfirmDelete,
}: {
  profile: AdminAccessProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}) {
  const isLoading = useTransientLoading(open);
  const hasAssignedUsers = (profile?.assignedUsersCount ?? 0) > 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-[2px]" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-[95] w-[calc(100vw-1.5rem)] max-w-[640px] -translate-x-1/2 -translate-y-1/2 outline-none',
          )}
          aria-describedby={undefined}
        >
          <AdminFilterPopoverSurface className="max-h-[92vh] rounded-[28px] shadow-[0px_30px_80px_rgba(0,0,0,0.5)]">
            {isLoading ? (
              <AdminOverlaySkeleton />
            ) : (
              <div className="px-6 py-6 sm:px-8 sm:py-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Dialog.Title className="text-[20px] font-semibold text-foreground dark:text-white">
                      Excluir Perfil de Acesso
                    </Dialog.Title>
                  </div>
                  <Dialog.Close
                    aria-label="Fechar modal de exclusão do perfil"
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="size-5" />
                  </Dialog.Close>
                </div>

                <Dialog.Description className="mt-5 max-w-[460px] text-[14px] leading-6 text-foreground/72 dark:text-white/70">
                  {hasAssignedUsers ? (
                    <>
                      Este perfil de acesso está atualmente atribuído a{' '}
                      {profile?.assignedUsersCount} usuário(s). Por esse motivo, não é
                      possível excluí-lo no momento. Para prosseguir com a exclusão,
                      migre todos os usuários para outros perfis de acesso.
                    </>
                  ) : (
                    <>
                      Tem certeza que deseja excluir o perfil de acesso{' '}
                      &quot;{profile?.name ?? 'nome do perfil de acesso'}&quot;?
                    </>
                  )}
                </Dialog.Description>

                <div className="mt-10 flex items-center justify-center gap-6">
                  {hasAssignedUsers ? (
                    <ButtonBorder
                      type="button"
                      className="h-10 min-w-[128px] px-6 text-[13px]"
                      onClick={() => onOpenChange(false)}
                    >
                      Fechar
                    </ButtonBorder>
                  ) : (
                    <>
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
                        className="h-10 min-w-[156px] px-6 text-[13px]"
                        onClick={onConfirmDelete}
                      >
                        Excluir Perfil
                      </ButtonBorder>
                    </>
                  )}
                </div>
              </div>
            )}
          </AdminFilterPopoverSurface>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

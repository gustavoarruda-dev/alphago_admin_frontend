import * as Dialog from '@radix-ui/react-dialog';
import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { AdminOverlaySkeleton } from '@/components/admin/admin-overlay-skeleton';
import { AdminFilterPopoverSurface } from '@/components/admin/dashboard/admin-filter-popover-surface';
import { ButtonBorder } from '@/components/ui/button-border';
import { useToast, useTransientLoading } from '@/hooks';
import { cn } from '@/lib/utils';
import {
  ADMIN_ACCESS_PERMISSION_CATEGORIES,
  type AdminAccessPermissionCategory,
  type AdminAccessProfile,
} from '@/data/admin-access-profiles';
import {
  AdminUsersFormSection,
  AdminUsersTextField,
} from '@/components/admin/users/admin-users-form-field';

function PermissionToggle({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 text-[12px] text-foreground/62 transition-colors hover:text-foreground dark:text-white/52 dark:hover:text-white/72"
    >
      <span
        className={cn(
          'inline-flex size-3.5 items-center justify-center rounded-full border transition-all',
          selected
            ? 'border-[#5340F6]/70 bg-[#5340F6]/15'
            : 'border-white/18 bg-white/5',
        )}
      >
        <span
          className={cn(
            'size-1.5 rounded-full transition-opacity',
            selected ? 'bg-[#5340F6] opacity-100' : 'opacity-0',
          )}
        />
      </span>
      <span>{label}</span>
    </button>
  );
}

function isCategoryFullySelected(
  category: AdminAccessPermissionCategory,
  selectedPermissions: string[],
) {
  return category.permissions.every((permission) =>
    selectedPermissions.includes(permission),
  );
}

export function AdminAccessProfileCreateDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (profile: AdminAccessProfile) => void;
}) {
  const isLoading = useTransientLoading(open);
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const totalPermissions = useMemo(
    () =>
      ADMIN_ACCESS_PERMISSION_CATEGORIES.flatMap(
        (category) => category.permissions,
      ),
    [],
  );

  const allSelected = totalPermissions.every((permission) =>
    selectedPermissions.includes(permission),
  );

  const handleTogglePermission = (permission: string) => {
    setSelectedPermissions((current) =>
      current.includes(permission)
        ? current.filter((item) => item !== permission)
        : [...current, permission],
    );
  };

  const handleToggleCategory = (category: AdminAccessPermissionCategory) => {
    const categoryFullySelected = isCategoryFullySelected(category, selectedPermissions);

    setSelectedPermissions((current) => {
      if (categoryFullySelected) {
        return current.filter((permission) => !category.permissions.includes(permission));
      }

      return Array.from(new Set([...current, ...category.permissions]));
    });
  };

  const handleToggleAll = () => {
    setSelectedPermissions(allSelected ? [] : totalPermissions);
  };

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setName('');
      setSelectedPermissions([]);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: 'Nome obrigatório',
        description: 'Informe o nome do perfil de acesso antes de continuar.',
        variant: 'destructive',
      });
      return;
    }

    onCreate({
      id: `profile-${Date.now()}`,
      name: name.trim(),
      categories: ADMIN_ACCESS_PERMISSION_CATEGORIES,
      selectedPermissions,
      assignedUsersCount: 0,
    });
    handleClose(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-[2px]" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-[95] w-[calc(100vw-1.5rem)] max-w-[980px] -translate-x-1/2 -translate-y-1/2 outline-none',
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
                      Criar Novo Perfil de Acesso
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-[13px] leading-5 text-foreground/60 dark:text-white/50">
                      Crie um novo perfil de acesso e escolha as funcionalidades que serão permitidas
                    </Dialog.Description>
                  </div>
                  <Dialog.Close
                    aria-label="Fechar modal de criação do perfil"
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="size-5" />
                  </Dialog.Close>
                </div>

                <div className="mt-8">
                  <AdminUsersFormSection
                    title="Funcionalidades"
                    description="Selecione as funcionalidades que estarão disponíveis neste perfil de acesso"
                  >
                    <div className="space-y-6">
                      <div className="max-w-[360px]">
                        <AdminUsersTextField
                          placeholder="Digite aqui o nome do perfil de acesso"
                          value={name}
                          onChange={setName}
                        />
                      </div>

                      <div className="space-y-5">
                        <div>
                          <PermissionToggle
                            label="Selecionar todas as funcionalidades"
                            selected={allSelected}
                            onToggle={handleToggleAll}
                          />
                        </div>

                        {ADMIN_ACCESS_PERMISSION_CATEGORIES.map((category) => {
                          const categoryFullySelected = isCategoryFullySelected(
                            category,
                            selectedPermissions,
                          );

                          return (
                            <div key={category.id}>
                              <h4 className="text-[13px] font-semibold text-foreground dark:text-white">
                                {category.label}
                              </h4>
                              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-3">
                                <PermissionToggle
                                  label="Selecionar todos"
                                  selected={categoryFullySelected}
                                  onToggle={() => handleToggleCategory(category)}
                                />
                                {category.permissions.map((permission) => (
                                  <PermissionToggle
                                    key={permission}
                                    label={permission}
                                    selected={selectedPermissions.includes(permission)}
                                    onToggle={() => handleTogglePermission(permission)}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
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
                    className="h-10 min-w-[184px] px-6 text-[13px]"
                    onClick={handleSubmit}
                  >
                    Incluir Novo Perfil de Acesso
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

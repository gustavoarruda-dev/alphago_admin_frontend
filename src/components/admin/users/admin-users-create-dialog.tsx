import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { AdminOverlaySkeleton } from '@/components/admin/admin-overlay-skeleton';
import { AdminFilterPopoverSurface } from '@/components/admin/dashboard/admin-filter-popover-surface';
import { AdminSelectableOptionRow } from '@/components/admin/dashboard/admin-selectable-option-row';
import { ButtonBorder } from '@/components/ui/button-border';
import { useToast, useTransientLoading } from '@/hooks';
import { cn } from '@/lib/utils';
import type { AdminUserAdminRow } from '@/data/admin-users';
import {
  AdminUsersFormSection,
  AdminUsersSelectField,
  AdminUsersSelectPopoverSurface,
  AdminUsersTextField,
} from './admin-users-form-field';

const ACCESS_PROFILE_OPTIONS = [
  'Usuario',
  'Admin',
  'Super Admin',
] as const;

type CreateUserFormValue = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  department: string;
  password: string;
  accessProfile: string;
};

const INITIAL_FORM_VALUE: CreateUserFormValue = {
  name: '',
  email: '',
  phone: '',
  cpf: '',
  birthDate: '',
  department: '',
  password: '',
  accessProfile: '',
};

function AccessProfileSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div>
          <AdminUsersSelectField
            value={value}
            placeholder="Selecione o perfil de acesso"
          />
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={8}
          avoidCollisions={false}
          className="z-[105] w-[var(--radix-popover-trigger-width)] min-w-[260px] outline-none"
        >
          <AdminUsersSelectPopoverSurface>
            <div className="max-h-[240px] overflow-y-auto p-2">
              {ACCESS_PROFILE_OPTIONS.map((option) => (
                <Popover.Close asChild key={option}>
                  <div>
                    <AdminSelectableOptionRow
                      ariaLabel={option}
                      checked={value === option}
                      label={option}
                      onClick={() => onChange(option)}
                      className="dark:text-white"
                    />
                  </div>
                </Popover.Close>
              ))}
            </div>
          </AdminUsersSelectPopoverSurface>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function AdminUsersCreateDialog({
  user,
  open,
  onOpenChange,
}: {
  user?: AdminUserAdminRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [formValue, setFormValue] = useState<CreateUserFormValue>(INITIAL_FORM_VALUE);
  const isLoading = useTransientLoading(open);
  const { toast } = useToast();
  const isEditMode = !!user;

  useEffect(() => {
    if (!open) return;

    if (!user) {
      setFormValue(INITIAL_FORM_VALUE);
      return;
    }

    setFormValue({
      name: user.name,
      email: user.email,
      phone: '(11) 97234-0023',
      cpf: '123.456.789-10',
      birthDate: '12/09/1992',
      department: 'Administração',
      password: '12345678',
      accessProfile: user.role,
    });
  }, [open, user]);

  const canSubmit = useMemo(
    () =>
      Object.values(formValue).every((value) => value.trim().length > 0),
    [formValue],
  );

  const updateField = (field: keyof CreateUserFormValue, value: string) => {
    setFormValue((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setFormValue(INITIAL_FORM_VALUE);
    }
  };

  const handleSubmit = () => {
    if (!canSubmit) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os dados do novo usuário antes de continuar.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: isEditMode ? 'Usuário atualizado' : 'Novo usuário',
      description: isEditMode
        ? `A edição de ${formValue.name} foi preparada para a próxima etapa.`
        : `O usuário ${formValue.name} foi preparado para inclusão na próxima etapa.`,
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
                      {isEditMode ? 'Editar Usuário' : 'Incluir Novo Usuário'}
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-[13px] leading-5 text-foreground/60 dark:text-white/50">
                      {isEditMode
                        ? 'Atualize os dados do usuário administrativo'
                        : 'Crie um novo usuário administrativo'}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close
                    aria-label="Fechar modal de criação de usuário"
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="size-5" />
                  </Dialog.Close>
                </div>

                <div className="mt-8">
                  <AdminUsersFormSection
                    title="Informações do Usuário"
                    description="Configure as informações principais do usuário"
                  >
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                      <AdminUsersTextField
                        placeholder="Digite aqui o nome"
                        value={formValue.name}
                        onChange={(value) => updateField('name', value)}
                      />
                      <AdminUsersTextField
                        placeholder="Digite aqui o e-mail"
                        value={formValue.email}
                        onChange={(value) => updateField('email', value)}
                        type="email"
                      />
                      <AdminUsersTextField
                        placeholder="Digite aqui o telefone"
                        value={formValue.phone}
                        onChange={(value) => updateField('phone', value)}
                      />
                      <AdminUsersTextField
                        placeholder="Digite aqui o CPF"
                        value={formValue.cpf}
                        onChange={(value) => updateField('cpf', value)}
                      />
                      <AdminUsersTextField
                        placeholder="Digite aqui a data de nascimento"
                        value={formValue.birthDate}
                        onChange={(value) => updateField('birthDate', value)}
                      />
                      <AdminUsersTextField
                        placeholder="Digite aqui o departamento"
                        value={formValue.department}
                        onChange={(value) => updateField('department', value)}
                      />
                      <AdminUsersTextField
                        placeholder="Digite aqui a senha"
                        value={formValue.password}
                        onChange={(value) => updateField('password', value)}
                        type="password"
                      />
                      <AccessProfileSelect
                        value={formValue.accessProfile}
                        onChange={(value) => updateField('accessProfile', value)}
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
                    className="h-10 min-w-[182px] px-6 text-[13px]"
                    onClick={handleSubmit}
                  >
                    {isEditMode ? 'Salvar Alterações' : 'Incluir Novo Usuário'}
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

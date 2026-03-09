import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import { LogOut, Settings, Sun, User } from 'lucide-react';
import { AdminMiniPopoverSkeleton } from '@/components/admin/admin-mini-popover-skeleton';
import { useTransientLoading } from '@/hooks';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme';
import { toast } from '@/hooks/use-toast';

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

function MenuItem({ icon, label, disabled = false, onClick }: MenuItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left',
        disabled
          ? 'opacity-45 cursor-not-allowed'
          : 'hover:bg-foreground/10 transition-colors',
      )}
    >
      <span className="size-6 shrink-0 flex items-center justify-center" aria-hidden>
        {icon}
      </span>
      <span className="text-[14px] text-foreground/90">{label}</span>
    </button>
  );
}

export function AdminUserMenu() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const isLoading = useTransientLoading(open);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center p-0 m-0 bg-transparent border-0"
          aria-label="Abrir menu do usuário"
        >
          <div aria-hidden className="user-account-icon" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={10}
          className="z-[80] outline-none"
        >
          {isLoading ? (
            <AdminMiniPopoverSkeleton rows={4} widthClassName="w-[220px]" />
          ) : (
            <div
              className={cn(
                'w-[220px] rounded-2xl border border-white/10 p-2',
                'card-gradient-bg-modal',
                'user-account-popover-surface',
                'shadow-[0px_6px_16px_rgba(0,0,0,0.12)] dark:shadow-[0px_10px_40px_rgba(0,0,0,0.45)]',
              )}
            >
              <div className="flex flex-col gap-1">
                <MenuItem
                  icon={<User className="size-6 text-foreground/80" />}
                  label="Perfil"
                  disabled
                />
                <MenuItem
                  icon={<Sun className="size-6 text-foreground/60" />}
                  label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                />
                <MenuItem
                  icon={<Settings className="size-6 text-foreground/80" />}
                  label="Configurações"
                  onClick={() =>
                    toast({
                      title: 'Configurações do admin',
                      description: 'Essa área será conectada na próxima etapa.',
                    })
                  }
                />
                <MenuItem
                  icon={<LogOut className="size-6 text-foreground/80" />}
                  label="Sair"
                  onClick={() =>
                    toast({
                      title: 'Área administrativa',
                      description: 'O fluxo de autenticação do admin entra na próxima etapa.',
                    })
                  }
                />
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

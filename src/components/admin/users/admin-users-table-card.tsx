import { useEffect, useMemo, useRef, useState } from 'react';
import { KeyRound, Search, SquarePen, UserRoundCheck, UserRoundX } from 'lucide-react';
import { CardGradient } from '@/components/ui/card-gradient';
import { DataTable, type DataTableColumn, type DataTableSortState } from '@/components/ui/data-table';
import { ButtonBorder } from '@/components/ui/button-border';
import { AdminKebabExportMenu } from '@/components/admin/dashboard/admin-kebab-export-menu';
import { useKeyedTransientLoading, useToast } from '@/hooks';
import { cn } from '@/lib/utils';
import type { TabularExportData } from '@/lib/export-element';
import type { AdminUserAdminRow } from '@/data/admin-users';
import { AdminUsersCreateDialog } from './admin-users-create-dialog';
import { AdminUsersResetPasswordDialog } from './admin-users-reset-password-dialog';
import { AdminUsersStatusPill } from './admin-users-status-pill';
import { AdminUsersToggleStatusDialog } from './admin-users-toggle-status-dialog';

export function AdminUsersTableCard({
  title,
  rows,
  sort,
  onSortChange,
}: {
  title: string;
  rows: AdminUserAdminRow[];
  sort: DataTableSortState;
  onSortChange: (next: DataTableSortState) => void;
}) {
  const exportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [tableRows, setTableRows] = useState(rows);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserAdminRow | null>(null);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUserAdminRow | null>(null);
  const [toggleStatusDialogOpen, setToggleStatusDialogOpen] = useState(false);
  const tableLoadingKey = JSON.stringify({ searchTerm, rowsCount: tableRows.length });
  const isTableLoading = useKeyedTransientLoading(tableLoadingKey);

  useEffect(() => {
    setTableRows(rows);
  }, [rows]);

  const filteredRows = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) return tableRows;

    return tableRows.filter((row) =>
      [row.name, row.email, row.role, row.lastAccess, row.statusLabel]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch),
    );
  }, [tableRows, searchTerm]);

  const columns = useMemo<Array<DataTableColumn<AdminUserAdminRow>>>(
    () => [
      {
        id: 'administrator',
        header: 'Administradores',
        sortKey: 'name',
        defaultSortOrder: 'asc',
        sortValue: (row) => row.name,
        cell: (row) => (
          <div className="space-y-0.5 text-left leading-tight">
            <div className="text-white/65">{row.name}</div>
            <div className="text-white/35">{row.email}</div>
          </div>
        ),
      },
      {
        id: 'role',
        header: 'Perfil',
        sortKey: 'role',
        defaultSortOrder: 'asc',
        sortValue: (row) => row.role,
        cell: (row) => row.role,
      },
      {
        id: 'twoFactor',
        header: '2FA',
        sortKey: 'twoFactorEnabled',
        defaultSortOrder: 'desc',
        sortValue: (row) => (row.twoFactorEnabled ? 1 : 0),
        cell: (row) => (
          <AdminUsersStatusPill
            active={row.twoFactorEnabled}
            label={row.twoFactorLabel}
          />
        ),
      },
      {
        id: 'lastAccess',
        header: 'Último Acesso',
        sortKey: 'lastAccess',
        defaultSortOrder: 'desc',
        sortValue: (row) => row.lastAccess,
        cell: (row) => row.lastAccess,
      },
      {
        id: 'status',
        header: 'Status',
        sortKey: 'status',
        defaultSortOrder: 'desc',
        sortValue: (row) => row.statusLabel,
        cell: (row) => (
          <AdminUsersStatusPill active={row.status === 'active'} label={row.statusLabel} />
        ),
      },
      {
        id: 'actions',
        header: '',
        align: 'center',
        sortable: false,
        cell: (row) => (
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              aria-label={`Editar ${row.name}`}
              onClick={() => {
                setEditingUser(row);
                setCreateDialogOpen(true);
              }}
              className="inline-flex size-7 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              <SquarePen className="size-4" />
            </button>
            <button
              type="button"
              aria-label={`Redefinir senha de ${row.name}`}
              onClick={() => {
                setSelectedUser(row);
                setResetPasswordDialogOpen(true);
              }}
              className="inline-flex size-7 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              <KeyRound className="size-4" />
            </button>
            <button
              type="button"
              aria-label={`Desativar ${row.name}`}
              onClick={() => {
                setSelectedUser(row);
                setToggleStatusDialogOpen(true);
              }}
              className="inline-flex size-7 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              {row.status === 'active' ? (
                <UserRoundX className="size-4" />
              ) : (
                <UserRoundCheck className="size-4" />
              )}
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const exportData = useMemo<TabularExportData>(
    () => ({
      sheetName: title,
      headers: ['Administradores', 'Perfil', '2FA', 'Último Acesso', 'Status'],
      rows: filteredRows.map((row) => [
        `${row.name} ${row.email}`,
        row.role,
        row.twoFactorLabel,
        row.lastAccess,
        row.statusLabel,
      ]),
    }),
    [filteredRows, title],
  );

  return (
    <CardGradient className="rounded-[22px] p-6 sm:p-7">
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
                'relative inline-flex h-9 w-full min-w-[210px] items-center overflow-hidden rounded-full border-2 bg-gradient-to-br px-5 text-foreground transition-all shadow-[0px_1.197px_29.915px_0px_rgba(69,42,124,0.10)] backdrop-blur-[35px] xl:w-[220px]',
                'border-border/40 from-background/40 to-background/10 hover:from-background/55 hover:to-background/20',
                'dark:border-b-white/20 dark:border-t-white/20 dark:border-r-white/10 dark:border-l-white/10 dark:from-white/10 dark:to-purple-950/15 dark:hover:from-white/20 dark:hover:to-white/4 dark:text-white',
              )}
            >
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Busca rápida"
                className="h-full w-full bg-transparent pr-8 text-[13px] text-inherit placeholder:text-foreground/60 focus:outline-none dark:placeholder:text-white/55"
              />
              <Search className="pointer-events-none absolute right-4 size-4 text-foreground/60 dark:text-white/55" />
            </label>

            <ButtonBorder
              type="button"
              className="h-9 min-w-[152px] px-5 text-[12px]"
              onClick={() => setCreateDialogOpen(true)}
            >
              Incluir Novo Usuário
            </ButtonBorder>

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
            rows={filteredRows}
            isLoading={isTableLoading}
            getRowKey={(row) => row.id}
            minWidthPx={1120}
            variant="dark"
            sort={sort}
            onSortChange={onSortChange}
            tableClassName="table-fixed"
            emptyState={
              <p className="text-sm text-white/55">
                Nenhum usuário administrativo encontrado com a busca atual.
              </p>
            }
          />
        </div>
      </div>

      <AdminUsersCreateDialog
        user={editingUser}
        open={createDialogOpen}
        onOpenChange={(open) => {
          setCreateDialogOpen(open);
          if (!open) setEditingUser(null);
        }}
      />
      <AdminUsersResetPasswordDialog
        user={selectedUser}
        open={resetPasswordDialogOpen}
        onOpenChange={(open) => {
          setResetPasswordDialogOpen(open);
          if (!open) setSelectedUser(null);
        }}
      />
      <AdminUsersToggleStatusDialog
        user={selectedUser}
        open={toggleStatusDialogOpen}
        onOpenChange={(open) => {
          setToggleStatusDialogOpen(open);
          if (!open) setSelectedUser(null);
        }}
        onConfirm={() => {
          if (!selectedUser) return;

          setTableRows((current) =>
            current.map((row) =>
              row.id === selectedUser.id
                ? {
                    ...row,
                    status: row.status === 'active' ? 'inactive' : 'active',
                    statusLabel: row.status === 'active' ? 'Inativo' : 'Ativo',
                  }
                : row,
            ),
          );

          toast({
            title:
              selectedUser.status === 'active'
                ? 'Administrador desativado'
                : 'Administrador reativado',
            description:
              selectedUser.status === 'active'
                ? `${selectedUser.name} foi desativado com sucesso.`
                : `${selectedUser.name} foi reativado com sucesso.`,
          });
          setToggleStatusDialogOpen(false);
          setSelectedUser(null);
        }}
      />
    </CardGradient>
  );
}

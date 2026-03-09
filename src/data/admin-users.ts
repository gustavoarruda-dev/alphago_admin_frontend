export type AdminUserRole = 'Super Admin';
export type AdminUserState = 'active' | 'inactive';

export type AdminUserAdminRow = {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  twoFactorEnabled: boolean;
  twoFactorLabel: string;
  lastAccess: string;
  status: AdminUserState;
  statusLabel: string;
};

export const ADMIN_USERS_ROWS: AdminUserAdminRow[] = [
  {
    id: 'admin-user-01',
    name: 'Usuário Admin 01',
    email: 'usuario@email.com',
    role: 'Super Admin',
    twoFactorEnabled: true,
    twoFactorLabel: 'Ativo',
    lastAccess: '12/11/2025',
    status: 'active',
    statusLabel: 'Ativo',
  },
  {
    id: 'admin-user-02',
    name: 'Usuário Admin 02',
    email: 'usuario@email.com',
    role: 'Super Admin',
    twoFactorEnabled: false,
    twoFactorLabel: 'Inativo',
    lastAccess: 'Nunca',
    status: 'inactive',
    statusLabel: 'Inativo',
  },
  {
    id: 'admin-user-03',
    name: 'Usuário Admin 03',
    email: 'usuario@email.com',
    role: 'Super Admin',
    twoFactorEnabled: true,
    twoFactorLabel: 'Ativo',
    lastAccess: '12/11/2025',
    status: 'active',
    statusLabel: 'Ativo',
  },
  {
    id: 'admin-user-04',
    name: 'Usuário Admin 04',
    email: 'usuario@email.com',
    role: 'Super Admin',
    twoFactorEnabled: true,
    twoFactorLabel: 'Ativo',
    lastAccess: '12/11/2025',
    status: 'active',
    statusLabel: 'Ativo',
  },
  {
    id: 'admin-user-05',
    name: 'Usuário Admin 05',
    email: 'usuario@email.com',
    role: 'Super Admin',
    twoFactorEnabled: true,
    twoFactorLabel: 'Ativo',
    lastAccess: '12/11/2025',
    status: 'active',
    statusLabel: 'Ativo',
  },
];

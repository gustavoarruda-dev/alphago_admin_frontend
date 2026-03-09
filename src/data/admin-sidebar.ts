export type AdminSidebarLink = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  disabled?: boolean;
};

export const ADMIN_SIDEBAR_ENTRIES: AdminSidebarLink[] = [
  {
    id: 'account',
    label: 'Minha Conta',
    icon: '/images/admin-account.svg',
    href: '/settings/account',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '/images/admin-dashboard.svg',
    href: '/dashboard',
  },
  {
    id: 'billing',
    label: 'Faturamento',
    icon: '/images/admin-billing.svg',
    href: '/billing',
  },
  {
    id: 'users',
    label: 'Usuários Adm',
    icon: '/images/admin-users.svg',
    href: '/users-admin',
  },
  {
    id: 'features',
    label: 'Funcionalidades',
    icon: '/images/admin-features.svg',
    href: '/features',
  },
  {
    id: 'access',
    label: 'Perfil de Acesso',
    icon: '/images/admin-access.svg',
    href: '/access-profile',
  },
  { id: 'plans', label: 'Planos', icon: '/images/admin-plans.svg', href: '/plans' },
];

export const ADMIN_SIDEBAR_FOOTER: AdminSidebarLink = {
  id: 'settings',
  label: 'Configurações',
  icon: '/images/icon.svg',
  disabled: true,
};

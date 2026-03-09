export interface AdminTileItem {
  src: string;
  label: string;
  href?: string;
  active: boolean;
}

export interface AdminHomeSection {
  title: string;
  subtitle: string;
  items: AdminTileItem[];
}

export const ADMIN_ACCOUNT_SECTION: AdminHomeSection = {
  title: 'Minha conta',
  subtitle: '',
  items: [
    {
      src: '/images/admin-dashboard.svg',
      label: 'Dashboard',
      href: '/dashboard',
      active: true,
    },
    {
      src: '/images/admin-billing.svg',
      label: 'Faturamento',
      href: '/billing',
      active: true,
    },
    {
      src: '/images/admin-users.svg',
      label: 'Usuários Adm',
      href: '/users-admin',
      active: true,
    },
    {
      src: '/images/admin-features.svg',
      label: 'Funcionalidades',
      href: '/features',
      active: true,
    },
    {
      src: '/images/admin-access.svg',
      label: 'Perfil de Acesso',
      active: false,
    },
    {
      src: '/images/admin-plans.svg',
      label: 'Planos',
      active: false,
    },
  ],
};

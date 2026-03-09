export type AdminAccessPermissionCategory = {
  id: string;
  label: string;
  permissions: string[];
};

export type AdminAccessProfile = {
  id: string;
  name: string;
  categories: AdminAccessPermissionCategory[];
  selectedPermissions: string[];
  assignedUsersCount: number;
};

export const ADMIN_ACCESS_PERMISSION_CATEGORIES: AdminAccessPermissionCategory[] = [
  {
    id: 'communication',
    label: 'Comunicação',
    permissions: [
      'Clipping',
      'Social Listening',
      'Redes Sociais',
      'Publicidade',
      'Análise de Comunicação',
      'Influenciadores',
      'SEO',
      'Google Search',
    ],
  },
  {
    id: 'media',
    label: 'Mídia',
    permissions: [
      'Google Ads',
      'Meta Ads',
      'Google Analytics',
      'ROAS',
      'Testes AB',
      'Linkedin Ads',
      'TikTok Ads',
      'Pinterest Ads',
      'Share of Voice',
    ],
  },
  {
    id: 'market',
    label: 'Mercado',
    permissions: [
      'Persona',
      'Análise SWOT',
      'Mercado',
      'Posicionamento',
      'Tendências',
      'Benchmarking',
      'Distribuição',
      'Pricing',
      'Market Share',
    ],
  },
  {
    id: 'business',
    label: 'Negócio',
    permissions: [
      'BSP',
      'CRM',
      'Ferramentas de Vendas',
      'Distribuição',
      'Budget',
      'E-commerce',
      'KPI',
    ],
  },
  {
    id: 'financial',
    label: 'Financeiro',
    permissions: ['CNPJ'],
  },
  {
    id: 'research',
    label: 'Pesquisa',
    permissions: [
      'Tracking de Marca',
      'Pesquisa Quantitativa',
      'Pesquisa Qualitativa',
    ],
  },
  {
    id: 'campaigns',
    label: 'Campanhas',
    permissions: ['Calendário', 'Briefing', 'Resultados', 'Aprendizados'],
  },
  {
    id: 'creation',
    label: 'Criação',
    permissions: ['Criação de KV', 'Getty Images', 'Conteúdos'],
  },
  {
    id: 'production',
    label: 'Produção',
    permissions: ['Personalização de Vídeos', 'Desdobramento de Peças'],
  },
];

export const ADMIN_ACCESS_PROFILES: AdminAccessProfile[] = [
  {
    id: 'manager',
    name: 'Manager',
    categories: ADMIN_ACCESS_PERMISSION_CATEGORIES,
    assignedUsersCount: 42,
    selectedPermissions: [
      'Clipping',
      'Redes Sociais',
      'Análise de Comunicação',
      'SEO',
      'Meta Ads',
      'Google Analytics',
      'ROAS',
      'Persona',
      'Mercado',
      'Posicionamento',
      'CRM',
      'Budget',
      'CNPJ',
      'Tracking de Marca',
      'Calendário',
      'Briefing',
      'Criação de KV',
      'Conteúdos',
    ],
  },
  {
    id: 'super-admin',
    name: 'Super Admin',
    categories: ADMIN_ACCESS_PERMISSION_CATEGORIES,
    assignedUsersCount: 3,
    selectedPermissions: ADMIN_ACCESS_PERMISSION_CATEGORIES.flatMap(
      (category) => category.permissions,
    ),
  },
  {
    id: 'support',
    name: 'Suporte',
    categories: ADMIN_ACCESS_PERMISSION_CATEGORIES,
    assignedUsersCount: 0,
    selectedPermissions: [
      'Clipping',
      'Social Listening',
      'Google Analytics',
      'Benchmarking',
      'Tracking de Marca',
      'Calendário',
    ],
  },
];

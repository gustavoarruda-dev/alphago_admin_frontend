export type AdminFeatureStatus = 'active' | 'inactive';
export type AdminFeatureCategoryId =
  | 'communication'
  | 'media'
  | 'market'
  | 'business'
  | 'financial'
  | 'research'
  | 'campaigns'
  | 'creation'
  | 'production';

export type AdminFeatureRow = {
  id: string;
  name: string;
  priority: number;
  status: AdminFeatureStatus;
  statusLabel: string;
  premium: boolean;
  updatedAt: string;
  enabled: boolean;
};

export type AdminFeatureCategory = {
  id: AdminFeatureCategoryId;
  label: string;
  rows: AdminFeatureRow[];
};

export const ADMIN_FEATURE_CATEGORY_OPTIONS = [
  'Todas as categorias',
  'Comunicação',
  'Mídia',
  'Mercado',
  'Negócios',
  'Financeiro',
  'Pesquisa',
  'Campanhas',
  'Criação',
  'Produção',
] as const;

export const ADMIN_FEATURE_STATUS_OPTIONS = [
  'Todos os status',
  'Ativo',
  'Inativo',
] as const;

export const ADMIN_FEATURES_CATEGORIES: AdminFeatureCategory[] = [
  {
    id: 'communication',
    label: 'Comunicação',
    rows: [
      { id: 'clipping', name: 'Clipping', priority: 1, status: 'active', statusLabel: 'Ativo', premium: false, updatedAt: '16/03/2025', enabled: true },
      { id: 'social-listening', name: 'Social Listening', priority: 2, status: 'inactive', statusLabel: 'Inativo', premium: true, updatedAt: '16/03/2025', enabled: false },
      { id: 'social-networks', name: 'Redes Sociais', priority: 3, status: 'active', statusLabel: 'Ativo', premium: false, updatedAt: '16/03/2025', enabled: true },
      { id: 'public-relations', name: 'Relações Públicas', priority: 4, status: 'active', statusLabel: 'Ativo', premium: false, updatedAt: '16/03/2025', enabled: true },
      { id: 'communication-analysis', name: 'Análise de Comunicação', priority: 5, status: 'active', statusLabel: 'Ativo', premium: false, updatedAt: '16/03/2025', enabled: true },
      { id: 'influencers', name: 'Influenciadores', priority: 6, status: 'active', statusLabel: 'Ativo', premium: false, updatedAt: '16/03/2025', enabled: true },
      { id: 'seo', name: 'SEO', priority: 7, status: 'active', statusLabel: 'Ativo', premium: false, updatedAt: '16/03/2025', enabled: true },
      { id: 'google-search', name: 'Google Search', priority: 8, status: 'active', statusLabel: 'Ativo', premium: false, updatedAt: '16/03/2025', enabled: true },
    ],
  },
  { id: 'media', label: 'Mídia', rows: [] },
  { id: 'market', label: 'Mercado', rows: [] },
  { id: 'business', label: 'Negócios', rows: [] },
  { id: 'financial', label: 'Financeiro', rows: [] },
  { id: 'research', label: 'Pesquisa', rows: [] },
  { id: 'campaigns', label: 'Campanhas', rows: [] },
  { id: 'creation', label: 'Criação', rows: [] },
  { id: 'production', label: 'Produção', rows: [] },
];

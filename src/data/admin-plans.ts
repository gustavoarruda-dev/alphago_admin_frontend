export type AdminPlanAudience = 'lojistas' | 'agencias';

export type AdminPlanFeature = {
  label: string;
  included: boolean;
};

export type AdminPlanCard = {
  id: string;
  audience: AdminPlanAudience;
  name: string;
  subtitle: string;
  trialLabel: string;
  sectionTitle: string;
  features: AdminPlanFeature[];
  accentClassName: string;
  highlighted?: boolean;
  badgeLabel?: string;
};

const BASE_PLAN_FEATURES: Record<string, AdminPlanFeature[]> = {
  free: [
    { label: 'Visão Geral', included: true },
    { label: 'Insights IA', included: false },
    { label: 'Performance de Mídia', included: true },
    { label: 'Taxa de Conversão', included: true },
    { label: 'Aquisição', included: true },
    { label: 'UTM', included: false },
    { label: 'Páginas', included: false },
  ],
  basic: [
    { label: 'Visão Geral', included: true },
    { label: 'Insights IA', included: false },
    { label: 'Performance de Mídia', included: true },
    { label: 'Taxa de Conversão', included: true },
    { label: 'Aquisição', included: true },
    { label: 'UTM', included: true },
    { label: 'Páginas', included: true },
  ],
  enterprise: [
    { label: 'Visão Geral', included: true },
    { label: 'Insights IA', included: false },
    { label: 'Performance de Mídia', included: true },
    { label: 'Taxa de Conversão', included: true },
    { label: 'Aquisição', included: true },
    { label: 'UTM', included: true },
    { label: 'Páginas', included: true },
  ],
  ia: [
    { label: 'Visão Geral', included: true },
    { label: 'Insights IA', included: true },
    { label: 'Performance de Mídia', included: true },
    { label: 'Taxa de Conversão', included: true },
    { label: 'Aquisição', included: true },
    { label: 'UTM', included: true },
    { label: 'Páginas', included: true },
  ],
};

export const ADMIN_PLAN_AUDIENCE_OPTIONS: Array<{
  value: AdminPlanAudience;
  label: string;
}> = [
  { value: 'lojistas', label: 'Para lojistas' },
  { value: 'agencias', label: 'Para agências' },
];

export const ADMIN_PLANS: AdminPlanCard[] = [
  {
    id: 'free-lojistas',
    audience: 'lojistas',
    name: 'Gratuito',
    subtitle: 'Painel do Ecommerce',
    trialLabel: '7 dias Grátis',
    sectionTitle: 'Recursos Disponíveis',
    features: BASE_PLAN_FEATURES.free,
    accentClassName:
      'bg-[linear-gradient(180deg,rgba(32,27,72,0.88),rgba(20,18,50,0.82))] border-white/10',
  },
  {
    id: 'basic-lojistas',
    audience: 'lojistas',
    name: 'Básico',
    subtitle: 'Painel do Ecommerce',
    trialLabel: '7 dias Grátis',
    sectionTitle: 'Recursos Disponíveis',
    features: BASE_PLAN_FEATURES.basic,
    accentClassName:
      'bg-[linear-gradient(180deg,rgba(117,95,22,0.9),rgba(83,62,14,0.84))] border-[#D6B03B]/18',
  },
  {
    id: 'enterprise-lojistas',
    audience: 'lojistas',
    name: 'Enterprise',
    subtitle: 'Painel do Ecommerce',
    trialLabel: '7 dias Grátis',
    sectionTitle: 'Recursos Disponíveis',
    features: BASE_PLAN_FEATURES.enterprise,
    accentClassName:
      'bg-[linear-gradient(180deg,rgba(162,92,28,0.9),rgba(108,55,15,0.84))] border-[#F29C38]/22',
    highlighted: true,
    badgeLabel: 'Mais Popular',
  },
  {
    id: 'ia-lojistas',
    audience: 'lojistas',
    name: 'IA',
    subtitle: 'Painel do Ecommerce',
    trialLabel: '7 dias Grátis',
    sectionTitle: 'Recursos Disponíveis',
    features: BASE_PLAN_FEATURES.ia,
    accentClassName:
      'bg-[linear-gradient(180deg,rgba(72,57,149,0.9),rgba(53,41,116,0.84))] border-[#7267F5]/24',
  },
  {
    id: 'free-agencias',
    audience: 'agencias',
    name: 'Gratuito',
    subtitle: 'Painel para Agências',
    trialLabel: '14 dias Grátis',
    sectionTitle: 'Recursos Disponíveis',
    features: BASE_PLAN_FEATURES.free,
    accentClassName:
      'bg-[linear-gradient(180deg,rgba(32,27,72,0.88),rgba(20,18,50,0.82))] border-white/10',
  },
  {
    id: 'basic-agencias',
    audience: 'agencias',
    name: 'Básico',
    subtitle: 'Painel para Agências',
    trialLabel: '14 dias Grátis',
    sectionTitle: 'Recursos Disponíveis',
    features: BASE_PLAN_FEATURES.basic,
    accentClassName:
      'bg-[linear-gradient(180deg,rgba(117,95,22,0.9),rgba(83,62,14,0.84))] border-[#D6B03B]/18',
  },
  {
    id: 'enterprise-agencias',
    audience: 'agencias',
    name: 'Enterprise',
    subtitle: 'Painel para Agências',
    trialLabel: '14 dias Grátis',
    sectionTitle: 'Recursos Disponíveis',
    features: BASE_PLAN_FEATURES.enterprise,
    accentClassName:
      'bg-[linear-gradient(180deg,rgba(162,92,28,0.9),rgba(108,55,15,0.84))] border-[#F29C38]/22',
    highlighted: true,
    badgeLabel: 'Mais Popular',
  },
  {
    id: 'ia-agencias',
    audience: 'agencias',
    name: 'IA',
    subtitle: 'Painel para Agências',
    trialLabel: '14 dias Grátis',
    sectionTitle: 'Recursos Disponíveis',
    features: BASE_PLAN_FEATURES.ia,
    accentClassName:
      'bg-[linear-gradient(180deg,rgba(72,57,149,0.9),rgba(53,41,116,0.84))] border-[#7267F5]/24',
  },
];

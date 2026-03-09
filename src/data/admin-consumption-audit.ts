export type AdminConsumptionAuditBreakdown = {
  label: string;
  value: string;
};

export type AdminConsumptionAuditRow = {
  id: string;
  dateTime: string;
  type: string;
  modelFamily: (typeof ADMIN_CONSUMPTION_AUDIT_MODELS)[number];
  model: string;
  availableTokens: number;
  availableTokensLabel: string;
  availableTokensBreakdown: AdminConsumptionAuditBreakdown[];
  usedTokens: number;
  usedTokensLabel: string;
  cost: number;
  costLabel: string;
};

export const ADMIN_CONSUMPTION_AUDIT_MODELS = [
  'Claude',
  'ChatGPT',
  'Grok',
  'DeepSeek',
  'Gemini',
] as const;

export const ADMIN_CONSUMPTION_AUDIT_ROWS: AdminConsumptionAuditRow[] = [
  {
    id: 'consumption-1',
    dateTime: '12/11/2025 - 14:45',
    type: 'Incluído',
    modelFamily: 'Claude',
    model: 'claude-4.5-opus-high-thinking',
    availableTokens: 1100000,
    availableTokensLabel: '1,1M',
    availableTokensBreakdown: [
      { label: 'Cache Leitura', value: '973,908' },
      { label: 'Cache Escrita', value: '108,731' },
      { label: 'Output', value: '973,908' },
      { label: 'Input', value: '1,267' },
      { label: 'Total', value: '1,093,285' },
    ],
    usedTokens: 1100000,
    usedTokensLabel: '1,1M',
    cost: 0.67,
    costLabel: 'R$ 0,67',
  },
  {
    id: 'consumption-2',
    dateTime: '12/11/2025 - 14:45',
    type: 'Incluído',
    modelFamily: 'ChatGPT',
    model: 'gpt-4.1-turbo',
    availableTokens: 1300000,
    availableTokensLabel: '1,3M',
    availableTokensBreakdown: [
      { label: 'Cache Leitura', value: '1,102,876' },
      { label: 'Cache Escrita', value: '118,402' },
      { label: 'Output', value: '75,190' },
      { label: 'Input', value: '1,987' },
      { label: 'Total', value: '1,298,455' },
    ],
    usedTokens: 1300000,
    usedTokensLabel: '1,3M',
    cost: 1.67,
    costLabel: 'R$ 1,67',
  },
  {
    id: 'consumption-3',
    dateTime: '12/11/2025 - 14:45',
    type: 'Incluído',
    modelFamily: 'Grok',
    model: 'grok-2-thinking',
    availableTokens: 2600000,
    availableTokensLabel: '2,6M',
    availableTokensBreakdown: [
      { label: 'Cache Leitura', value: '1,945,773' },
      { label: 'Cache Escrita', value: '206,814' },
      { label: 'Output', value: '442,109' },
      { label: 'Input', value: '3,661' },
      { label: 'Total', value: '2,598,357' },
    ],
    usedTokens: 2600000,
    usedTokensLabel: '2,6M',
    cost: 1.45,
    costLabel: 'R$ 1,45',
  },
  {
    id: 'consumption-4',
    dateTime: '12/11/2025 - 14:45',
    type: 'Incluído',
    modelFamily: 'DeepSeek',
    model: 'deepseek-r1',
    availableTokens: 3300000,
    availableTokensLabel: '3,3M',
    availableTokensBreakdown: [
      { label: 'Cache Leitura', value: '2,745,122' },
      { label: 'Cache Escrita', value: '198,554' },
      { label: 'Output', value: '401,925' },
      { label: 'Input', value: '2,487' },
      { label: 'Total', value: '3,348,088' },
    ],
    usedTokens: 3300000,
    usedTokensLabel: '3,3M',
    cost: 2.66,
    costLabel: 'R$ 2,66',
  },
  {
    id: 'consumption-5',
    dateTime: '12/11/2025 - 14:45',
    type: 'Incluído',
    modelFamily: 'Gemini',
    model: 'gemini-1.5-pro',
    availableTokens: 1900000,
    availableTokensLabel: '1,9M',
    availableTokensBreakdown: [
      { label: 'Cache Leitura', value: '1,421,280' },
      { label: 'Cache Escrita', value: '163,208' },
      { label: 'Output', value: '284,941' },
      { label: 'Input', value: '1,115' },
      { label: 'Total', value: '1,870,544' },
    ],
    usedTokens: 1900000,
    usedTokensLabel: '1,9M',
    cost: 1.15,
    costLabel: 'R$ 1,15',
  },
];

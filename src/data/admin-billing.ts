import {
  ADMIN_CHART_PALETTE,
  type AdminLineDatum,
  type AdminLineSeries,
} from '@/data/admin-chart';

export type AdminBillingMixedSeries = {
  dataKey: string;
  label: string;
  color: string;
  type: 'line' | 'bar';
  strokeWidth?: number;
};

export type AdminBillingInvoiceStatus = 'paid' | 'high-usage' | 'awaiting-payment';

export type AdminBillingInvoiceRow = {
  id: string;
  invoiceNumber: string;
  referenceCode: string;
  amount: number;
  amountLabel: string;
  status: AdminBillingInvoiceStatus;
  statusLabel: string;
  paymentMethod: string;
  issuedAt: string;
  issuedAtLabel: string;
};

export type AdminBillingInvoiceDetails = {
  transaction: {
    id: string;
    statusLabel: string;
    amountLabel: string;
    paymentMethod: string;
    issuedAtLabel: string;
    gatewayId: string;
  };
  customer: {
    name: string;
    company: string;
    website: string;
    document: string;
    city: string;
    phone: string;
    personalEmail: string;
    billingEmail: string;
    companyEmail: string;
    accountStatusLabel: string;
  };
  invoice: {
    number: string;
    statusLabel: string;
    projectedAmountLabel: string;
    dueDateLabel: string;
    paidAtLabel: string;
    billingPeriodLabel: string;
  };
  subscription: {
    plan: string;
    cycle: string;
  };
};

export type AdminBillingInvoicesFilterValue = {
  period: {
    startDate: string;
    endDate: string;
  };
  status: AdminBillingInvoiceStatus | null;
  paymentMethod: string | null;
};

export const ADMIN_BILLING_STATUSES: Array<{
  value: AdminBillingInvoiceStatus;
  label: string;
}> = [
  { value: 'paid', label: 'Pago' },
  { value: 'high-usage', label: 'Alta usage' },
  { value: 'awaiting-payment', label: 'Aguardando pagamento' },
];

export const ADMIN_BILLING_PAYMENT_METHODS = [
  'Pix',
  'Cartão de Crédito',
  'Cartão de Débito',
] as const;

export const ADMIN_BILLING_DEFAULT_INVOICE_FILTERS: AdminBillingInvoicesFilterValue = {
  period: {
    startDate: '2025-05-26',
    endDate: '2025-06-05',
  },
  status: null,
  paymentMethod: null,
};

export const ADMIN_BILLING_CURRENT_MONTH_CONSUMPTION: {
  title: string;
  data: AdminLineDatum[];
  series: AdminLineSeries[];
} = {
  title: 'Consumo Excedente do Mês Atual',
  data: [
    { label: '08/nov/2025', cost: 0 },
    { label: '10/nov/2025', cost: 1620000 },
    { label: '12/nov/2025', cost: 0 },
    { label: '14/nov/2025', cost: 0 },
    { label: '16/nov/2025', cost: 0 },
    { label: '18/nov/2025', cost: 320000 },
    { label: '20/nov/2025', cost: 0 },
    { label: '22/nov/2025', cost: 600000 },
    { label: '24/nov/2025', cost: 0 },
    { label: '26/nov/2025', cost: 420000 },
    { label: '28/nov/2025', cost: 0 },
    { label: '30/nov/2025', cost: 0 },
  ],
  series: [
    {
      dataKey: 'cost',
      label: 'Custo',
      color: ADMIN_CHART_PALETTE.yellow,
      strokeWidth: 2.6,
    },
  ],
};

export const ADMIN_BILLING_EXCESS_CONSUMPTION: {
  title: string;
  subtitle: string;
  data: AdminLineDatum[];
  series: AdminBillingMixedSeries[];
} = {
  title: 'Consumo Excedente',
  subtitle: 'Nos últimos 3 meses - Linha Prevista e Barras',
  data: [
    { label: '08/10/2025', paid: 320, forecast: 40, received: 0, fees: 8 },
    { label: '10/10/2025', paid: 920, forecast: 38, received: 0, fees: 6 },
    { label: '12/10/2025', paid: 0, forecast: 36, received: 52, fees: 5 },
    { label: '14/10/2025', paid: 0, forecast: 38, received: 44, fees: 5 },
    { label: '16/10/2025', paid: 0, forecast: 40, received: 0, fees: 6 },
    { label: '18/10/2025', paid: 180, forecast: 42, received: 0, fees: 5 },
    { label: '20/10/2025', paid: 0, forecast: 44, received: 92, fees: 6 },
    { label: '22/10/2025', paid: 0, forecast: 46, received: 210, fees: 6 },
    { label: '24/10/2025', paid: 308.9, forecast: 23.67, received: 0, fees: 0 },
    { label: '28/10/2025', paid: 0, forecast: 48, received: 180, fees: 6 },
    { label: '30/10/2025', paid: 220, forecast: 44, received: 0, fees: 5 },
    { label: '04/11/2025', paid: 0, forecast: 42, received: 0, fees: 5 },
    { label: '06/11/2025', paid: 240, forecast: 40, received: 180, fees: 6 },
  ],
  series: [
    {
      dataKey: 'paid',
      label: 'Pago',
      color: ADMIN_CHART_PALETTE.yellow,
      type: 'bar',
    },
    {
      dataKey: 'forecast',
      label: 'Previsto',
      color: ADMIN_CHART_PALETTE.silver,
      type: 'line',
      strokeWidth: 1.8,
    },
    {
      dataKey: 'received',
      label: 'Recebido',
      color: ADMIN_CHART_PALETTE.orange,
      type: 'bar',
    },
    {
      dataKey: 'fees',
      label: 'Tarifas',
      color: ADMIN_CHART_PALETTE.violet,
      type: 'line',
      strokeWidth: 2,
    },
  ],
};

export const ADMIN_BILLING_EXCESS_COST_EVOLUTION: {
  title: string;
  data: AdminLineDatum[];
  series: AdminLineSeries[];
} = {
  title: 'Evolução de Custo Excedente por IA',
  data: [
    { label: '18 Mai', ia1: 0, ia2: 0, ia3: 0, ia4: 0 },
    { label: '20 Mai', ia1: 14, ia2: 4, ia3: 25, ia4: 1 },
    { label: '22 Mai', ia1: 12, ia2: 8, ia3: 23, ia4: 2 },
    { label: '24 Mai', ia1: 10, ia2: 6, ia3: 21, ia4: 4 },
    { label: '26 Mai', ia1: 8, ia2: 12, ia3: 17, ia4: 0 },
    { label: '28 Mai', ia1: 11, ia2: 13, ia3: 20, ia4: 0 },
    { label: '30 Mai', ia1: 18, ia2: 19, ia3: 29, ia4: 5 },
    { label: '01 Jun', ia1: 16, ia2: 18, ia3: 26, ia4: 2 },
    { label: '03 Jun', ia1: 16, ia2: 18, ia3: 26, ia4: 5 },
    { label: '05 Jun', ia1: 16, ia2: 23, ia3: 27, ia4: 4 },
    { label: '07 Jun', ia1: 12, ia2: 12, ia3: 18, ia4: 4 },
    { label: '10 Jun', ia1: 10, ia2: 14, ia3: 16, ia4: 3 },
    { label: '11 Jun', ia1: 4, ia2: 16, ia3: 10, ia4: 4 },
    { label: '14 Jun', ia1: 7, ia2: 19, ia3: 14, ia4: 1 },
    { label: '15 Jun', ia1: 0, ia2: 14, ia3: 4, ia4: 0 },
  ],
  series: [
    { dataKey: 'ia1', label: 'IA 1', color: ADMIN_CHART_PALETTE.yellow, strokeWidth: 2.25 },
    { dataKey: 'ia2', label: 'IA 2', color: ADMIN_CHART_PALETTE.amber, strokeWidth: 2.25 },
    { dataKey: 'ia3', label: 'IA 3', color: ADMIN_CHART_PALETTE.orange, strokeWidth: 2.25 },
    { dataKey: 'ia4', label: 'IA 4', color: ADMIN_CHART_PALETTE.magenta, strokeWidth: 2.25 },
  ],
};

export const ADMIN_BILLING_INVOICE_ROWS: AdminBillingInvoiceRow[] = [
  {
    id: 'billing-1',
    invoiceNumber: '0102030405060708',
    referenceCode: '384739303938390',
    amount: 135,
    amountLabel: 'R$ 135,00',
    status: 'paid',
    statusLabel: 'Pago',
    paymentMethod: 'Pix',
    issuedAt: '2025-05-26T14:45:00',
    issuedAtLabel: '26/05/2025 - 14:45',
  },
  {
    id: 'billing-2',
    invoiceNumber: '0102030405060709',
    referenceCode: '384739303938391',
    amount: 412,
    amountLabel: 'R$ 412,00',
    status: 'high-usage',
    statusLabel: 'Alta usage',
    paymentMethod: 'Cartão de Crédito',
    issuedAt: '2025-05-27T10:30:00',
    issuedAtLabel: '27/05/2025 - 10:30',
  },
  {
    id: 'billing-3',
    invoiceNumber: '0102030405060710',
    referenceCode: '384739303938392',
    amount: 235.9,
    amountLabel: 'R$ 235,90',
    status: 'awaiting-payment',
    statusLabel: 'Aguardando pagamento',
    paymentMethod: 'Cartão de Débito',
    issuedAt: '2025-05-28T09:15:00',
    issuedAtLabel: '28/05/2025 - 09:15',
  },
  {
    id: 'billing-4',
    invoiceNumber: '0102030405060711',
    referenceCode: '384739303938393',
    amount: 332,
    amountLabel: 'R$ 332,00',
    status: 'paid',
    statusLabel: 'Pago',
    paymentMethod: 'Pix',
    issuedAt: '2025-05-29T16:05:00',
    issuedAtLabel: '29/05/2025 - 16:05',
  },
  {
    id: 'billing-5',
    invoiceNumber: '0102030405060712',
    referenceCode: '384739303938394',
    amount: 355,
    amountLabel: 'R$ 355,00',
    status: 'paid',
    statusLabel: 'Pago',
    paymentMethod: 'Cartão de Crédito',
    issuedAt: '2025-05-30T11:20:00',
    issuedAtLabel: '30/05/2025 - 11:20',
  },
  {
    id: 'billing-6',
    invoiceNumber: '0102030405060713',
    referenceCode: '384739303938395',
    amount: 135,
    amountLabel: 'R$ 135,00',
    status: 'paid',
    statusLabel: 'Pago',
    paymentMethod: 'Cartão de Débito',
    issuedAt: '2025-05-31T08:10:00',
    issuedAtLabel: '31/05/2025 - 08:10',
  },
  {
    id: 'billing-7',
    invoiceNumber: '0102030405060714',
    referenceCode: '384739303938396',
    amount: 432,
    amountLabel: 'R$ 432,00',
    status: 'paid',
    statusLabel: 'Pago',
    paymentMethod: 'Pix',
    issuedAt: '2025-06-01T13:35:00',
    issuedAtLabel: '01/06/2025 - 13:35',
  },
  {
    id: 'billing-8',
    invoiceNumber: '0102030405060715',
    referenceCode: '384739303938397',
    amount: 235.9,
    amountLabel: 'R$ 235,90',
    status: 'paid',
    statusLabel: 'Pago',
    paymentMethod: 'Cartão de Crédito',
    issuedAt: '2025-06-02T15:55:00',
    issuedAtLabel: '02/06/2025 - 15:55',
  },
  {
    id: 'billing-9',
    invoiceNumber: '0102030405060716',
    referenceCode: '384739303938398',
    amount: 332,
    amountLabel: 'R$ 332,00',
    status: 'paid',
    statusLabel: 'Pago',
    paymentMethod: 'Cartão de Débito',
    issuedAt: '2025-06-03T12:40:00',
    issuedAtLabel: '03/06/2025 - 12:40',
  },
  {
    id: 'billing-10',
    invoiceNumber: '0102030405060717',
    referenceCode: '384739303938399',
    amount: 355,
    amountLabel: 'R$ 355,00',
    status: 'paid',
    statusLabel: 'Pago',
    paymentMethod: 'Pix',
    issuedAt: '2025-06-04T17:25:00',
    issuedAtLabel: '04/06/2025 - 17:25',
  },
];

export const ADMIN_BILLING_INVOICE_DETAILS: Record<string, AdminBillingInvoiceDetails> = {
  'billing-1': {
    transaction: {
      id: '0edc67ec-a1804-92e9f-fd19039c-yc78r',
      statusLabel: 'Pago',
      amountLabel: 'R$ 489,00',
      paymentMethod: 'Pix',
      issuedAtLabel: '12/11/2025 - 14:45',
      gatewayId: 'Av. 0457239802',
    },
    customer: {
      name: 'Maria Ines Sanchez',
      company: 'Como Loja ABC',
      website: 'www.empresas.com.br',
      document: '01.945.876.0001-02',
      city: 'Rio de Janeiro - RJ',
      phone: '(21) 81234-0123',
      personalEmail: 'maria@email.com',
      billingEmail: 'faturamento@email.com',
      companyEmail: 'empresa@email.com',
      accountStatusLabel: 'Ativo',
    },
    invoice: {
      number: '34546578956922',
      statusLabel: 'Pago',
      projectedAmountLabel: 'R$ 489,00',
      dueDateLabel: '12/11/2025',
      paidAtLabel: '12/11/2025 - 14:45',
      billingPeriodLabel: '02/10/2025 a 02/11/2025',
    },
    subscription: {
      plan: 'Básico',
      cycle: 'Anual',
    },
  },
  'billing-2': {
    transaction: {
      id: '2af0bd70-c006-4b46-9510-bdb0f5b02290',
      statusLabel: 'Alta usage',
      amountLabel: 'R$ 412,00',
      paymentMethod: 'Cartão de Crédito',
      issuedAtLabel: '27/05/2025 - 10:30',
      gatewayId: 'Av. 0457239803',
    },
    customer: {
      name: 'Joao Henrique Costa',
      company: 'Studio Nexo IA',
      website: 'www.studionexo.com.br',
      document: '13.214.908.0001-77',
      city: 'Sao Paulo - SP',
      phone: '(11) 99888-7788',
      personalEmail: 'joao@nexo.com',
      billingEmail: 'financeiro@nexo.com',
      companyEmail: 'contato@nexo.com',
      accountStatusLabel: 'Ativo',
    },
    invoice: {
      number: '34546578956923',
      statusLabel: 'Alta usage',
      projectedAmountLabel: 'R$ 412,00',
      dueDateLabel: '05/06/2025',
      paidAtLabel: '-',
      billingPeriodLabel: '01/05/2025 a 31/05/2025',
    },
    subscription: {
      plan: 'Professional',
      cycle: 'Mensal',
    },
  },
  'billing-3': {
    transaction: {
      id: '5475bfb2-c44b-4b38-aed5-37a3079e9858',
      statusLabel: 'Aguardando pagamento',
      amountLabel: 'R$ 235,90',
      paymentMethod: 'Cartão de Débito',
      issuedAtLabel: '28/05/2025 - 09:15',
      gatewayId: 'Av. 0457239804',
    },
    customer: {
      name: 'Ana Paula Ribeiro',
      company: 'Grupo Orbital',
      website: 'www.grupoorbital.com.br',
      document: '44.120.114.0001-05',
      city: 'Belo Horizonte - MG',
      phone: '(31) 97777-2211',
      personalEmail: 'ana@orbital.com',
      billingEmail: 'billing@orbital.com',
      companyEmail: 'contato@orbital.com',
      accountStatusLabel: 'Ativo',
    },
    invoice: {
      number: '34546578956924',
      statusLabel: 'Aguardando pagamento',
      projectedAmountLabel: 'R$ 235,90',
      dueDateLabel: '06/06/2025',
      paidAtLabel: '-',
      billingPeriodLabel: '01/05/2025 a 31/05/2025',
    },
    subscription: {
      plan: 'Starter',
      cycle: 'Mensal',
    },
  },
};

const DETAIL_NAME_POOL = [
  'Maria Ines Sanchez',
  'Joao Henrique Costa',
  'Ana Paula Ribeiro',
  'Lucas Martins',
  'Fernanda Queiroz',
  'Bruno Almeida',
  'Camila Duarte',
  'Rafael Nascimento',
] as const;

const DETAIL_COMPANY_POOL = [
  'Como Loja ABC',
  'Studio Nexo IA',
  'Grupo Orbital',
  'Pulse Commerce',
  'Nova Prisma Tech',
  'Atlas Growth',
  'Horizonte Digital',
  'Casa de Dados',
] as const;

const DETAIL_CITY_POOL = [
  'Rio de Janeiro - RJ',
  'Sao Paulo - SP',
  'Belo Horizonte - MG',
  'Curitiba - PR',
  'Porto Alegre - RS',
  'Recife - PE',
  'Salvador - BA',
  'Florianopolis - SC',
] as const;

const DETAIL_PLAN_POOL = [
  'Básico',
  'Starter',
  'Professional',
  'Business',
] as const;

function buildMockDocument(index: number): string {
  const base = String(10000000000000 + index * 12345).slice(0, 14);
  return `${base.slice(0, 2)}.${base.slice(2, 5)}.${base.slice(5, 8)}/${base.slice(8, 12)}-${base.slice(12, 14)}`;
}

function buildMockPhone(index: number): string {
  const suffix = String(1000 + index * 37).slice(-4);
  return `(11) 9${String(8000 + index * 11).slice(-4)}-${suffix}`;
}

function titleToSlug(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

export function getAdminBillingInvoiceDetails(row: AdminBillingInvoiceRow): AdminBillingInvoiceDetails {
  const explicit = ADMIN_BILLING_INVOICE_DETAILS[row.id];
  if (explicit) return explicit;

  const index = Math.max(0, Number(row.id.replace(/\D/g, '')) - 1);
  const customerName = DETAIL_NAME_POOL[index % DETAIL_NAME_POOL.length];
  const company = DETAIL_COMPANY_POOL[index % DETAIL_COMPANY_POOL.length];
  const city = DETAIL_CITY_POOL[index % DETAIL_CITY_POOL.length];
  const plan = DETAIL_PLAN_POOL[index % DETAIL_PLAN_POOL.length];
  const slug = titleToSlug(company);
  const amountLabel = row.amountLabel;
  const dueDateLabel = row.issuedAtLabel.split(' - ')[0] ?? row.issuedAtLabel;

  return {
    transaction: {
      id: `txn-${row.invoiceNumber}-${row.referenceCode}`.slice(0, 34),
      statusLabel: row.statusLabel,
      amountLabel,
      paymentMethod: row.paymentMethod,
      issuedAtLabel: row.issuedAtLabel,
      gatewayId: `Av. ${row.referenceCode}`,
    },
    customer: {
      name: customerName,
      company,
      website: `www.${slug}.com.br`,
      document: buildMockDocument(index + 1),
      city,
      phone: buildMockPhone(index + 1),
      personalEmail: `${titleToSlug(customerName)}@email.com`,
      billingEmail: `financeiro@${slug}.com.br`,
      companyEmail: `contato@${slug}.com.br`,
      accountStatusLabel: 'Ativo',
    },
    invoice: {
      number: `34${row.invoiceNumber.slice(0, 10)}`,
      statusLabel: row.statusLabel,
      projectedAmountLabel: amountLabel,
      dueDateLabel,
      paidAtLabel: row.status === 'paid' ? row.issuedAtLabel : '-',
      billingPeriodLabel: '01/05/2025 a 31/05/2025',
    },
    subscription: {
      plan,
      cycle: index % 2 === 0 ? 'Anual' : 'Mensal',
    },
  };
}

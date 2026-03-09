import type { ReactNode } from 'react';
import { ADMIN_CONSUMPTION_AUDIT_MODELS } from '@/data/admin-consumption-audit';

export type AdminDashboardTabId = 'agents' | 'subscribers' | 'consumption-audit';

export type AdminDashboardFilterItem = {
  title: string;
  value: ReactNode;
};

export type AdminDashboardFilterValue = {
  period: {
    startDate: string;
    endDate: string;
  };
  models?: string[];
  comparison:
    | {
        mode: 'none' | 'previous_period';
        period?: undefined;
      }
    | {
        mode: 'custom';
        period: {
          startDate: string;
          endDate: string;
        };
      };
};

export type AdminDashboardLineSeries = {
  dataKey: string;
  label: string;
  color: string;
  strokeWidth?: number;
};

export type AdminDashboardLineDatum = {
  label: string;
  [key: string]: number | string;
};

export type AdminDashboardDonutDatum = {
  name: string;
  value: number;
  color: string;
};

export type AdminDashboardView = {
  defaultFilterValue: AdminDashboardFilterValue;
  last90Days: {
    title: string;
    subtitle: string;
    data: AdminDashboardLineDatum[];
    series: AdminDashboardLineSeries[];
  };
  novemberOverage: {
    title: string;
    subtitle: string;
    data: AdminDashboardLineDatum[];
    series: AdminDashboardLineSeries[];
  };
  dailyTokens: {
    title: string;
    data: AdminDashboardDonutDatum[];
  };
  monthlyTokens: {
    title: string;
    data: AdminDashboardDonutDatum[];
  };
  dailyExcessCosts: {
    title: string;
    data: AdminDashboardDonutDatum[];
  };
  monthlyExcessCosts: {
    title: string;
    data: AdminDashboardDonutDatum[];
  };
  tokenEvolution: {
    title: string;
    data: AdminDashboardLineDatum[];
    series: AdminDashboardLineSeries[];
  };
  excessCostEvolution: {
    title: string;
    data: AdminDashboardLineDatum[];
    series: AdminDashboardLineSeries[];
  };
};

const palette = {
  yellow: '#FFD400',
  amber: '#FF9F0A',
  orange: '#FF5C12',
  magenta: '#F700B7',
  violet: '#6E63FF',
  blue: '#4B6BFF',
  silver: '#B8BCCB',
} as const;

export const ADMIN_DASHBOARD_TABS: Array<{
  id: AdminDashboardTabId;
  label: string;
  disabled?: boolean;
}> = [
  { id: 'subscribers', label: 'Assinantes' },
  { id: 'consumption-audit', label: 'Auditoria de Consumo' },
  { id: 'agents', label: 'Agentes', disabled: true },
];

const baseSeries = {
  ia1: { dataKey: 'ia1', label: 'IA 1', color: palette.yellow, strokeWidth: 2.25 },
  ia2: { dataKey: 'ia2', label: 'IA 2', color: palette.amber, strokeWidth: 2.25 },
  ia3: { dataKey: 'ia3', label: 'IA 3', color: palette.orange, strokeWidth: 2.25 },
  ia4: { dataKey: 'ia4', label: 'IA 4', color: palette.magenta, strokeWidth: 2.25 },
  ia5: { dataKey: 'ia5', label: 'IA 5', color: palette.violet, strokeWidth: 2.25 },
};

const subscribersView: AdminDashboardView = {
    defaultFilterValue: {
      period: {
        startDate: '2025-09-17',
        endDate: '2025-09-19',
      },
      comparison: { mode: 'none' },
    },
    last90Days: {
      title: 'Custo dos Últimos 90 Dias',
      subtitle: 'Evolução da Receita Recorrente Mensal',
      series: [{ dataKey: 'cost', label: 'Custo', color: palette.yellow, strokeWidth: 2.6 }],
      data: [
        { label: '01/out/2025', cost: 0 },
        { label: '07/out/2025', cost: 2420 },
        { label: '13/out/2025', cost: 2520 },
        { label: '19/out/2025', cost: 0 },
        { label: '25/out/2025', cost: 0 },
        { label: '31/out/2025', cost: 0 },
        { label: '04/nov/2025', cost: 220 },
        { label: '10/nov/2025', cost: 0 },
        { label: '16/nov/2025', cost: 0 },
        { label: '22/nov/2025', cost: 760 },
        { label: '28/nov/2025', cost: 520 },
        { label: '04/dez/2025', cost: 0 },
        { label: '10/dez/2025', cost: 560 },
        { label: '16/dez/2025', cost: 150 },
        { label: '22/dez/2025', cost: 0 },
      ],
    },
    novemberOverage: {
      title: 'Custo Excedente em Novembro',
      subtitle: 'Linha Prevista e Barras (Pagos e Recebidos)',
      series: [
        { dataKey: 'paid', label: 'Pago', color: palette.yellow, strokeWidth: 2.2 },
        { dataKey: 'forecast', label: 'Previsto', color: palette.silver, strokeWidth: 1.8 },
        { dataKey: 'received', label: 'Recebido', color: palette.orange, strokeWidth: 2 },
        { dataKey: 'fees', label: 'Tarifas', color: palette.blue, strokeWidth: 2 },
      ],
      data: [
        { label: '01/nov/2025', paid: 0, forecast: 60, received: 20, fees: 0 },
        { label: '04/nov/2025', paid: 920, forecast: 58, received: 22, fees: 0 },
        { label: '07/nov/2025', paid: 70, forecast: 56, received: 24, fees: 0 },
        { label: '10/nov/2025', paid: 55, forecast: 58, received: 18, fees: 0 },
        { label: '13/nov/2025', paid: 60, forecast: 62, received: 24, fees: 0 },
        { label: '16/nov/2025', paid: 180, forecast: 64, received: 28, fees: 0 },
        { label: '19/nov/2025', paid: 42, forecast: 60, received: 20, fees: 0 },
        { label: '22/nov/2025', paid: 230, forecast: 62, received: 24, fees: 0 },
        { label: '25/nov/2025', paid: 18, forecast: 58, received: 19, fees: 0 },
        { label: '28/nov/2025', paid: 220, forecast: 60, received: 20, fees: 0 },
        { label: '30/nov/2025', paid: 0, forecast: 58, received: 18, fees: 0 },
      ],
    },
    dailyTokens: {
      title: 'Consumo Tokens Diário por IA',
      data: [
        { name: 'IA 1', value: 243, color: palette.yellow },
        { name: 'IA 2', value: 96, color: palette.amber },
        { name: 'IA 3', value: 318, color: palette.orange },
        { name: 'IA 4', value: 101, color: palette.magenta },
        { name: 'IA 5', value: 28, color: palette.violet },
      ],
    },
    monthlyTokens: {
      title: 'Consumo de Tokens Mensal por IA',
      data: [
        { name: 'IA 1', value: 243, color: palette.yellow },
        { name: 'IA 2', value: 110, color: palette.amber },
        { name: 'IA 3', value: 332, color: palette.orange },
        { name: 'IA 4', value: 120, color: palette.magenta },
        { name: 'IA 5', value: 36, color: palette.violet },
      ],
    },
    dailyExcessCosts: {
      title: 'Custos Excedente Diário por IA',
      data: [
        { name: 'IA 1', value: 50, color: palette.yellow },
        { name: 'IA 2', value: 31, color: palette.amber },
        { name: 'IA 3', value: 96, color: palette.orange },
        { name: 'IA 4', value: 38, color: palette.magenta },
        { name: 'IA 5', value: 12, color: palette.violet },
      ],
    },
    monthlyExcessCosts: {
      title: 'Custos Excedente Mensal por IA',
      data: [
        { name: 'IA 1', value: 50, color: palette.yellow },
        { name: 'IA 2', value: 36, color: palette.amber },
        { name: 'IA 3', value: 104, color: palette.orange },
        { name: 'IA 4', value: 42, color: palette.magenta },
        { name: 'IA 5', value: 14, color: palette.violet },
      ],
    },
    tokenEvolution: {
      title: 'Evolução de Consumo de Tokens por IA',
      series: [baseSeries.ia1, baseSeries.ia2, baseSeries.ia3, baseSeries.ia4, baseSeries.ia5],
      data: [
        { label: '18 Mai', ia1: 0, ia2: 0, ia3: 0, ia4: 0, ia5: 0 },
        { label: '20 Mai', ia1: 14, ia2: 4, ia3: 25, ia4: 1, ia5: 0 },
        { label: '22 Mai', ia1: 12, ia2: 8, ia3: 21, ia4: 2, ia5: 0 },
        { label: '24 Mai', ia1: 10, ia2: 6, ia3: 18, ia4: 4, ia5: 0 },
        { label: '26 Mai', ia1: 8, ia2: 12, ia3: 15, ia4: 0, ia5: 0 },
        { label: '28 Mai', ia1: 11, ia2: 10, ia3: 17, ia4: 0, ia5: 0 },
        { label: '30 Mai', ia1: 19, ia2: 20, ia3: 29, ia4: 0, ia5: 0 },
        { label: '01 Jun', ia1: 16, ia2: 18, ia3: 26, ia4: 4, ia5: 0 },
        { label: '03 Jun', ia1: 16, ia2: 18, ia3: 26, ia4: 2, ia5: 0 },
        { label: '05 Jun', ia1: 16, ia2: 22, ia3: 27, ia4: 4, ia5: 0 },
        { label: '07 Jun', ia1: 10, ia2: 14, ia3: 18, ia4: 2, ia5: 0 },
        { label: '10 Jun', ia1: 4, ia2: 12, ia3: 18, ia4: 2, ia5: 0 },
        { label: '11 Jun', ia1: 4, ia2: 15, ia3: 11, ia4: 0, ia5: 0 },
        { label: '14 Jun', ia1: 7, ia2: 18, ia3: 8, ia4: 0, ia5: 0 },
        { label: '15 Jun', ia1: 0, ia2: 12, ia3: 2, ia4: 0, ia5: 0 },
      ],
    },
    excessCostEvolution: {
      title: 'Evolução de Custo Excedente por IA',
      series: [baseSeries.ia1, baseSeries.ia2, baseSeries.ia3, baseSeries.ia4, baseSeries.ia5],
      data: [
        { label: '18 Mai', ia1: 0, ia2: 0, ia3: 0, ia4: 0, ia5: 0 },
        { label: '20 Mai', ia1: 14, ia2: 4, ia3: 25, ia4: 1, ia5: 0 },
        { label: '22 Mai', ia1: 12, ia2: 8, ia3: 23, ia4: 2, ia5: 0 },
        { label: '24 Mai', ia1: 10, ia2: 6, ia3: 21, ia4: 4, ia5: 0 },
        { label: '26 Mai', ia1: 8, ia2: 12, ia3: 17, ia4: 0, ia5: 0 },
        { label: '28 Mai', ia1: 11, ia2: 13, ia3: 20, ia4: 0, ia5: 0 },
        { label: '30 Mai', ia1: 18, ia2: 19, ia3: 29, ia4: 5, ia5: 0 },
        { label: '01 Jun', ia1: 16, ia2: 18, ia3: 26, ia4: 2, ia5: 0 },
        { label: '03 Jun', ia1: 16, ia2: 18, ia3: 26, ia4: 5, ia5: 0 },
        { label: '05 Jun', ia1: 16, ia2: 23, ia3: 27, ia4: 4, ia5: 0 },
        { label: '07 Jun', ia1: 12, ia2: 12, ia3: 18, ia4: 4, ia5: 0 },
        { label: '10 Jun', ia1: 10, ia2: 14, ia3: 16, ia4: 3, ia5: 0 },
        { label: '11 Jun', ia1: 4, ia2: 16, ia3: 10, ia4: 4, ia5: 0 },
        { label: '14 Jun', ia1: 7, ia2: 19, ia3: 14, ia4: 1, ia5: 0 },
        { label: '15 Jun', ia1: 0, ia2: 14, ia3: 4, ia4: 0, ia5: 0 },
      ],
    },
};

export const ADMIN_DASHBOARD_VIEWS: Record<AdminDashboardTabId, AdminDashboardView> = {
  agents: subscribersView,
  subscribers: subscribersView,
  'consumption-audit': {
    defaultFilterValue: {
      period: {
        startDate: '2025-10-01',
        endDate: '2025-10-30',
      },
      models: [...ADMIN_CONSUMPTION_AUDIT_MODELS],
      comparison: { mode: 'none' },
    },
    last90Days: {
      title: 'Custo dos Últimos 90 Dias',
      subtitle: 'Evolução da Receita Recorrente Mensal',
      series: [{ dataKey: 'cost', label: 'Custo', color: palette.yellow, strokeWidth: 2.6 }],
      data: [
        { label: '05/jul/2025', cost: 1320 },
        { label: '12/jul/2025', cost: 1840 },
        { label: '19/jul/2025', cost: 930 },
        { label: '26/jul/2025', cost: 1150 },
        { label: '02/ago/2025', cost: 1450 },
        { label: '09/ago/2025', cost: 890 },
        { label: '16/ago/2025', cost: 1240 },
        { label: '23/ago/2025', cost: 1120 },
        { label: '30/ago/2025', cost: 1520 },
        { label: '06/set/2025', cost: 980 },
        { label: '13/set/2025', cost: 1360 },
        { label: '20/set/2025', cost: 910 },
        { label: '27/set/2025', cost: 1220 },
        { label: '04/out/2025', cost: 1080 },
        { label: '11/out/2025', cost: 1260 },
      ],
    },
    novemberOverage: {
      title: 'Custo Excedente em Novembro',
      subtitle: 'Linha Prevista e Barras (Pagos e Recebidos)',
      series: [
        { dataKey: 'paid', label: 'Pago', color: palette.yellow, strokeWidth: 2.2 },
        { dataKey: 'forecast', label: 'Previsto', color: palette.silver, strokeWidth: 1.8 },
        { dataKey: 'received', label: 'Recebido', color: palette.orange, strokeWidth: 2 },
        { dataKey: 'fees', label: 'Tarifas', color: palette.blue, strokeWidth: 2 },
      ],
      data: [
        { label: '01/nov/2025', paid: 220, forecast: 120, received: 92, fees: 14 },
        { label: '04/nov/2025', paid: 260, forecast: 135, received: 110, fees: 16 },
        { label: '07/nov/2025', paid: 310, forecast: 142, received: 122, fees: 18 },
        { label: '10/nov/2025', paid: 355, forecast: 148, received: 129, fees: 20 },
        { label: '13/nov/2025', paid: 280, forecast: 152, received: 118, fees: 17 },
        { label: '16/nov/2025', paid: 330, forecast: 156, received: 124, fees: 19 },
        { label: '19/nov/2025', paid: 390, forecast: 162, received: 138, fees: 22 },
        { label: '22/nov/2025', paid: 300, forecast: 154, received: 120, fees: 17 },
        { label: '25/nov/2025', paid: 248, forecast: 146, received: 106, fees: 15 },
        { label: '28/nov/2025', paid: 280, forecast: 150, received: 112, fees: 16 },
        { label: '30/nov/2025', paid: 260, forecast: 144, received: 104, fees: 14 },
      ],
    },
    dailyTokens: {
      title: 'Consumo Tokens Diário por IA',
      data: [
        { name: 'IA 1', value: 196, color: palette.yellow },
        { name: 'IA 2', value: 142, color: palette.amber },
        { name: 'IA 3', value: 224, color: palette.orange },
        { name: 'IA 4', value: 132, color: palette.magenta },
        { name: 'IA 5', value: 88, color: palette.violet },
      ],
    },
    monthlyTokens: {
      title: 'Consumo de Tokens Mensal por IA',
      data: [
        { name: 'IA 1', value: 420, color: palette.yellow },
        { name: 'IA 2', value: 278, color: palette.amber },
        { name: 'IA 3', value: 518, color: palette.orange },
        { name: 'IA 4', value: 236, color: palette.magenta },
        { name: 'IA 5', value: 164, color: palette.violet },
      ],
    },
    dailyExcessCosts: {
      title: 'Custos Excedente Diário por IA',
      data: [
        { name: 'IA 1', value: 38, color: palette.yellow },
        { name: 'IA 2', value: 29, color: palette.amber },
        { name: 'IA 3', value: 74, color: palette.orange },
        { name: 'IA 4', value: 41, color: palette.magenta },
        { name: 'IA 5', value: 18, color: palette.violet },
      ],
    },
    monthlyExcessCosts: {
      title: 'Custos Excedente Mensal por IA',
      data: [
        { name: 'IA 1', value: 92, color: palette.yellow },
        { name: 'IA 2', value: 56, color: palette.amber },
        { name: 'IA 3', value: 168, color: palette.orange },
        { name: 'IA 4', value: 64, color: palette.magenta },
        { name: 'IA 5', value: 26, color: palette.violet },
      ],
    },
    tokenEvolution: {
      title: 'Evolução de Consumo de Tokens por IA',
      series: [baseSeries.ia1, baseSeries.ia2, baseSeries.ia3, baseSeries.ia4, baseSeries.ia5],
      data: [
        { label: '01 Out', ia1: 6, ia2: 4, ia3: 8, ia4: 2, ia5: 1 },
        { label: '03 Out', ia1: 9, ia2: 6, ia3: 11, ia4: 4, ia5: 2 },
        { label: '05 Out', ia1: 12, ia2: 8, ia3: 15, ia4: 5, ia5: 3 },
        { label: '07 Out', ia1: 14, ia2: 11, ia3: 18, ia4: 5, ia5: 4 },
        { label: '09 Out', ia1: 16, ia2: 13, ia3: 21, ia4: 8, ia5: 5 },
        { label: '11 Out', ia1: 18, ia2: 12, ia3: 20, ia4: 10, ia5: 4 },
        { label: '13 Out', ia1: 20, ia2: 14, ia3: 24, ia4: 11, ia5: 5 },
        { label: '15 Out', ia1: 17, ia2: 15, ia3: 19, ia4: 9, ia5: 4 },
        { label: '17 Out', ia1: 15, ia2: 16, ia3: 17, ia4: 7, ia5: 4 },
        { label: '19 Out', ia1: 18, ia2: 18, ia3: 23, ia4: 10, ia5: 6 },
        { label: '21 Out', ia1: 21, ia2: 19, ia3: 26, ia4: 13, ia5: 7 },
        { label: '23 Out', ia1: 19, ia2: 18, ia3: 22, ia4: 12, ia5: 6 },
      ],
    },
    excessCostEvolution: {
      title: 'Evolução de Custo Excedente por IA',
      series: [baseSeries.ia1, baseSeries.ia2, baseSeries.ia3, baseSeries.ia4, baseSeries.ia5],
      data: [
        { label: '01 Out', ia1: 6, ia2: 3, ia3: 10, ia4: 2, ia5: 1 },
        { label: '03 Out', ia1: 8, ia2: 5, ia3: 12, ia4: 3, ia5: 2 },
        { label: '05 Out', ia1: 10, ia2: 7, ia3: 16, ia4: 4, ia5: 3 },
        { label: '07 Out', ia1: 12, ia2: 8, ia3: 20, ia4: 5, ia5: 2 },
        { label: '09 Out', ia1: 14, ia2: 10, ia3: 22, ia4: 6, ia5: 3 },
        { label: '11 Out', ia1: 12, ia2: 11, ia3: 19, ia4: 8, ia5: 3 },
        { label: '13 Out', ia1: 16, ia2: 14, ia3: 25, ia4: 9, ia5: 4 },
        { label: '15 Out', ia1: 14, ia2: 12, ia3: 21, ia4: 7, ia5: 4 },
        { label: '17 Out', ia1: 12, ia2: 10, ia3: 18, ia4: 6, ia5: 3 },
        { label: '19 Out', ia1: 15, ia2: 13, ia3: 24, ia4: 8, ia5: 5 },
        { label: '21 Out', ia1: 18, ia2: 15, ia3: 27, ia4: 10, ia5: 6 },
        { label: '23 Out', ia1: 16, ia2: 13, ia3: 22, ia4: 9, ia5: 5 },
      ],
    },
  },
};

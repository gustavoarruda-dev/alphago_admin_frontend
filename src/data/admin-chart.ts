export type AdminLineSeries = {
  dataKey: string;
  label: string;
  color: string;
  strokeWidth?: number;
};

export type AdminLineDatum = {
  label: string;
  [key: string]: number | string;
};

export type AdminDonutDatum = {
  name: string;
  value: number;
  color: string;
};

export const ADMIN_CHART_PALETTE = {
  yellow: '#FFD400',
  amber: '#FF9F0A',
  orange: '#FF5C12',
  magenta: '#F700B7',
  violet: '#6E63FF',
  blue: '#4B6BFF',
  silver: '#B8BCCB',
  teal: '#2CD6D6',
  green: '#38D39F',
} as const;

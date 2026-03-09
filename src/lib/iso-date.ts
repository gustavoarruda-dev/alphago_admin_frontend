const MONTHS_PT_LONG = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
] as const;

type IsoParts = { year: number; month: number; day: number };

function parseIsoParts(iso: string): IsoParts {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) {
    throw new Error(`Invalid ISO date: "${iso}". Expected YYYY-MM-DD.`);
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    throw new Error(`Invalid ISO date: "${iso}".`);
  }
  if (month < 1 || month > 12) {
    throw new Error(`Invalid ISO date month: "${iso}".`);
  }
  if (day < 1 || day > 31) {
    throw new Error(`Invalid ISO date day: "${iso}".`);
  }

  return { year, month, day };
}

export function fromIsoDate(iso: string): Date {
  const { year, month, day } = parseIsoParts(iso);
  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    throw new Error(`Invalid ISO date value: "${iso}".`);
  }

  return date;
}

export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDatePtFromIso(iso: string): string {
  const { year, month, day } = parseIsoParts(iso);
  return `${String(day).padStart(2, '0')} de ${MONTHS_PT_LONG[month - 1]} de ${year}`;
}

export function formatDateRangePt(startIso: string, endIso: string): string {
  return `${formatDatePtFromIso(startIso)} - ${formatDatePtFromIso(endIso)}`;
}

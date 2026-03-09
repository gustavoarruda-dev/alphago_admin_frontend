export type BrazilHoliday = {
  date: Date;
  label: string;
};

export type BrazilHolidayForMonth = {
  day: number;
  label: string;
  date: Date;
};

function atStartOfDayLocal(year: number, monthIndex: number, day: number): Date {
  return new Date(year, monthIndex, day, 0, 0, 0, 0);
}

function computeEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return atStartOfDayLocal(year, month - 1, day);
}

function addDays(date: Date, deltaDays: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + deltaDays);
  return next;
}

export function getBrazilHolidaysForYear(year: number): BrazilHoliday[] {
  const fixed: BrazilHoliday[] = [
    { date: atStartOfDayLocal(year, 0, 1), label: 'Confraternização Universal' },
    { date: atStartOfDayLocal(year, 3, 21), label: 'Tiradentes' },
    { date: atStartOfDayLocal(year, 4, 1), label: 'Dia do Trabalho' },
    { date: atStartOfDayLocal(year, 8, 7), label: 'Independência do Brasil' },
    { date: atStartOfDayLocal(year, 9, 12), label: 'Nossa Senhora Aparecida' },
    { date: atStartOfDayLocal(year, 10, 2), label: 'Finados' },
    { date: atStartOfDayLocal(year, 10, 15), label: 'Proclamação da República' },
    { date: atStartOfDayLocal(year, 10, 20), label: 'Dia da Consciência Negra' },
    { date: atStartOfDayLocal(year, 11, 25), label: 'Natal' },
  ];

  const easter = computeEasterSunday(year);
  const movable: BrazilHoliday[] = [
    { date: addDays(easter, -48), label: 'Carnaval' },
    { date: addDays(easter, -47), label: 'Carnaval' },
    { date: addDays(easter, -2), label: 'Sexta-feira Santa' },
    { date: addDays(easter, 60), label: 'Corpus Christi' },
  ];

  return [...fixed, ...movable].sort((left, right) => left.date.getTime() - right.date.getTime());
}

export function getBrazilHolidaysForMonth(year: number, monthIndex: number): BrazilHolidayForMonth[] {
  return getBrazilHolidaysForYear(year)
    .filter((holiday) => holiday.date.getFullYear() === year && holiday.date.getMonth() === monthIndex)
    .map((holiday) => ({
      day: holiday.date.getDate(),
      label: holiday.label,
      date: holiday.date,
    }))
    .sort((left, right) => left.day - right.day || left.label.localeCompare(right.label));
}

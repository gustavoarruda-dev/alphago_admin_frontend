import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getBrazilHolidaysForMonth, type BrazilHolidayForMonth } from '@/lib/br-holidays';

export type DateRangeValue = {
  from: Date | null;
  to: Date | null;
};

function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function isBeforeDay(left: Date, right: Date): boolean {
  const leftTime = new Date(left.getFullYear(), left.getMonth(), left.getDate()).getTime();
  const rightTime = new Date(right.getFullYear(), right.getMonth(), right.getDate()).getTime();
  return leftTime < rightTime;
}

function isInRange(day: Date, range: DateRangeValue): boolean {
  if (!range.from || !range.to) return false;

  const dayTime = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
  const fromTime = new Date(
    range.from.getFullYear(),
    range.from.getMonth(),
    range.from.getDate(),
  ).getTime();
  const toTime = new Date(
    range.to.getFullYear(),
    range.to.getMonth(),
    range.to.getDate(),
  ).getTime();

  return dayTime >= fromTime && dayTime <= toTime;
}

function formatMonthLabel(month: Date): string {
  const label = month.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function addMonths(base: Date, delta: number): Date {
  return new Date(base.getFullYear(), base.getMonth() + delta, 1);
}

function getDaysInMonth(month: Date): number {
  return new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
}

function getMonthGrid(month: Date): Array<Array<number | null>> {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDow = new Date(year, monthIndex, 1).getDay();
  const days = getDaysInMonth(month);

  const grid: Array<Array<number | null>> = [];
  let day = 1;

  for (let row = 0; row < 6; row += 1) {
    const week: Array<number | null> = [];
    for (let col = 0; col < 7; col += 1) {
      const cellIndex = row * 7 + col;
      if (cellIndex < firstDow || day > days) {
        week.push(null);
      } else {
        week.push(day);
        day += 1;
      }
    }
    grid.push(week);
  }

  return grid;
}

function normalizeRangeAfterClick(previous: DateRangeValue, clicked: Date): DateRangeValue {
  if (!previous.from || previous.to) {
    return { from: clicked, to: null };
  }

  if (previous.from && !previous.to) {
    if (isBeforeDay(clicked, previous.from)) {
      return { from: clicked, to: previous.from };
    }
    return { from: previous.from, to: clicked };
  }

  return previous;
}

export function AdminCalendarRange({
  value,
  onChange,
  initialMonth,
  disabled = false,
}: {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  initialMonth: Date;
  disabled?: boolean;
}) {
  const [startMonth, setStartMonth] = useState<Date>(initialMonth);

  useEffect(() => {
    setStartMonth(initialMonth);
  }, [initialMonth]);

  const monthA = startMonth;
  const monthB = useMemo(() => addMonths(startMonth, 1), [startMonth]);
  const holidaysA = useMemo(
    () => getBrazilHolidaysForMonth(monthA.getFullYear(), monthA.getMonth()),
    [monthA],
  );
  const holidaysB = useMemo(
    () => getBrazilHolidaysForMonth(monthB.getFullYear(), monthB.getMonth()),
    [monthB],
  );
  const holidayDaysA = useMemo(() => new Set(holidaysA.map((holiday) => holiday.day)), [holidaysA]);
  const holidayDaysB = useMemo(() => new Set(holidaysB.map((holiday) => holiday.day)), [holidaysB]);

  const weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  const renderMonth = (
    month: Date,
    side: 'left' | 'right',
    holidays: BrazilHolidayForMonth[],
    holidayDays: Set<number>,
  ) => {
    const grid = getMonthGrid(month);
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const holidayLabelByDay = new Map<number, string[]>();

    for (const holiday of holidays) {
      const current = holidayLabelByDay.get(holiday.day) ?? [];
      current.push(holiday.label);
      holidayLabelByDay.set(holiday.day, current);
    }

    return (
      <div className="w-full">
        <div className="mb-3 flex items-center justify-between">
          {side === 'left' ? (
            <button
              type="button"
              aria-label="Mês anterior"
              className={cn(
                'flex size-8 items-center justify-center rounded-full transition-colors hover:bg-white/5',
                disabled && 'pointer-events-none opacity-40',
              )}
              onClick={() => setStartMonth((previous) => addMonths(previous, -1))}
            >
              <ChevronLeft className="size-5 text-white/80" />
            </button>
          ) : (
            <span className="size-8" aria-hidden />
          )}

          <span className="text-[14px] font-medium text-white/80">
            {formatMonthLabel(month)}
          </span>

          {side === 'right' ? (
            <button
              type="button"
              aria-label="Próximo mês"
              className={cn(
                'flex size-8 items-center justify-center rounded-full transition-colors hover:bg-white/5',
                disabled && 'pointer-events-none opacity-40',
              )}
              onClick={() => setStartMonth((previous) => addMonths(previous, 1))}
            >
              <ChevronRight className="size-5 text-white/80" />
            </button>
          ) : (
            <span className="size-8" aria-hidden />
          )}
        </div>

        <div className="grid grid-cols-7 gap-y-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-[11px] text-white/50">
              {day}
            </div>
          ))}

          {grid.flatMap((week, rowIndex) =>
            week.map((dayNumber, colIndex) => {
              const key = `${rowIndex}-${colIndex}-${dayNumber ?? 'x'}`;
              if (!dayNumber) return <div key={key} className="h-9" />;

              const day = new Date(year, monthIndex, dayNumber);
              const isStart = value.from ? isSameDay(day, value.from) : false;
              const isEnd = value.to ? isSameDay(day, value.to) : false;
              const inRange = isInRange(day, value);
              const isMiddle = inRange && !isStart && !isEnd;
              const hasHolidayMarker = holidayDays.has(dayNumber);
              const holidayTitle = (holidayLabelByDay.get(dayNumber) ?? []).join(', ');

              return (
                <button
                  key={key}
                  type="button"
                  disabled={disabled}
                  onClick={() => onChange(normalizeRangeAfterClick(value, day))}
                  className={cn(
                    'relative mx-auto h-9 w-9 rounded-md text-[12px] transition-colors',
                    'text-white/80 hover:bg-white/5',
                    disabled && 'pointer-events-none opacity-40',
                    isMiddle && 'bg-[#5340F6]/15',
                    (isStart || isEnd) && 'border border-white/30 bg-[#5340F6] text-white',
                  )}
                  title={holidayTitle || undefined}
                  data-has-holiday={hasHolidayMarker ? 'true' : undefined}
                >
                  {dayNumber}
                  {hasHolidayMarker ? (
                    <span
                      aria-hidden
                      className="absolute bottom-[6px] left-1/2 size-[5px] -translate-x-1/2 rounded-full bg-[#F5DD1B]"
                    />
                  ) : null}
                </button>
              );
            }),
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="relative grid grid-cols-2 gap-10 max-[680px]:grid-cols-1">
        <div
          aria-hidden
          className="absolute inset-y-0 left-1/2 hidden w-px bg-white/10 max-[680px]:hidden"
        />
        {renderMonth(monthA, 'left', holidaysA, holidayDaysA)}
        {renderMonth(monthB, 'right', holidaysB, holidayDaysB)}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-10 max-[680px]:grid-cols-1">
        <div>
          <div className="border-t border-border/60 dark:border-white/10" />
          <div className="mt-3 space-y-2 text-[11px] text-white/40">
            {holidaysA.length > 0 ? (
              holidaysA.map((holiday) => (
                <div key={`${holiday.day}-${holiday.label}`} className="flex items-center gap-2">
                  <span aria-hidden className="size-[5px] rounded-full bg-[#F5DD1B]" />
                  <span>
                    {holiday.day} - {holiday.label}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2">
                <span aria-hidden className="size-[5px] rounded-full bg-[#F5DD1B]" />
                <span>Sem feriados nacionais neste mês</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="border-t border-border/60 dark:border-white/10" />
          <div className="mt-3 space-y-2 text-[11px] text-white/40">
            {holidaysB.length > 0 ? (
              holidaysB.map((holiday) => (
                <div key={`${holiday.day}-${holiday.label}`} className="flex items-center gap-2">
                  <span aria-hidden className="size-[5px] rounded-full bg-[#F5DD1B]" />
                  <span>
                    {holiday.day} - {holiday.label}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2">
                <span aria-hidden className="size-[5px] rounded-full bg-[#F5DD1B]" />
                <span>Sem feriados nacionais neste mês</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

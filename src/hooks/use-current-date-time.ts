import { useEffect, useState } from 'react';

function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatNow(now: Date): string {
  const weekday = capitalize(
    new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(now),
  );
  const date = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(now);
  const time = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);

  return `${weekday}, ${date} - ${time}`;
}

export function useCurrentDateTime() {
  const [formatted, setFormatted] = useState(() => formatNow(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFormatted(formatNow(new Date()));
    }, 30_000);

    return () => window.clearInterval(timer);
  }, []);

  return formatted;
}

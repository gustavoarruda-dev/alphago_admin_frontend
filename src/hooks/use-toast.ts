import { useEffect, useState } from 'react';

export type ToastVariant = 'default' | 'success' | 'destructive';

export type ToastItem = {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
};

type ToastOptions = Omit<ToastItem, 'id'> & {
  durationMs?: number;
};

type UseToastReturn = {
  toasts: ToastItem[];
  toast: (opts: ToastOptions) => string;
  dismiss: (id: string) => void;
};

const DEFAULT_DURATION_MS = 4500;

let memoryState: ToastItem[] = [];
const listeners = new Set<(toasts: ToastItem[]) => void>();
const timersById = new Map<string, number>();

function emit() {
  for (const l of listeners) l(memoryState);
}

function createId(): string {
  return Math.random().toString(36).slice(2);
}

export function dismiss(id: string): void {
  const t = timersById.get(id);
  if (typeof t === 'number') window.clearTimeout(t);
  timersById.delete(id);

  memoryState = memoryState.filter((x) => x.id !== id);
  emit();
}

/**
 * Global toast dispatcher (can be used outside React components).
 */
export function toast(opts: ToastOptions): string {
  const id = createId();
  const next: ToastItem = {
    id,
    title: opts.title,
    description: opts.description,
    variant: opts.variant ?? 'default',
  };

  memoryState = [...memoryState, next];
  emit();

  const duration = typeof opts.durationMs === 'number' ? opts.durationMs : DEFAULT_DURATION_MS;
  const timer = window.setTimeout(() => dismiss(id), duration);
  timersById.set(id, timer);

  return id;
}

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<ToastItem[]>(() => memoryState);

  useEffect(() => {
    listeners.add(setToasts);
    return () => {
      listeners.delete(setToasts);
    };
  }, []);

  return { toasts, toast, dismiss };
}


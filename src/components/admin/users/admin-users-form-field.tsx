import type { HTMLInputTypeAttribute } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type AdminUsersFormFieldSurfaceProps = {
  children: React.ReactNode;
  className?: string;
};

export function AdminUsersFormFieldSurface({
  children,
  className,
}: AdminUsersFormFieldSurfaceProps) {
  return (
    <div
      className={cn(
        'group relative flex h-[66px] w-full items-center overflow-hidden rounded-[999px]',
        'border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_24px_rgba(0,0,0,0.18)]',
        'before:pointer-events-none before:absolute before:inset-[1px] before:rounded-[999px] before:border before:border-white/6',
        'after:pointer-events-none after:absolute after:left-4 after:right-4 after:top-0 after:h-px after:bg-[linear-gradient(90deg,rgba(120,110,255,0),rgba(103,90,255,0.9),rgba(120,110,255,0))] after:opacity-85',
        className,
      )}
    >
      <div className="absolute inset-y-3 left-0 w-20 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.06),transparent_72%)] opacity-60" />
      <div className="absolute inset-y-4 right-0 w-24 bg-[radial-gradient(circle_at_right,rgba(110,80,255,0.12),transparent_72%)] opacity-70" />
      <div className="relative z-10 flex w-full items-center">{children}</div>
    </div>
  );
}

export function AdminUsersSelectPopoverSurface({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[24px] border border-white/12',
        'bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-[30px]',
        'before:pointer-events-none before:absolute before:inset-[1px] before:rounded-[23px] before:border before:border-white/6',
        'after:pointer-events-none after:absolute after:left-5 after:right-5 after:top-0 after:h-px after:bg-[linear-gradient(90deg,rgba(120,110,255,0),rgba(103,90,255,0.9),rgba(120,110,255,0))] after:opacity-85',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-y-3 left-0 w-24 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_72%)] opacity-70" />
      <div className="pointer-events-none absolute inset-y-4 right-0 w-28 bg-[radial-gradient(circle_at_right,rgba(110,80,255,0.14),transparent_72%)] opacity-80" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function AdminUsersTextField({
  placeholder,
  value,
  onChange,
  type = 'text',
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute;
}) {
  return (
    <label>
      <AdminUsersFormFieldSurface>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-full w-full bg-transparent px-8 text-[15px] font-medium text-foreground outline-none placeholder:text-foreground/80 dark:text-white dark:placeholder:text-white"
        />
      </AdminUsersFormFieldSurface>
    </label>
  );
}

export function AdminUsersSelectField({
  value,
  placeholder,
  onClick,
}: {
  value: string;
  placeholder: string;
  onClick?: () => void;
}) {
  return (
    <AdminUsersFormFieldSurface>
      <button
        type="button"
        onClick={onClick}
        className="flex h-full w-full items-center justify-between bg-transparent px-8 text-left"
      >
        <span
          className={cn(
            'text-[15px] font-medium',
            value ? 'text-foreground dark:text-white' : 'text-foreground/80 dark:text-white',
          )}
        >
          {value || placeholder}
        </span>
        <ChevronDown className="size-5 text-foreground/70 dark:text-white/75" />
      </button>
    </AdminUsersFormFieldSurface>
  );
}

export function AdminUsersFormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0.01))] px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-7">
      <h3 className="text-[16px] font-semibold text-foreground dark:text-white">
        {title}
      </h3>
      <p className="mt-1 text-[12px] text-foreground/60 dark:text-white/50">
        {description}
      </p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

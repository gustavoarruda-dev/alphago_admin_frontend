import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AdminBrandMark } from './admin-brand-mark';
import { AdminUserMenu } from './admin-user-menu';

type AdminSectionHeaderProps = {
  currentDateTime: string;
  breadcrumb: Array<{
    label: string;
    current?: boolean;
  }>;
  title: string;
  description: string;
  backTo: string;
  logoLinkTo?: string;
  children?: ReactNode;
};

export function AdminSectionHeader({
  currentDateTime,
  breadcrumb,
  title,
  description,
  backTo,
  logoLinkTo = '/account',
  children,
}: AdminSectionHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="w-full">
      <div className="flex items-center justify-between gap-4">
        <AdminBrandMark logoLinkTo={logoLinkTo} />
        <AdminUserMenu />
      </div>

      <div className="mt-4 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Voltar"
              onClick={() => navigate(backTo)}
              className="inline-flex size-8 items-center justify-center rounded-full border border-black/10 bg-white/80 shadow-[0px_4px_18px_rgba(0,0,0,0.16)] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring/40 dark:border-white/15 dark:bg-white/10 dark:shadow-[0px_4px_18px_rgba(0,0,0,0.35)]"
            >
              <img
                src="/images/arrowleft.svg"
                alt=""
                className="relative size-4 object-contain invert pointer-events-none dark:invert-0"
              />
            </button>

            <div className="flex items-center gap-2 text-[14px] sm:text-[18px]">
              {breadcrumb.map((item, index) => (
                <div key={`${item.label}-${index}`} className="flex items-center gap-2">
                  <span
                    className={
                      item.current
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-500 dark:text-gray-400'
                    }
                  >
                    {item.label}
                  </span>
                  {index < breadcrumb.length - 1 ? (
                    <span className="text-slate-500 dark:text-gray-400">/</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h1 className="text-[18px] font-semibold tracking-normal text-slate-950 dark:text-white sm:text-[22px]">
              {title}
            </h1>
            <p className="mt-1 text-[14px] text-slate-500 dark:text-gray-400 sm:text-[16px]">
              {description}
            </p>
          </div>

          {children ? <div className="mt-5">{children}</div> : null}
        </div>

        <span className="pt-1 text-right text-[14px] text-slate-500 dark:text-gray-400 sm:text-[16px] xl:pt-[3.6rem]">
          {currentDateTime}
        </span>
      </div>
    </header>
  );
}

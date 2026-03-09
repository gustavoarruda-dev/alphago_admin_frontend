import { AdminBrandMark } from './admin-brand-mark';
import { AdminUserMenu } from './admin-user-menu';

export function AdminPageHeader({
  currentDateTime,
}: {
  currentDateTime: string;
}) {
  return (
    <header>
      <div className="flex justify-between items-center w-full gap-3">
        <AdminBrandMark logoLinkTo="/account" />
        <AdminUserMenu />
      </div>

      <div className="flex items-center gap-3 sm:gap-6 mt-2">
        <button
          type="button"
          aria-label="Voltar"
          className="mb-10 inline-flex size-8 items-center justify-center rounded-full border border-black/10 bg-white/80 shadow-[0px_4px_18px_rgba(0,0,0,0.16)] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring/40 dark:border-white/15 dark:bg-white/10 dark:shadow-[0px_4px_18px_rgba(0,0,0,0.35)]"
        >
          <img
            src="/images/arrowleft.svg"
            alt=""
            className="relative size-4 object-contain pointer-events-none invert dark:invert-0"
          />
        </button>

        <div className="mb-10 flex items-center gap-2 text-[14px] sm:text-[18px]">
          <span className="text-slate-500 dark:text-gray-400">Configurações</span>
          <span className="text-slate-500 dark:text-gray-400">/</span>
          <span className="text-slate-900 dark:text-white">Minha Conta</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-1 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-slate-950 dark:text-white text-[18px] sm:text-[22px] font-semibold tracking-normal truncate">
            Minha Conta
          </span>
        </div>

        <span className="text-slate-500 dark:text-gray-400 text-[14px] sm:text-[16px] text-right">
          {currentDateTime}
        </span>
      </div>

      <p className="flex text-slate-500 dark:text-gray-400 text-[14px] sm:text-[18px] mb-4">
        Selecione a função que deseja configurar
      </p>
    </header>
  );
}

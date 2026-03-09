import { useNavigate } from 'react-router-dom';
import { AdminBrandMark } from '@/components/admin/admin-brand-mark';
import { AdminUserMenu } from '@/components/admin/admin-user-menu';
import { ButtonBorder } from '@/components/ui/button-border';
import {
  ADMIN_DASHBOARD_TABS,
  type AdminDashboardFilterItem,
  type AdminDashboardTabId,
} from '@/data/admin-dashboard';
import { AdminDashboardFilterSummary } from './admin-dashboard-filter-summary';

type AdminDashboardHeaderProps = {
  activeTab: AdminDashboardTabId;
  currentDateTime: string;
  filterItems: AdminDashboardFilterItem[];
  renderFilterPopoverContent: (state: { isOpen: boolean }) => React.ReactNode;
  onTabChange: (tab: AdminDashboardTabId) => void;
};

export function AdminDashboardHeader({
  activeTab,
  currentDateTime,
  filterItems,
  renderFilterPopoverContent,
  onTabChange,
}: AdminDashboardHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="w-full">
      <div className="flex items-center justify-between gap-4">
        <AdminBrandMark logoLinkTo="/dashboard" />
        <AdminUserMenu />
      </div>

      <div className="mt-4 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Voltar"
              onClick={() => navigate('/settings/account')}
              className="inline-flex size-8 items-center justify-center rounded-full border border-black/10 bg-white/80 shadow-[0px_4px_18px_rgba(0,0,0,0.16)] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring/40 dark:border-white/15 dark:bg-white/10 dark:shadow-[0px_4px_18px_rgba(0,0,0,0.35)]"
            >
              <img
                src="/images/arrowleft.svg"
                alt=""
                className="relative size-4 object-contain invert pointer-events-none dark:invert-0"
              />
            </button>

            <div className="flex items-center gap-2 text-[14px] sm:text-[18px]">
              <span className="text-slate-500 dark:text-gray-400">Minha Conta</span>
              <span className="text-slate-500 dark:text-gray-400">/</span>
              <span className="text-slate-900 dark:text-white">Dashboard</span>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="text-[18px] font-semibold tracking-normal text-slate-950 dark:text-white sm:text-[22px]">
              Dashboard
            </h1>
            <p className="mt-1 text-[14px] text-slate-500 dark:text-gray-400 sm:text-[16px]">
              Acompanhe visualmente a performance da plataforma
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {ADMIN_DASHBOARD_TABS.map((tab) => (
              <ButtonBorder
                key={tab.id}
                type="button"
                className="h-9 px-5 text-[13px]"
                isActive={activeTab === tab.id}
                disabled={tab.disabled}
                onClick={() => {
                  if (tab.disabled) return;
                  onTabChange(tab.id);
                }}
              >
                {tab.label}
              </ButtonBorder>
            ))}
          </div>
        </div>

        <span className="pt-1 text-right text-[14px] text-slate-500 dark:text-gray-400 sm:text-[16px] xl:pt-[3.6rem]">
          {currentDateTime}
        </span>
      </div>

      <div className="mt-8">
        <AdminDashboardFilterSummary
          items={filterItems}
          renderFilterPopoverContent={renderFilterPopoverContent}
        />
      </div>
    </header>
  );
}

import { CardGradient } from '@/components/ui/card-gradient';
import type { AdminHomeSection } from '@/data/admin-account-sections';
import { AdminDashboardTile } from './admin-dashboard-tile';

export function AdminSettingsSectionCard({ section }: { section: AdminHomeSection }) {
  return (
    <CardGradient className="mb-1 w-full">
      <div className="size-full p-4 sm:pl-8 flex flex-col">
        <h2 className="text-[24px] mb-2 text-foreground">{section.title}</h2>
        {section.subtitle ? <p className="text-foreground">{section.subtitle}</p> : null}

        <div
          data-testid="dashboard-section-tiles"
          className="my-5 w-full grid grid-cols-2 min-[420px]:grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-start sm:gap-6"
        >
          {section.items.map((item) => (
            <AdminDashboardTile key={`${section.title}-${item.label}`} item={item} />
          ))}
        </div>
      </div>
    </CardGradient>
  );
}

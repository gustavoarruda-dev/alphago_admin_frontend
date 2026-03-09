import { useMemo, useState } from 'react';
import { Check, Search } from 'lucide-react';
import { AdminShell } from '@/components/admin/admin-shell';
import { AdminSectionHeader } from '@/components/admin/admin-section-header';
import { AdminFeaturesCategoryCard } from '@/components/admin/features/admin-features-category-card';
import { AdminFeaturesCategorySelect } from '@/components/admin/features/admin-features-category-select';
import { AdminFeaturesPageSkeleton } from '@/components/admin/features/admin-features-page-skeleton';
import { ButtonBorder } from '@/components/ui/button-border';
import {
  ADMIN_FEATURE_CATEGORY_OPTIONS,
  ADMIN_FEATURE_STATUS_OPTIONS,
  ADMIN_FEATURES_CATEGORIES,
} from '@/data/admin-features';
import { useCurrentDateTime, useToast, useTransientLoading } from '@/hooks';
import { cn } from '@/lib/utils';

export function AdminFeaturesPage() {
  const currentDateTime = useCurrentDateTime();
  const isLoading = useTransientLoading();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas as categorias');
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos os status');
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategoryId, setExpandedCategoryId] = useState('communication');

  const filteredCategories = useMemo(() => {
    return ADMIN_FEATURES_CATEGORIES.filter((category) => {
      if (
        selectedCategory !== 'Todas as categorias' &&
        category.label !== selectedCategory
      ) {
        return false;
      }

      if (!category.rows.length) return true;

      const matchesRows = category.rows.filter((row) => {
        const matchesStatus =
          selectedStatus === 'Todos os status' ||
          row.statusLabel === selectedStatus;
        const matchesPremium = !premiumOnly || row.premium;
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const matchesSearch =
          normalizedSearch.length === 0 ||
          row.name.toLowerCase().includes(normalizedSearch);

        return matchesStatus && matchesPremium && matchesSearch;
      });

      return matchesRows.length > 0;
    }).map((category) => ({
      ...category,
      rows: category.rows.filter((row) => {
        const matchesStatus =
          selectedStatus === 'Todos os status' || row.statusLabel === selectedStatus;
        const matchesPremium = !premiumOnly || row.premium;
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const matchesSearch =
          normalizedSearch.length === 0 ||
          row.name.toLowerCase().includes(normalizedSearch);

        return matchesStatus && matchesPremium && matchesSearch;
      }),
    }));
  }, [premiumOnly, searchTerm, selectedCategory, selectedStatus]);

  if (isLoading) {
    return <AdminFeaturesPageSkeleton />;
  }

  return (
    <AdminShell activeSidebarItem="features">
      <section className="w-full max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-16">
        <AdminSectionHeader
          currentDateTime={currentDateTime}
          breadcrumb={[
            { label: 'Minha Conta' },
            { label: 'Funcionalidades', current: true },
          ]}
          title="Funcionalidades"
          description="Cadastre e organize as funcionalidades disponíveis"
          backTo="/settings/account"
          logoLinkTo="/dashboard"
        />

        <div className="mt-6 rounded-[22px] card-gradient-bg p-6 sm:p-7">
          <div>
            <h2 className="text-[20px] font-semibold text-foreground dark:text-white">
              Catálogo de Funcionalidades
            </h2>
            <p className="mt-1 text-[12px] text-foreground/60 dark:text-white/50">
              Configure as funcionalidades ativas e sua prioridade de exibição
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <AdminFeaturesCategorySelect
                value={selectedCategory}
                options={ADMIN_FEATURE_CATEGORY_OPTIONS}
                onChange={setSelectedCategory}
              />
              <AdminFeaturesCategorySelect
                value={selectedStatus}
                options={ADMIN_FEATURE_STATUS_OPTIONS}
                onChange={setSelectedStatus}
              />

              <button
                type="button"
                role="checkbox"
                aria-checked={premiumOnly}
                onClick={() => setPremiumOnly((current) => !current)}
                className="inline-flex items-center gap-2 text-[11px] text-foreground/55 transition-opacity hover:opacity-90 dark:text-white/45"
              >
                <span
                  className={cn(
                    'inline-flex size-4 items-center justify-center rounded-full border transition-all',
                    premiumOnly
                      ? 'border-[#5E4BFF] bg-[#5E4BFF]/20 text-[#A999FF]'
                      : 'border-white/20 bg-white/5 text-transparent',
                  )}
                >
                  <Check className="size-2.5" />
                </span>
                <span>Somente premium</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label
                className={cn(
                  'relative inline-flex h-9 w-full min-w-[210px] max-w-[220px] items-center overflow-hidden rounded-full border-2 bg-gradient-to-br px-5 text-foreground transition-all shadow-[0px_1.197px_29.915px_0px_rgba(69,42,124,0.10)] backdrop-blur-[35px]',
                  'border-border/40 from-background/40 to-background/10 hover:from-background/55 hover:to-background/20',
                  'dark:border-b-white/20 dark:border-t-white/20 dark:border-r-white/10 dark:border-l-white/10 dark:from-white/10 dark:to-purple-950/15 dark:hover:from-white/20 dark:hover:to-white/4 dark:text-white',
                )}
              >
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Busca rápida"
                  className="h-full w-full bg-transparent pr-8 text-[12px] text-inherit placeholder:text-foreground/60 focus:outline-none dark:placeholder:text-white/55"
                />
                <Search className="pointer-events-none absolute right-4 size-4 text-foreground/60 dark:text-white/55" />
              </label>

              <ButtonBorder
                type="button"
                className="h-9 min-w-[172px] px-5 text-[12px]"
                onClick={() =>
                  toast({
                    title: 'Nova funcionalidade',
                    description: 'O cadastro de nova funcionalidade entra na próxima etapa.',
                  })
                }
              >
                Adicionar Funcionalidade
              </ButtonBorder>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {filteredCategories.map((category) => (
              <AdminFeaturesCategoryCard
                key={category.id}
                category={category}
                expanded={expandedCategoryId === category.id}
                onToggleExpand={() =>
                  setExpandedCategoryId((current) =>
                    current === category.id ? '' : category.id,
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>
    </AdminShell>
  );
}

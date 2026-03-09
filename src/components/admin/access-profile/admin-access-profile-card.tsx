import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, SquarePen, Trash2 } from 'lucide-react';
import { CardGradient } from '@/components/ui/card-gradient';
import { useKeyedTransientLoading } from '@/hooks';
import { cn } from '@/lib/utils';
import type {
  AdminAccessPermissionCategory,
  AdminAccessProfile,
} from '@/data/admin-access-profiles';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminAccessProfileEditDialog } from './admin-access-profile-edit-dialog';
import { AdminAccessProfileDeleteDialog } from './admin-access-profile-delete-dialog';

function AccessPermissionToggle({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 text-[12px] text-foreground/62 transition-colors hover:text-foreground dark:text-white/52 dark:hover:text-white/72"
    >
      <span
        className={cn(
          'inline-flex size-3.5 items-center justify-center rounded-full border transition-all',
          selected
            ? 'border-[#5340F6]/70 bg-[#5340F6]/15'
            : 'border-white/18 bg-white/5',
        )}
      >
        <span
          className={cn(
            'size-1.5 rounded-full transition-opacity',
            selected ? 'bg-[#5340F6] opacity-100' : 'opacity-0',
          )}
        />
      </span>
      <span>{label}</span>
    </button>
  );
}

function AdminAccessProfileCardSkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-4 w-28 rounded-md" />
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 5 }).map((__, chipIndex) => (
              <Skeleton key={chipIndex} className="h-5 w-[132px] rounded-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function isCategoryFullySelected(
  category: AdminAccessPermissionCategory,
  selectedPermissions: string[],
) {
  return category.permissions.every((permission) =>
    selectedPermissions.includes(permission),
  );
}

export function AdminAccessProfileCard({
  profile,
  expanded,
  onToggleExpand,
  onSaveProfile,
  onDeleteProfile,
}: {
  profile: AdminAccessProfile;
  expanded: boolean;
  onToggleExpand: () => void;
  onSaveProfile: (profile: AdminAccessProfile) => void;
  onDeleteProfile: (profileId: string) => void;
}) {
  const [selectedPermissions, setSelectedPermissions] = useState(
    profile.selectedPermissions,
  );
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const loadingKey = JSON.stringify({
    profileId: profile.id,
    selectedCount: profile.selectedPermissions.length,
  });
  const isLoading = useKeyedTransientLoading(loadingKey);

  useEffect(() => {
    setSelectedPermissions(profile.selectedPermissions);
  }, [profile.selectedPermissions]);

  const totalPermissions = useMemo(
    () => profile.categories.flatMap((category) => category.permissions),
    [profile.categories],
  );

  const allSelected = totalPermissions.every((permission) =>
    selectedPermissions.includes(permission),
  );

  const handleTogglePermission = (permission: string) => {
    setSelectedPermissions((current) =>
      current.includes(permission)
        ? current.filter((item) => item !== permission)
        : [...current, permission],
    );
  };

  const handleToggleCategory = (category: AdminAccessPermissionCategory) => {
    const categoryFullySelected = isCategoryFullySelected(category, selectedPermissions);

    setSelectedPermissions((current) => {
      if (categoryFullySelected) {
        return current.filter((permission) => !category.permissions.includes(permission));
      }

      return Array.from(new Set([...current, ...category.permissions]));
    });
  };

  const handleToggleAll = () => {
    setSelectedPermissions(allSelected ? [] : totalPermissions);
  };

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={onToggleExpand}
        className="flex h-auto w-full items-center justify-between rounded-[18px] border border-white/10 card-gradient-bg px-5 py-4 text-left"
      >
        <span className="text-[16px] text-foreground dark:text-white">{profile.name}</span>
        <div className="flex items-center gap-3 text-foreground/60 dark:text-white/60">
          <SquarePen className="size-4" />
          <Trash2 className="size-4" />
          <ChevronDown className="size-4" />
        </div>
      </button>
    );
  }

  return (
    <CardGradient className="rounded-[22px] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[18px] font-medium text-foreground dark:text-white">
          {profile.name}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Editar perfil ${profile.name}`}
            onClick={() => setEditDialogOpen(true)}
            className="inline-flex size-7 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-white/10 hover:text-foreground dark:text-white/55 dark:hover:text-white"
          >
            <SquarePen className="size-4" />
          </button>
          <button
            type="button"
            aria-label={`Excluir perfil ${profile.name}`}
            onClick={() => setDeleteDialogOpen(true)}
            className="inline-flex size-7 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-white/10 hover:text-foreground dark:text-white/55 dark:hover:text-white"
          >
            <Trash2 className="size-4" />
          </button>
          <button
            type="button"
            aria-label={`Recolher perfil ${profile.name}`}
            onClick={onToggleExpand}
            className="inline-flex size-7 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-white/10 hover:text-foreground dark:text-white/55 dark:hover:text-white"
          >
            <ChevronUp className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0.01))] px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-5">
        <div>
          <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground dark:text-white">
            Funcionalidades
          </h4>
          <p className="mt-1 text-[12px] leading-5 text-foreground/60 dark:text-white/46">
            Selecione as funcionalidades que estarão disponíveis neste perfil de acesso
          </p>
        </div>

        <div className="mt-5">
          {isLoading ? (
            <AdminAccessProfileCardSkeleton />
          ) : (
            <div className="space-y-5">
              <div>
                <AccessPermissionToggle
                  label="Selecionar todas as funcionalidades"
                  selected={allSelected}
                  onToggle={handleToggleAll}
                />
              </div>

              {profile.categories.map((category) => {
                const categoryFullySelected = isCategoryFullySelected(
                  category,
                  selectedPermissions,
                );

                return (
                  <div key={category.id}>
                    <h5 className="text-[13px] font-semibold text-foreground dark:text-white">
                      {category.label}
                    </h5>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-3">
                      <AccessPermissionToggle
                        label="Selecionar todos"
                        selected={categoryFullySelected}
                        onToggle={() => handleToggleCategory(category)}
                      />

                      {category.permissions.map((permission) => (
                        <AccessPermissionToggle
                          key={permission}
                          label={permission}
                          selected={selectedPermissions.includes(permission)}
                          onToggle={() => handleTogglePermission(permission)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <AdminAccessProfileEditDialog
        profile={profile}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={onSaveProfile}
      />
      <AdminAccessProfileDeleteDialog
        profile={profile}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirmDelete={() => onDeleteProfile(profile.id)}
      />
    </CardGradient>
  );
}

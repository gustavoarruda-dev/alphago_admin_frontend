import { useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { AdminSectionHeader } from '@/components/admin/admin-section-header';
import { AdminAccessProfileCard } from '@/components/admin/access-profile/admin-access-profile-card';
import { AdminAccessProfileCreateDialog } from '@/components/admin/access-profile/admin-access-profile-create-dialog';
import { AdminAccessProfilePageSkeleton } from '@/components/admin/access-profile/admin-access-profile-page-skeleton';
import { ButtonBorder } from '@/components/ui/button-border';
import { ADMIN_ACCESS_PROFILES } from '@/data/admin-access-profiles';
import { useCurrentDateTime, useToast, useTransientLoading } from '@/hooks';

export function AdminAccessProfilePage() {
  const currentDateTime = useCurrentDateTime();
  const isLoading = useTransientLoading();
  const { toast } = useToast();
  const [expandedProfileId, setExpandedProfileId] = useState('manager');
  const [profiles, setProfiles] = useState(ADMIN_ACCESS_PROFILES);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  if (isLoading) {
    return <AdminAccessProfilePageSkeleton />;
  }

  return (
    <AdminShell activeSidebarItem="access">
      <section className="w-full max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-16">
        <AdminSectionHeader
          currentDateTime={currentDateTime}
          breadcrumb={[
            { label: 'Minha Conta' },
            { label: 'Perfil de Acesso', current: true },
          ]}
          title="Perfil de Acesso"
          description="Configure os níveis e funcionalidades para os diferentes perfis de acesso"
          backTo="/settings/account"
          logoLinkTo="/dashboard"
        />

        <div className="mt-6 rounded-[22px] card-gradient-bg p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[20px] font-semibold text-foreground dark:text-white">
                Nível de Acesso
              </h2>
              <p className="mt-1 text-[13px] leading-5 text-foreground/60 dark:text-white/50">
                Configure os níveis e funcionalidades para os diferentes perfis de acesso
              </p>
            </div>

            <ButtonBorder
              type="button"
              className="h-9 min-w-[174px] px-5 text-[12px]"
              onClick={() => setCreateDialogOpen(true)}
            >
              Incluir Novo Perfil de Acesso
            </ButtonBorder>
          </div>

          <div className="mt-6 space-y-3">
            {profiles.map((profile) => (
              <AdminAccessProfileCard
                key={profile.id}
                profile={profile}
                expanded={expandedProfileId === profile.id}
                onToggleExpand={() =>
                  setExpandedProfileId((current) =>
                    current === profile.id ? '' : profile.id,
                  )
                }
                onSaveProfile={(updatedProfile) => {
                  setProfiles((current) =>
                    current.map((item) =>
                      item.id === updatedProfile.id ? updatedProfile : item,
                    ),
                  );
                  toast({
                    title: 'Perfil atualizado',
                    description: `As permissões de ${updatedProfile.name} foram atualizadas.`,
                  });
                }}
                onDeleteProfile={(profileId) => {
                  const deletedProfile = profiles.find((item) => item.id === profileId);
                  setProfiles((current) =>
                    current.filter((item) => item.id !== profileId),
                  );
                  setExpandedProfileId((current) =>
                    current === profileId ? '' : current,
                  );
                  toast({
                    title: 'Perfil excluído',
                    description: `O perfil ${deletedProfile?.name ?? 'selecionado'} foi removido da lista.`,
                  });
                }}
              />
            ))}
          </div>
        </div>

        <AdminAccessProfileCreateDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onCreate={(profile) => {
            setProfiles((current) => [profile, ...current]);
            setExpandedProfileId(profile.id);
            toast({
              title: 'Perfil criado',
              description: `O perfil ${profile.name} foi adicionado à lista.`,
            });
          }}
        />
      </section>
    </AdminShell>
  );
}

export default AdminAccessProfilePage;

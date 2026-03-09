import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AdminPageSkeleton } from '@/components/admin/admin-page-skeleton';
import { AdminDashboardPageSkeleton } from '@/components/admin/dashboard/admin-dashboard-page-skeleton';
import { AdminBillingPageSkeleton } from '@/components/admin/billing/admin-billing-page-skeleton';
import { AdminFeaturesPageSkeleton } from '@/components/admin/features/admin-features-page-skeleton';
import { AdminUsersPageSkeleton } from '@/components/admin/users/admin-users-page-skeleton';
import { AdminAccessProfilePageSkeleton } from '@/components/admin/access-profile/admin-access-profile-page-skeleton';
import { AdminPlansPageSkeleton } from '@/components/admin/plans/admin-plans-page-skeleton';

const AccountSettingsPageLazy = lazy(() =>
  import('@/pages/account-settings/account-settings-page').then((module) => ({
    default: module.AccountSettingsPage,
  })),
);

const AdminDashboardPageLazy = lazy(() =>
  import('@/pages/dashboard/admin-dashboard-page').then((module) => ({
    default: module.AdminDashboardPage,
  })),
);

const AdminBillingPageLazy = lazy(() =>
  import('@/pages/billing/admin-billing-page').then((module) => ({
    default: module.AdminBillingPage,
  })),
);

const AdminUsersPageLazy = lazy(() =>
  import('@/pages/users-admin/admin-users-page').then((module) => ({
    default: module.AdminUsersPage,
  })),
);

const AdminFeaturesPageLazy = lazy(() =>
  import('@/pages/features/admin-features-page').then((module) => ({
    default: module.AdminFeaturesPage,
  })),
);

const AdminAccessProfilePageLazy = lazy(() =>
  import('@/pages/access-profile/admin-access-profile-page').then((module) => ({
    default: module.AdminAccessProfilePage,
  })),
);

const AdminPlansPageLazy = lazy(() =>
  import('@/pages/plans/admin-plans-page').then((module) => ({
    default: module.AdminPlansPage,
  })),
);

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/settings/account"
        element={
          <Suspense fallback={<AdminPageSkeleton />}>
            <AccountSettingsPageLazy />
          </Suspense>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<AdminDashboardPageSkeleton />}>
            <AdminDashboardPageLazy />
          </Suspense>
        }
      />
      <Route
        path="/billing"
        element={
          <Suspense fallback={<AdminBillingPageSkeleton />}>
            <AdminBillingPageLazy />
          </Suspense>
        }
      />
      <Route
        path="/users-admin"
        element={
          <Suspense fallback={<AdminUsersPageSkeleton />}>
            <AdminUsersPageLazy />
          </Suspense>
        }
      />
      <Route
        path="/features"
        element={
          <Suspense fallback={<AdminFeaturesPageSkeleton />}>
            <AdminFeaturesPageLazy />
          </Suspense>
        }
      />
      <Route
        path="/access-profile"
        element={
          <Suspense fallback={<AdminAccessProfilePageSkeleton />}>
            <AdminAccessProfilePageLazy />
          </Suspense>
        }
      />
      <Route
        path="/plans"
        element={
          <Suspense fallback={<AdminPlansPageSkeleton />}>
            <AdminPlansPageLazy />
          </Suspense>
        }
      />
      <Route
        path="/settings/account/dashboard"
        element={<Navigate to="/dashboard" replace />}
      />
      <Route
        path="/settings/account/billing"
        element={<Navigate to="/billing" replace />}
      />
      <Route
        path="/settings/account/users-admin"
        element={<Navigate to="/users-admin" replace />}
      />
      <Route
        path="/settings/account/features"
        element={<Navigate to="/features" replace />}
      />
      <Route
        path="/settings/account/access-profile"
        element={<Navigate to="/access-profile" replace />}
      />
      <Route
        path="/settings/account/plans"
        element={<Navigate to="/plans" replace />}
      />
      <Route path="/" element={<Navigate to="/settings/account" replace />} />
      <Route path="*" element={<Navigate to="/settings/account" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

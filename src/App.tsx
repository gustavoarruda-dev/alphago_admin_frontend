import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AdminPageSkeleton } from '@/components/admin/admin-page-skeleton';
import { AdminDashboardPageSkeleton } from '@/components/admin/dashboard/admin-dashboard-page-skeleton';
import { AdminBillingPageSkeleton } from '@/components/admin/billing/admin-billing-page-skeleton';

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
        path="/settings/account/dashboard"
        element={<Navigate to="/dashboard" replace />}
      />
      <Route
        path="/settings/account/billing"
        element={<Navigate to="/billing" replace />}
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

import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/query-client';
import { AccountSettingsPage } from './account-settings-page';

describe('AccountSettingsPage', () => {
  it('renders the account settings landing page modules', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ToastProvider>
              <AccountSettingsPage />
              <Toaster />
              <ToastViewport />
            </ToastProvider>
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Minha conta' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Faturamento').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Usuários Adm').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Perfil de Acesso').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Planos').length).toBeGreaterThan(0);
  });
});

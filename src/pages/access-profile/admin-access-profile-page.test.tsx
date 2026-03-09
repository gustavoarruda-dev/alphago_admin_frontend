import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/query-client';
import { AdminAccessProfilePage } from './admin-access-profile-page';

describe('AdminAccessProfilePage', () => {
  it('renders the mocked access profile page', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ToastProvider>
              <AdminAccessProfilePage />
              <Toaster />
              <ToastViewport />
            </ToastProvider>
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', { name: 'Perfil de Acesso' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Nível de Acesso' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Manager')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /selecionar todas as funcionalidades/i }),
    ).toBeInTheDocument();
  });
});

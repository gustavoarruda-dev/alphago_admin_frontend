import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/query-client';
import { AdminFeaturesPage } from './admin-features-page';

describe('AdminFeaturesPage', () => {
  it('renders the mocked features catalog page', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ToastProvider>
              <AdminFeaturesPage />
              <Toaster />
              <ToastViewport />
            </ToastProvider>
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Funcionalidades' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Catálogo de Funcionalidades')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Adicionar Funcionalidade' })).toBeInTheDocument();
    expect(screen.getByText('Comunicação')).toBeInTheDocument();
    expect(screen.getByText('Clipping')).toBeInTheDocument();

    const search = screen.getByPlaceholderText('Busca rápida');
    await user.type(search, 'Google Search');

    expect(screen.getByText('Google Search')).toBeInTheDocument();
    expect(screen.queryByText('Clipping')).not.toBeInTheDocument();
  });
});

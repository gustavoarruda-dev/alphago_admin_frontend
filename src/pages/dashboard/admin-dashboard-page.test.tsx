import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/query-client';
import { AdminDashboardPage } from './admin-dashboard-page';

describe('AdminDashboardPage', () => {
  it('renders the mocked admin dashboard', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ToastProvider>
              <AdminDashboardPage />
              <Toaster />
              <ToastViewport />
            </ToastProvider>
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Dashboard' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Assinantes' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Assinantes' }),
    ).toHaveClass('button-border--active');
    expect(screen.getByText('Custo dos Últimos 90 Dias')).toBeInTheDocument();
    expect(screen.getByText('Custo Excedente em Novembro')).toBeInTheDocument();
    expect(screen.getByText('Consumo Tokens Diário por IA')).toBeInTheDocument();
    expect(screen.getByText('Evolução de Consumo de Tokens por IA')).toBeInTheDocument();
    expect(screen.getByText('Custos Excedente Diário por IA')).toBeInTheDocument();
    expect(screen.getByText('Custos Excedente Mensal por IA')).toBeInTheDocument();
    expect(screen.getByText('Evolução de Custo Excedente por IA')).toBeInTheDocument();

    await user.click(screen.getByTestId('admin-dashboard-filters-open'));

    expect(screen.getByRole('dialog', { name: 'Filtros' })).toBeInTheDocument();
    expect(screen.getAllByText('Período analisado').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Comparação').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Não comparar' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(
      screen.getByRole('button', { name: 'Aplicar filtro' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Limpar filtro' }),
    ).toBeInTheDocument();
  });

  it('shows the current cards only for the assinantes tab', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ToastProvider>
              <AdminDashboardPage />
              <Toaster />
              <ToastViewport />
            </ToastProvider>
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    const agentsButton = screen.getByRole('button', { name: 'Agentes' });
    const subscribersButton = screen.getByRole('button', { name: 'Assinantes' });
    const consumptionAuditButton = screen.getByRole('button', {
      name: 'Auditoria de Consumo',
    });

    expect(subscribersButton).toHaveClass('button-border--active');
    expect(agentsButton).not.toHaveClass('button-border--active');
    expect(agentsButton).toBeDisabled();
    expect(consumptionAuditButton).not.toHaveClass('button-border--active');
    expect(screen.getByText('Custo dos Últimos 90 Dias')).toBeInTheDocument();

    await user.click(consumptionAuditButton);

    expect(consumptionAuditButton).toHaveClass('button-border--active');
    expect(agentsButton).not.toHaveClass('button-border--active');
    expect(subscribersButton).not.toHaveClass('button-border--active');
    expect(
      screen.getByRole('heading', { level: 2, name: 'Auditoria de Consumo' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Lista de Consumo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Data \/ Hora/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Modelo/i })).toBeInTheDocument();
    expect(
      screen.getAllByText(/claude-4.5-opus-high-thinking|gpt-4.1-turbo/i).length,
    ).toBeGreaterThan(0);

    await user.click(screen.getByTestId('admin-dashboard-filters-open'));

    expect(
      screen.getByRole('dialog', { name: 'Selecionar Periodo' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Automático' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Manual' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Claude' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Gemini' })).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/query-client';
import { AdminBillingPage } from './admin-billing-page';

describe('AdminBillingPage', () => {
  it('renders the mocked billing page', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ToastProvider>
              <AdminBillingPage />
              <Toaster />
              <ToastViewport />
            </ToastProvider>
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Faturamento' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Consumo Excedente do Mês Atual')).toBeInTheDocument();
    expect(screen.getByText('Consumo Excedente')).toBeInTheDocument();
    expect(screen.getByText('Evolução de Custo Excedente por IA')).toBeInTheDocument();
    expect(screen.getByText('Lista de Faturas')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Revisar Plano Anual' })).toBeInTheDocument();

    await user.click(screen.getByTestId('billing-invoices-filters-open'));

    expect(
      screen.getByRole('dialog', { name: 'Selecionar Período' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Tipo de status' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Tipo de pagamento' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aplicar filtros' })).toBeInTheDocument();
  });

  it('filters invoices by quick search', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ToastProvider>
              <AdminBillingPage />
              <Toaster />
              <ToastViewport />
            </ToastProvider>
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    const search = screen.getByPlaceholderText('Busca rápida');
    await user.type(search, '0102030405060717');

    expect(screen.getByText('0102030405060717')).toBeInTheDocument();
    expect(screen.queryByText('0102030405060708')).not.toBeInTheDocument();
  });

  it('filters invoices by selected status', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ToastProvider>
              <AdminBillingPage />
              <Toaster />
              <ToastViewport />
            </ToastProvider>
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    await user.click(screen.getByTestId('billing-invoices-filters-open'));
    await user.click(screen.getByRole('button', { name: 'Tipo de status' }));
    await user.click(screen.getByRole('button', { name: 'Alta usage' }));
    await user.click(screen.getByRole('button', { name: 'Aplicar filtros' }));

    expect(screen.getByText('0102030405060709')).toBeInTheDocument();
    expect(screen.queryByText('0102030405060708')).not.toBeInTheDocument();
    expect(screen.queryByText('0102030405060717')).not.toBeInTheDocument();
  });

  it('opens the invoice details modal for the selected row', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ToastProvider>
              <AdminBillingPage />
              <Toaster />
              <ToastViewport />
            </ToastProvider>
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    await user.click(
      screen.getByRole('button', { name: 'Visualizar fatura 0102030405060708' }),
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Detalhes da Transação')).toBeInTheDocument();
    expect(screen.queryByText('Joao Henrique Costa')).not.toBeInTheDocument();
    expect(screen.getByText('Maria Ines Sanchez')).toBeInTheDocument();
    expect(screen.getByText('34546578956922')).toBeInTheDocument();
  });
});

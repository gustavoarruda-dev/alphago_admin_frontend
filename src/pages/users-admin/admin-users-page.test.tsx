import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/query-client';
import { AdminUsersPage } from './admin-users-page';

describe('AdminUsersPage', () => {
  it('renders the mocked admin users page', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ToastProvider>
              <AdminUsersPage />
              <Toaster />
              <ToastViewport />
            </ToastProvider>
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Usuários Administrativos' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Lista de Usuários Admin')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Incluir Novo Usuário' })).toBeInTheDocument();
    expect(screen.getByText('Usuário Admin 01')).toBeInTheDocument();
    expect(screen.getAllByText('Super Admin').length).toBeGreaterThan(0);

    const search = screen.getByPlaceholderText('Busca rápida');
    await user.type(search, 'Usuário Admin 02');

    expect(screen.getByText('Usuário Admin 02')).toBeInTheDocument();
    expect(screen.queryByText('Usuário Admin 01')).not.toBeInTheDocument();

    await user.clear(search);
    await user.click(screen.getByRole('button', { name: 'Incluir Novo Usuário' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Incluir Novo Usuário' }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite aqui o nome')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Selecione o perfil de acesso' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Fechar modal de criação de usuário' }));
    await user.click(screen.getByRole('button', { name: 'Editar Usuário Admin 01' }));

    expect(
      screen.getByRole('heading', { level: 2, name: 'Editar Usuário' }),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue('Usuário Admin 01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('usuario@email.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Super Admin' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Fechar modal de criação de usuário' }));
    await user.click(
      screen.getByRole('button', { name: 'Redefinir senha de Usuário Admin 01' }),
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Alterar Senha' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Usuário Admin 01').length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText('Digite aqui a nova senha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Repita a nova senha')).toBeInTheDocument();
  });
});

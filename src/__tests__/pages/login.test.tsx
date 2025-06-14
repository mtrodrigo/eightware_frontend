// src/__tests__/pages/login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@/app/page';
import { Context } from '@/context/UserContext';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockLogin = jest.fn();
const mockLogout = jest.fn();
const mockContextValue = {
  login: mockLogin,
  authenticated: false,
  isLoading: false,
  logout: mockLogout,
};

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve manter os valores dos campos após digitação', async () => {
    render(
      <Context.Provider value={mockContextValue}>
        <Login />
      </Context.Provider>
    );

    const emailInput = screen.getByPlaceholderText('exemplo@exemplo.com.br');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');

    await userEvent.type(emailInput, 'teste@teste.com');
    await userEvent.type(passwordInput, 'senha123');

    expect(emailInput).toHaveValue('teste@teste.com');
    expect(passwordInput).toHaveValue('senha123');
  });

  it('deve permitir digitação nos campos de entrada', async () => {
    render(
      <Context.Provider value={mockContextValue}>
        <Login />
      </Context.Provider>
    );

    const emailInput = screen.getByPlaceholderText('exemplo@exemplo.com.br');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('deve exibir mensagens de erro quando os campos estão inválidos', async () => {
    render(
      <Context.Provider value={mockContextValue}>
        <Login />
      </Context.Provider>
    );

    const submitButton = screen.getByRole('button', { name: /acessar/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(/Campo email é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/Campo senha é obrigatório/i)).toBeInTheDocument();
  });
});
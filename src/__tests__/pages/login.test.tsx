// __tests__/Login.test.tsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Login from '@/app/page'

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('Componente de Login', () => {
  beforeEach(() => {
    render(<Login />)
  })

  it('deve mostrar erros de validação quando o formulário é enviado vazio', async () => {
    const submitButton = screen.getByRole('button', { name: 'Acessar' })
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
      expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
    })
  })

  it('não deve mostrar erros de validação quando o formulário é preenchido corretamente', async () => {
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Senha')
    const submitButton = screen.getByRole('button', { name: 'Acessar' })

    fireEvent.change(emailInput, { target: { value: 'valido@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'senhavalida' } })
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText('Email é obrigatório')).not.toBeInTheDocument()
      expect(screen.queryByText('Senha é obrigatória')).not.toBeInTheDocument()
    })
  })

  it('deve enviar o formulário com dados válidos', async () => {
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Senha')
    const submitButton = screen.getByRole('button', { name: 'Acessar' })

    fireEvent.change(emailInput, { target: { value: 'teste@exemplo.com' } })
    fireEvent.change(passwordInput, { target: { value: 'senha123' } })
    userEvent.click(submitButton)
  })

  it('deve validar o formato do email corretamente', async () => {
    const emailInput = screen.getByLabelText('Email')
    const submitButton = screen.getByRole('button', { name: 'Acessar' })

    fireEvent.change(emailInput, { target: { value: 'email@incompleto' } })
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
    })
  })

  it('deve permitir o envio do formulário sem erros com credenciais válidas', async () => {
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Senha')
    const submitButton = screen.getByRole('button', { name: 'Acessar' })

    fireEvent.change(emailInput, { target: { value: 'usuario@valido.com' } })
    fireEvent.change(passwordInput, { target: { value: 'senhasegura123' } })
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText('Email inválido')).not.toBeInTheDocument()
      expect(screen.queryByText('Senha é obrigatória')).not.toBeInTheDocument()
    })
  })
})
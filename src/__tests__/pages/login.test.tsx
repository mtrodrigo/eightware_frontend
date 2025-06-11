import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Login from '@/app/page'

describe('Componente de Login', () => {
  it('deve manter os valores dos campos após digitação', async () => {
    render(<Login />)
    expect(screen.getByRole('heading')).toBeInTheDocument();
    
    const emailInput = screen.getByPlaceholderText('exemplo@exemplo.com.br')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    
    await userEvent.type(emailInput, 'usuario@teste.com')
    await userEvent.type(passwordInput, 'senha123')
    
    expect(emailInput).toHaveValue('usuario@teste.com')
    expect(passwordInput).toHaveValue('senha123')
  })

  it('deve permitir digitação nos campos de entrada', async () => {
    render(<Login />)
    
    const emailInput = screen.getByPlaceholderText('exemplo@exemplo.com.br')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    
    await userEvent.type(emailInput, 'teste@email.com')
    await userEvent.type(passwordInput, '123456')
    
    expect(emailInput).toHaveValue('teste@email.com')
    expect(passwordInput).toHaveValue('123456')
  })

  it('deve exibir mensagens de erro quando os campos estão inválidos', async () => {
    render(<Login />)
    
    const submitButton = screen.getByRole('button', { name: 'Acessar' })
    await userEvent.click(submitButton)
    
    expect(await screen.findByText('Preecha o email')).toBeInTheDocument()
    expect(await screen.findByText('Preecha a senha')).toBeInTheDocument()
  })
})
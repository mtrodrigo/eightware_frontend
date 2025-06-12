# Eightware Frontend

Este projeto é o frontend do teste técnico Eightware. **Antes de instalar e configurar o frontend, é obrigatório instalar e configurar o backend**.

## Pré-requisitos

- Node.js (versão recomendada: 18.x ou superior)
- npm, yarn, etc.
- Backend Eightware configurado e em execução

## Tecnologias utilizadas

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Jest 
- Testing Library 
- React Hook Form 
- Zod 
- Axios 
- React Hot Toast

## Passos para Instalação

### 1. Instale e configure o backend

> **Atenção:** O frontend depende do backend. Siga as instruções do repositório do backend para instalar e rodar o servidor antes de continuar.

Repositório do backend: https://github.com/mtrodrigo/eightware_backend.git

### 2. Clone este repositório

```bash
git clone https://github.com/mtrodrigo/eightware_frontend.git
cd eightware_frontend
```

### 3. Instale as dependências

Com npm:

```bash
npm install
```

### 4. Execute o projeto

Com npm:

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`.

### 5. Executando os testes

Para rodar todos os testes unitários e de componentes, utilize:

```bash
npm test
```

Para rodar os testes em modo observação (watch):

```bash
npm run test:watch
```

Para rodar os testes com saída detalhada (verbose):

```bash
npm run test:verbose
```

## Observações

- Certifique-se de que o backend está rodando antes de acessar o frontend.
- Para dúvidas sobre o backend, consulte o README do repositório correspondente.

## Criado por

Rodrigo Marques Tavares
- **Email:** rodrigour@gmail.com
- **WhatsApp:** (35) 98406-1841
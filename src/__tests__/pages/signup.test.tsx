// src/__tests__/components/Signup.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "@/app/signup/page";
import { fetchAddressByCep } from "@/services/cepService";
import api from '@/utils/api';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

jest.mock('@/services/cepService');
jest.mock('@/utils/api');
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockFetchAddress = fetchAddressByCep as jest.MockedFunction<typeof fetchAddressByCep>;
const mockApi = api as jest.Mocked<typeof api>;

describe("Signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchAddress.mockResolvedValue({
      cep: "01001000",
      logradouro: "Rua Teste",
      complemento: "",
      bairro: "Teste",
      localidade: "São Paulo",
      uf: "SP",
    });
  });

  it("deve preencher automaticamente endereço ao digitar CEP válido", async () => {
    const user = userEvent.setup();
    render(<Signup />);

    const cepInput = screen.getByPlaceholderText(
      "Digite o cep, apenas números"
    );
    await userEvent.type(cepInput, "01001000");

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Rua, Avenida ...")).toHaveValue(
        "Rua Teste"
      );
      expect(screen.getByPlaceholderText("Cidade")).toHaveValue("São Paulo");
      expect(screen.getByPlaceholderText("Ex. SP")).toHaveValue("SP");
    });
  });

  it("deve mostrar erro ao digitar CEP inválido", async () => {
    mockFetchAddress.mockRejectedValue(new Error("CEP inválido"));
    render(<Signup />);

    const cepInput = screen.getByPlaceholderText("Digite o cep, apenas números");
    await userEvent.type(cepInput, "00000000");

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Rua, Avenida ...")).toHaveValue("");
      expect(cepInput).toHaveFocus();
    });
  });

  it("deve validar campos obrigatórios", async () => {
    render(<Signup />);

    const submitButton = screen.getByRole("button", { name: "Cadastrar" });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Preencha o nome")).toBeInTheDocument();
      expect(screen.getByText("Preencha o email")).toBeInTheDocument();
    expect(screen.getByText("Preencha a senha")).toBeInTheDocument();
    expect(screen.getByText("Confirme a senha")).toBeInTheDocument();
    expect(screen.getByText("CPF deve ter 11 números")).toBeInTheDocument();
    expect(screen.getByText("CEP deve conter 8 números")).toBeInTheDocument();
    expect(screen.getByText("Preencha o endereço")).toBeInTheDocument();
    expect(screen.getByText("Preencha o número")).toBeInTheDocument();
    expect(screen.getByText("Preencha a cidade")).toBeInTheDocument();
    expect(screen.getByText("Estado deve ter exatamente 2 caracteres")).toBeInTheDocument();
    });
  });

 it("deve enviar formulário com dados válidos", async () => {
  mockApi.post.mockResolvedValueOnce({ data: { success: true } });

  render(<Signup />);

  await userEvent.type(screen.getByPlaceholderText("Digite seu nome"), "Teste da Silva");
  await userEvent.type(screen.getByPlaceholderText("exemplo@exemplo.com.br"), "teste@teste.com");
  await userEvent.type(screen.getByPlaceholderText("Digite sua senha"), "senha123");
  await userEvent.type(screen.getByPlaceholderText("Confirme sua senha"), "senha123");
  await userEvent.type(screen.getByPlaceholderText("000.000.000-00"), "11144477735");
  await userEvent.type(screen.getByPlaceholderText("Digite o cep, apenas números"), "01001000");
  
  await waitFor(() => {
    expect(screen.getByPlaceholderText("Rua, Avenida ...")).toHaveValue("Rua Teste");
    expect(screen.getByPlaceholderText("Cidade")).toHaveValue("São Paulo");
    expect(screen.getByPlaceholderText("Ex. SP")).toHaveValue("SP");
  });

  await userEvent.type(screen.getByPlaceholderText("Número"), "123");

  await userEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

  await waitFor(() => {
    expect(mockApi.post).toHaveBeenCalledWith("/users/signup", expect.objectContaining({
      name: "Teste da Silva",
      email: "teste@teste.com",
      password: "senha123",
      confirmpassword: "senha123",
      cpf: "11144477735",
      zipcode: "01001000",
      address: "Rua Teste",
      number: "123",
      city: "São Paulo",
      state: "SP",
    }));
  });
});
});

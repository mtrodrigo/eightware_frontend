import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Profile from "@/app/profile/page";
import { useRouter } from "next/navigation";
import { Context } from "@/context/UserContext";
import api from "@/utils/api";
import toast from "react-hot-toast";

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/utils/api");
jest.mock("react-hot-toast");

const mockContextValue = {
  authenticated: false,
};

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

describe("Componente Profile - testes do useEffect", () => {
  const mockRouter = {
    replace: jest.fn(),
    push: jest.fn(),
  };
  const mockApiGet = api.get as jest.Mock;
  const mockToastError = toast.error as jest.Mock;
  const useContextMock = React.useContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    localStorage.clear();
    useContextMock.mockImplementation(() => mockContextValue);
  });

  it("deve redirecionar para home se não estiver autenticado", async () => {
    render(<Profile />);

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith("/");
    });
  });

  it("deve redirecionar e mostrar toast se não encontrar token", async () => {
    useContextMock.mockImplementation(() => ({
      ...mockContextValue,
      authenticated: true,
    }));

    render(<Profile />);

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        "Não autorizado, faça o login!"
      );
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  it("deve buscar dados do usuário quando autenticado e com token válido", async () => {
    useContextMock.mockImplementation(() => ({
      ...mockContextValue,
      authenticated: true,
    }));

    localStorage.setItem("teste_eightware", JSON.stringify("mock-token"));

    const mockUserData = {
      user: {
        name: "Teste da Silva",
        email: "teste@teste.com",
        cpf: "12345678901",
        address: "Rua Teste",
        number: "123",
        city: "São Paulo",
        state: "SP",
        zipcode: "12345678",
      },
    };
    mockApiGet.mockResolvedValue({ data: mockUserData });

    render(<Profile />);

    await waitFor(() => {
      expect(mockApiGet).toHaveBeenCalledWith("users/me", {
        headers: {
          Authorization: "Bearer mock-token",
        },
      });
    });
  });

  it("deve lidar com erros da API e mostrar toast de erro", async () => {
    useContextMock.mockImplementation(() => ({
      ...mockContextValue,
      authenticated: true,
    }));

    localStorage.setItem("teste_eightware", JSON.stringify("mock-token"));

    mockApiGet.mockRejectedValue(new Error("Erro na API"));

    render(<Profile />);

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith("Erro ao carregar os dados");
    });
  });

  it("deve buscar dados apenas uma vez devido ao useRef", async () => {
    useContextMock.mockImplementation(() => ({
      ...mockContextValue,
      authenticated: true,
    }));

    localStorage.setItem("teste_eightware", JSON.stringify("mock-token"));

    const mockUserData = {
      user: {
        name: "Teste da Silva",
        email: "teste@teste.com",
        cpf: "12345678901",
        address: "Rua Teste",
        number: "123",
        city: "São Paulo",
        state: "SP",
        zipcode: "12345678",
      },
    };
    mockApiGet.mockResolvedValue({ data: mockUserData });

    const { rerender } = render(<Profile />);

    rerender(<Profile />);

    await waitFor(() => {
      expect(mockApiGet).toHaveBeenCalledTimes(1);
    });
  });
});

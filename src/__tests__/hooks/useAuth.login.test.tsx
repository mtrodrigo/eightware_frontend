// src/__tests__/hooks/useAuth.test.ts
import { renderHook, act } from "@testing-library/react";
import useAuth from "@/hooks/useAuth";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

jest.mock("@/utils/api");
jest.mock("next/navigation");
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const mockPush = jest.fn();
const mockApi = api as jest.Mocked<typeof api>;
const mockUseRouter = useRouter as jest.Mock;
const mockToast = toast as jest.Mocked<typeof toast>;

describe("useAuth hook", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    localStorage.clear();
    jest.clearAllMocks();
  });

  it("deve fazer login com sucesso e redirecionar para /profile", async () => {
    mockApi.post.mockResolvedValueOnce({
      data: { token: "token123" },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        email: "teste@teste.com",
        password: "senha123",
      });
    });

    expect(mockApi.post).toHaveBeenCalledWith("/users/login", {
      email: "teste@teste.com",
      password: "senha123",
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "teste_eightware",
      JSON.stringify("token123")
    );

    expect(mockApi.defaults.headers.Authorization).toBe("Bearer token123");

    expect(mockPush).toHaveBeenCalledWith("/profile");

    expect(mockToast.success).toHaveBeenCalledWith(
      "Login realizado com sucesso!"
    );
  });

  it("deve lidar com erro de login com mensagem específica", async () => {
    mockApi.post.mockRejectedValueOnce({
      response: {
        data: {
          message: "Credenciais inválidas",
        },
      },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        email: "erro@teste.com",
        password: "erro123",
      });
    });

    expect(mockToast.error).toHaveBeenCalledWith("Credenciais inválidas");

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("deve usar mensagem padrão quando não há mensagem específica", async () => {
    mockApi.post.mockRejectedValueOnce(new Error("Erro genérico"));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        email: "teste@teste.com",
        password: "senha123",
      });
    });

    expect(mockToast.error).toHaveBeenCalledWith("Usuário ou senha incorretos");
  });
});

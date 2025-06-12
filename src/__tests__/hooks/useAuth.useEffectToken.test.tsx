// tests/authEffect.test.ts
import { renderHook } from "@testing-library/react";
import { useEffect, useState } from "react";
import api from "@/utils/api";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

const mockAtob = (encoded: string) => {
  const agora = Date.now() / 1000;

  if (encoded === "valido24h") {
    return JSON.stringify({
      exp: agora + 86400,
      iat: agora,
    });
  }

  if (encoded === "expirado24h") {
    return JSON.stringify({
      exp: agora - 86400,
      iat: agora - 172800,
    });
  }

  throw new Error("Token inválido");
};

jest.mock("@/utils/api", () => ({
  defaults: {
    headers: {
      Authorization: "",
    },
  },
}));

describe("Teste do useEffect de autenticação com token", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
    Object.defineProperty(window, "atob", {
      value: mockAtob,
    });
  });

  beforeEach(() => {
    localStorage.clear();
    api.defaults.headers.Authorization = "";
  });

  it("deve autenticar quando o token tem menos de 24h de validade", () => {
    const token24hValido = "header.valido24h.signature";
    localStorage.setItem("teste_eightware", JSON.stringify(token24hValido));

    const { result } = renderHook(() => {
      const [autenticado, setAutenticado] = useState(false);
      useEffect(() => {
        const token = localStorage.getItem("teste_eightware");
        if (token) {
          try {
            const parsedToken = JSON.parse(token);
            api.defaults.headers.Authorization = `Bearer ${parsedToken}`;
            const payload = JSON.parse(atob(parsedToken.split(".")[1]));
            if (payload.exp && Date.now() / 1000 < payload.exp) {
              setAutenticado(true);
            } else {
              localStorage.removeItem("teste_eightware");
              setAutenticado(false);
            }
          } catch {
            localStorage.removeItem("teste_eightware");
            setAutenticado(false);
          }
        }
      }, []);
      return autenticado;
    });

    expect(result.current).toBe(true);
    expect(api.defaults.headers.Authorization).toBe(`Bearer ${token24hValido}`);
    expect(localStorage.getItem("teste_eightware")).toBe(
      JSON.stringify(token24hValido)
    );
  });

  it("deve desautenticar quando o token passou de 24h de validade", () => {
    const token24hExpirado = "header.expirado24h.signature";
    localStorage.setItem("teste_eightware", JSON.stringify(token24hExpirado));

    const { result } = renderHook(() => {
      const [autenticado, setAutenticado] = useState(false);
      useEffect(() => {
        const token = localStorage.getItem("teste_eightware");
        if (token) {
          try {
            const parsedToken = JSON.parse(token);
            api.defaults.headers.Authorization = `Bearer ${parsedToken}`;
            const payload = JSON.parse(atob(parsedToken.split(".")[1]));
            if (payload.exp && Date.now() / 1000 < payload.exp) {
              setAutenticado(true);
            } else {
              localStorage.removeItem("teste_eightware");
              setAutenticado(false);
            }
          } catch {
            localStorage.removeItem("teste_eightware");
            setAutenticado(false);
          }
        }
      }, []);
      return autenticado;
    });

    expect(result.current).toBe(false);
    expect(localStorage.getItem("teste_eightware")).toBeNull();
  });
});

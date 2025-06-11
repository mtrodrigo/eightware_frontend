"use client";

import { LoginFormData } from "@/schema/loginSchema";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("teste_eightware");
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        api.defaults.headers.Authorization = `Bearer ${parsedToken}`;
        const payload = JSON.parse(atob(parsedToken.split(".")[1]));
        if (payload.exp && Date.now() / 1000 < payload.exp) {
          setAuthenticated(true);
        } else {
          localStorage.removeItem("teste_eightware");
          setAuthenticated(false);
        }
      } catch {
        localStorage.removeItem("teste_eightware");
        setAuthenticated(false);
      }
    }
  }, []);

  const login = async (user: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    const msgText = "Login realizado com sucesso!";

    try {
      const response = await api.post("/users/login", user);
      const { token } = response.data;

      localStorage.setItem("teste_eightware", JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;

      setAuthenticated(true);
      toast.success(msgText);

      router.push("/me");
    } catch (err) {
      const apiError = err as ApiError;
      let errorMessage = "Usuário ou senha incorretos";

      if (apiError.response?.data?.message) {
        errorMessage = apiError.response.data.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Erro de autenticação:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("teste_eightware");
    delete api.defaults.headers.Authorization;
    setAuthenticated(false);
    router.push("/");
    toast.success("Logout realizado com sucesso");
  };

  return {
    authenticated,
    login,
    logout,
    isLoading,
    error,
  };
}

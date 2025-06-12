"use client";

import api from "@/utils/api";
import { useContext, useEffect, useRef, useState } from "react";
import { SignupFormData } from "@/schema/signupSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Context } from "@/context/UserContext";

export default function Profile() {
  const [user, setUser] = useState<SignupFormData>();
  const [isLoading, setIsLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const { authenticated } = useContext(Context);
  const router = useRouter();
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        if (!authenticated) {
          setRedirecting(true)
          router.replace("/");
          return;
        }

        const token = localStorage.getItem("teste_eightware");

        if (!token) {
          toast.error("Não autorizado, faça o login!");
          router.push("/");
          return;
        }

        const response = await api.get("users/me", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Erro ao carregar os dados: ", error);
        toast.error("Erro ao carregar os dados");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [authenticated, router]);

  if (isLoading || redirecting) {
    return (
      <main className="w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-500 border-solid"></div>
      </main>
    );
  }

  return (
    <main className="w-full flex items-center justify-center">
      <section className="bg-slate-300 max-w-xs w-full rounded-md drop-shadow-xl py-8">
        <h1 className="text-2xl text-center font-bold mb-2">Seus dados:</h1>
        <h2 className="text-xl text-center mb-2 border-b border-b-slate-400 pb-1 shadow-md">
          {user?.name}
        </h2>
        <p className="px-3 py-1 border-b border-b-slate-300 shadow-md">
          Email: {user?.email}
        </p>
        <p className="px-3 py-1 border-b border-b-slate-300 shadow-md">
          CPF: {user?.cpf}
        </p>
        <p className="px-3 py-1 border-b border-b-slate-300 shadow-md">
          Endereço: {user?.address}, nº {user?.number}
        </p>
        <p className="px-3 py-1 border-b border-b-slate-300 shadow-md">
          Cidade: {user?.city} - {user?.state}
        </p>
        <p className="px-3 py-1 border-b border-b-slate-400 shadow-md">
          CEP: {user?.zipcode}
        </p>
      </section>
    </main>
  );
}

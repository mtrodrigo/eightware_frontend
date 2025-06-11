"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schema/loginSchema";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const { login, authenticated, isLoading } = useContext(Context);

  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (authenticated) {
      setRedirecting(true);
      router.replace("/profile");
    }
  }, [authenticated, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      console.error("Erro no login: ", error);
    }
  };

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
        <h1 className="text-2xl font-bold text-center mb-3">Faça o login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full px-5 flex flex-col items-center justify-center gap-5"
        >
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="exemplo@exemplo.com.br"
            register={register}
            error={errors.email?.message}
          />
          <Input
            label="Senha"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            register={register}
            error={errors.password?.message}
          />
          <div className="my-5">
            <Button type="submit" text="Acessar" disabled={isLoading}/>
          </div>
        </form>
        <p className="text-center">
          Não tem cadastro?{" "}
          <Link className="text-blue-700" href="/signup">
            Clique AQUI
          </Link>
        </p>
      </section>
    </main>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/schema/signupSchema";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Link from "next/link";
import { fetchAddressByCep } from "@/services/cepService";
import { useContext, useEffect, useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { Context } from "@/context/UserContext";
import toast from "react-hot-toast";

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function Signup() {
  const { authenticated } = useContext(Context);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (authenticated) {
      setIsLoading(true);
      router.replace("/profile");
    }
  }, [authenticated, router]);

  const cep = watch("zipcode");

  useEffect(() => {
    const cleanedCep = cep?.replace(/\D/g, "");
    if (cleanedCep?.length !== 8) return;

    async function loadAddress() {
      try {
        const address = await fetchAddressByCep(cleanedCep);

        setValue("address", address.logradouro, { shouldValidate: true });
        setValue("city", address.localidade, { shouldValidate: true });
        setValue("state", address.uf, { shouldValidate: true });

        if (address.logradouro === "") {
          setFocus("address");
          return;
        }
        setFocus("number");
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
        setValue("address", "");
        setValue("city", "");
        setValue("state", "");
        setFocus("zipcode");
      }
    }

    loadAddress();
  }, [cep, setValue, setFocus]);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await api.post("/users/signup", data);
      toast.success("Cadastro realizado com sucesso!");
      router.push("/");
    } catch (err) {
      const apiError = err as ApiError;
      let errorMessage = "Erro ao castrar";

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

  if (isLoading) {
    return (
      <main className="w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-500 border-solid"></div>
      </main>
    );
  }

  return (
    <main className="w-full flex items-center justify-center">
      <section className="bg-slate-300 max-w-xs w-full rounded-md drop-shadow-xl py-8">
        <h1 className="text-2xl font-bold text-center mb-3">
          Faça seu cadastro
        </h1>
        <form
          aria-label="Formulário de cadastro"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full px-5 flex flex-col items-center justify-center gap-5"
        >
          <Input
            label="Nome"
            type="text"
            name="name"
            placeholder="Digite seu nome"
            register={register}
            error={errors.name?.message}
          />
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
          <Input
            label="Confirme sua senha"
            type="password"
            name="confirmpassword"
            placeholder="Confirme sua senha"
            register={register}
            error={errors.confirmpassword?.message}
          />
          <Input
            label="CPF"
            type="text"
            name="cpf"
            placeholder="000.000.000-00"
            register={register}
            error={errors.cpf?.message}
          />
          <Input
            label="CEP"
            type="text"
            name="zipcode"
            placeholder="Digite o cep, apenas números"
            register={register}
            error={errors.zipcode?.message}
          />
          <div className="flex gap-3 w-full">
            <div className="flex-1">
              <Input
                label="Endereço"
                type="text"
                name="address"
                placeholder="Rua, Avenida ..."
                register={register}
                error={errors.address?.message}
              />
            </div>
            <div className="w-20">
              <Input
                label="Número"
                type="text"
                name="number"
                placeholder="Número"
                register={register}
                error={errors.number?.message}
              />
            </div>
          </div>
          <div className="flex gap-3 w-full">
            <div className="flex-1">
              <Input
                label="Cidade"
                type="text"
                name="city"
                placeholder="Cidade"
                register={register}
                error={errors.city?.message}
              />
            </div>
            <div className="w-20">
              <Input
                label="Estado"
                type="text"
                name="state"
                placeholder="Ex. SP"
                register={register}
                error={errors.state?.message}
              />
            </div>
          </div>
          <div className="my-5">
            <Button type="submit" text="Cadastrar" />
          </div>
        </form>
        <p className="text-center">
          Já tem cadastro?{" "}
          <Link className="text-blue-700" href="/">
            Clique AQUI
          </Link>
        </p>
      </section>
    </main>
  );
}

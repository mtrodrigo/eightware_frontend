// loginSchema.ts
import { z } from "zod";
import { isValidCPF } from "@/services/verifyCpf";

export const signupSchema = z
  .object({
    name: z.string().min(1, "Preencha o nome"),
    email: z.string().min(1, "Preencha o email").email("Email inválido"),
    password: z.string().min(1, "Preencha a senha"),
    confirmpassword: z.string().min(1, "Confirme a senha"),  
    cpf: z.string()
    .min(11, "CPF deve ter 11 números")
    .max(14, "CPF deve ter 11 números")
    .refine((val) => val.replace(/\D/g, '').length === 11, {
      message: "CPF deve conter 11 números"
    })
    .refine(isValidCPF, {
      message: "CPF inválido"
    })
    .transform((val) => val.replace(/\D/g, '')),
    address: z
      .string()
      .min(1, "Preencha o endereço")
      .max(100, "Endereço deve ter no máximo 100 caracteres"),
    number: z
      .string()
      .min(1, "Preencha o número")
      .max(10, "Número deve ter no máximo 10 caracteres"),
    city: z
      .string()
      .min(1, "Preencha a cidade")
      .max(50, "Cidade deve ter no máximo 100 caracteres"),
    state: z.string().length(2, "Estado deve ter exatamente 2 caracteres"),
    zipcode: z
      .string()
      .min(8, "CEP deve conter 8 números")
      .regex(/^\d+$/, "CEP deve conter apenas números"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "A senha e a confirmação de senha são diferentes",
    path: ["confirmpassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

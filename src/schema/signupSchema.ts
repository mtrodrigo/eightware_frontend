// loginSchema.ts
import { z } from "zod";
import { isValidCPF } from "@/services/verifyCpf";

export const signupSchema = z
  .object({
    name: z.string().min(1, "Preecha o nome"),
    email: z.string().min(1, "Preecha o email").email("Email inválido"),
    password: z.string().min(1, "Preecha a senha"),
    confirmpassword: z.string().min(1, "Campo confirmar senha está vazio"),  
    cpf: z.string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(14, "CPF muito longo")
    .refine((val) => val.replace(/\D/g, '').length === 11, {
      message: "CPF deve conter 11 dígitos numéricos"
    })
    .refine(isValidCPF, {
      message: "CPF inválido"
    })
    .transform((val) => val.replace(/\D/g, '')),
    address: z
      .string()
      .min(1, "Preecha o endereço")
      .max(100, "Endereço deve ter no máximo 100 caracteres"),
    number: z
      .string()
      .min(1, "Preecha o número")
      .max(10, "Número deve ter no máximo 10 caracteres"),
    city: z
      .string()
      .min(1, "Preecha a cidade")
      .max(50, "Cidade deve ter no máximo 100 caracteres"),
    state: z.string().length(2, "Estado deve ter exatamente 2 caracteres"),
    zipcode: z
      .string()
      .min(8, "CEP deve conter no mínimo 8 números")
      .regex(/^\d+$/, "CEP deve conter apenas números"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "A senha e a confirmação de senha são diferentes",
    path: ["confirmpassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

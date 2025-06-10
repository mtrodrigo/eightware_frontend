// loginSchema.ts
import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().min(1, "Preecha o email").email("Email inválido"),
  password: z.string().min(1, "Preecha a senha"),
  confirmpassword: z.string().min(1, "Campo confirmar senha está vazio"),
      cpf: z
        .string()
        .length(11, "CPF deve ter 11 dígitos")
        .regex(/^\d+$/, "CPF deve conter apenas números"),
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
        .length(8, "CEP deve ter exatamente 8 dígitos")
        .regex(/^\d+$/, "CEP deve conter apenas números"),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: "A senha e a confirmação de senha são diferentes",
      path: ["confirmpassword"],
})


export type SignupFormData = z.infer<typeof signupSchema>;
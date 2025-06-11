// loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Campo email é obrigatório").email("Email inválido"),
  password: z.string().min(1, "Campo senha é obrigatório"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
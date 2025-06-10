// loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Preecha o email").email("Email inválido"),
  password: z.string().min(1, "Preecha a senha"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
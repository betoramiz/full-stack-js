import z from 'zod';


export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterCommand = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginCommand = z.infer<typeof loginSchema>;
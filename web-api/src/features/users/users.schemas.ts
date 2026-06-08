import z from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export type CreateUserCommand = z.infer<typeof CreateUserSchema>;

export const getByIdSchema = z.object({
  id: z.uuid()
});

export type GetByIdCommand = z.infer<typeof getByIdSchema>;
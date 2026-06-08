import { fail } from "@shared/result.ts";
import { AppError } from "@shared/errors/AppError.ts";

export const userNotFoundError= (message?: string) => fail(AppError.NotFound( message ?? 'El usuario no existe.'))
export const invalidPassword= fail(AppError.NotFound( 'Password Incorrecto.'))
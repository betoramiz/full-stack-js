import { AppError } from "@shared/errors/AppError.ts";
import { fail } from "@shared/result.ts";

export const userNotFoundError = (message?: string) => fail(AppError.NotFound(message ?? 'User Not Found'));
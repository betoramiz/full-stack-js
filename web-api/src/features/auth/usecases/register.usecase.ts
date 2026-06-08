import type { RegisterCommand } from "../auth.schemas.ts";
import type { AuthQueries } from "../auth.queries.ts";
import { Auth } from "../Auth.ts";
import { fail, ok, type Result } from "@shared/result.ts";
import { AppError } from "@shared/errors/AppError.ts";
import bcrypt from "bcrypt";

export interface RegisterResponse {
  idCreated: string;
}

export class RegisterUseCase {
  constructor(private readonly authQueries: AuthQueries) {}

  async execute(request: RegisterCommand): Promise<Result<RegisterResponse>> {

    const isUniqueEmail = await this.authQueries.isUniqueEmail(request.email);
    if(isUniqueEmail)
      return fail(AppError.Conflict('No se puede registar un email duplicado.'));

    const passwordEncrypted = await bcrypt.hash(request.password, 10);
    const data = Auth.register(request.email, passwordEncrypted);
    if(!data.ok) {
      return fail(data.error);
    }

    const result = await this.authQueries.register(data.value);

    return ok({ idCreated: result });
  }
}
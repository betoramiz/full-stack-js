import { sign } from "hono/jwt";
import type { AuthQueries } from "../auth.queries.ts";
import { invalidPassword, userNotFoundError } from "./errors.ts";
import { ok, type Result } from "@shared/result.ts";
import bcrypt from "bcrypt";
import { envConfig } from "../../../env.config.ts";


export interface LoginResponse {
  token: string;
}

export class LoginUseCase {
  constructor(private readonly authQueries: AuthQueries) {}

  async execute(user: string, password: string): Promise<Result<LoginResponse | null>> {
    const register = await this.authQueries.getByEmail(user);
    if(register === null) {
      return userNotFoundError();
    }

    const isPasswordValid = await bcrypt.compare(password, register.password);
    if(!isPasswordValid) {
      return invalidPassword;
    }

    const payload = {
      sub: register.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
    }
    const token = await sign(payload, envConfig.SECRET, 'HS256');

    return ok({ token });
  }
}
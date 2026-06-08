import { fail, ok, type Result } from "@shared/result.ts";
import { AppError } from "@shared/errors/AppError.ts";

export interface AuthProps {
  email: string;
  password: string;
}

export class Auth {

  constructor(private props: AuthProps) {}

  static register(email: string, password: string): Result<AuthProps> {
    if (!email.length) {
      return fail(AppError.BadRequest("El email es requerido."));
    }

    if (password.length < 6) {
      return fail(AppError.BadRequest("Password inválido, debe tener al menos 6 caracteres."));
    }


    return ok({ email, password });
  }

  reconstitute(props: AuthProps): Auth {
    return new Auth(props);
  }

  toPrimitives(): AuthProps {
    return { ...this.props };
  }
}
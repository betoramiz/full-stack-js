import type { ErrorResponse } from "@shared/errors/ErrorTypes.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { fail, ok, type Result } from "@shared/result.ts";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export class User {
  private constructor(private props: UserProps) {}

  public static create(name: string, email: string, id: string): Result<User, ErrorResponse> {
    if (name.length < 3) {
      return fail(AppError.BadRequest("El nombre debe tener al menos 3 caracteres."));
    }
    return ok(new User({ id, name, email, isActive: true }));
  }

  public static reconstitute(props: UserProps): User {
    return new User(props);
  }

  public toPrimitives(): UserProps {
    return { ...this.props };
  }
}
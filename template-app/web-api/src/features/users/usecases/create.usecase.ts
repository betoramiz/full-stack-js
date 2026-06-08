import { User, type UserProps } from "../User.ts";
import type { ErrorResponse } from "@shared/errors/ErrorTypes.ts";
import { v4 as uuidv4 } from "uuid";
import { type UserQueries } from "../users.queries.ts";
import { fail, ok, type Result } from "@shared/result.ts";
import type { CreateUserCommand } from "../users.schemas.ts";

export class CreateUser {

  constructor(private readonly userQueries: UserQueries) {}

  async execute(command: CreateUserCommand): Promise<Result<UserProps, ErrorResponse>> {
    const userResult = User.create(command.name, command.email, uuidv4());

    if (!userResult.ok) {
      return fail(userResult.error); // Falla la validación de dominio
    }

    const user = userResult.value;
    await this.userQueries.save(user);

    return ok(user.toPrimitives());
  }
}
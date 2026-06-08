import { ok, type Result } from "@shared/result.ts";
import type { ErrorResponse } from "@shared/errors/ErrorTypes.ts";
import { type UserQueries } from "../users.queries.ts";
import type { User } from "../User.ts";
import { userNotFoundError } from "./errors.ts";

export interface Response {
  id: string,
  name: string;
}

export class GetUserById {

  constructor(private readonly userQueries: UserQueries) {}

  async execute(userId: string): Promise<Result<Response, ErrorResponse>> {
    let user: User | null;

    user = await this.userQueries.findById(userId);
    if(user === null)
      return userNotFoundError();

    const { id, name } = user.toPrimitives();
    return ok({ id, name });
  }
}
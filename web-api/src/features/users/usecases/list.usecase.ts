import { type UserQueries } from "../users.queries.ts";

export interface GetListResponse {
  id: string;
  name: string;
  email: string;
}

export class GetList {

  constructor(private readonly userQueries: UserQueries) {}

  async execute(): Promise<GetListResponse[]> {
    let users: GetListResponse[];

    users = await this.userQueries.getAll();
    return users;
  }
}
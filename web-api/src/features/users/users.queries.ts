import { User } from "./User.ts";
import { eq } from "drizzle-orm";
import type { GetListResponse } from "./usecases/list.usecase.ts";
import { type Db } from "@db/connection.ts";
import { usersTable } from "@db/schemas";


export const makeUserQueries = (database : Db) => ({
  getAll: async (): Promise<GetListResponse[]> => {
    return database.select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email
    })
      .from(usersTable);
  },

  save: async (user: User): Promise<void> => {
    const data = user.toPrimitives();
    await database.insert(usersTable)
      .values(data)
      .onConflictDoUpdate({
        target: usersTable.id,
        set: { name: data.name, isActive: data.isActive }
      });
  },

  findById: async (id: string): Promise<User | null> => {
    const [row] = await database.select().from(usersTable).where(eq(usersTable.id, id));
    if (!row) return null;

    return User.reconstitute(row);
  }
})

export type UserQueries = ReturnType<typeof makeUserQueries>;
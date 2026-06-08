import type { Db } from "@db/connection.ts";
import { type authInsert, authTable } from "@db/schemas/auth.schema.ts";
import type { AuthProps } from "./Auth.ts";
import { eq } from "drizzle-orm";
import type { LoginDto } from "./auth.dtos.ts";

const toInsert = (props: AuthProps) : authInsert => ({
  email: props.email,
  password: props.password,
  isActive: true,
});

export const makeAuthQueries = (database: Db) => ({
  isUniqueEmail: async (email: string): Promise<boolean> => {
    const [result] = await database
      .select({
        id: authTable.id,
      })
      .from(authTable)
      .where(eq(authTable.email, email));

    return !!result;
  },

  register: async (props: AuthProps): Promise<string> => {
    const [result] = await database.insert(authTable)
      .values(toInsert(props))
      .returning({ id: authTable.id });

    return result?.id || '';
  },

  getByEmail: async (email: string): Promise<LoginDto | null> => {
    const [result] = await database.select({
      id: authTable.id,
      email  : authTable.email,
      password: authTable.password,
    })
      .from(authTable)
      .where(eq(authTable.email, email));

    return result || null;
  }
})

export type AuthQueries = ReturnType<typeof makeAuthQueries>;
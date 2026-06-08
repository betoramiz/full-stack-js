import { relations } from "drizzle-orm";
import { usersTable } from "@db/schemas/users.schema.ts";
import { authTable } from "@db/schemas/auth.schema.ts";


export const authRelations = relations(authTable, ({ one }) => ({
  user: one(usersTable)
}));

export const userRelations = relations(usersTable, ({ one }) => ({
  auth: one(authTable, {
    fields: [usersTable.authId],
    references: [authTable.id],
  })
}));
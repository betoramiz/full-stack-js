import { pgTable, text, boolean, uuid } from 'drizzle-orm/pg-core';
import { authTable } from "@db/schemas/auth.schema.ts";

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  authId: uuid('auth_id').references(() => authTable.id).unique(),
});
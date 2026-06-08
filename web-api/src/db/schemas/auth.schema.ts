import { pgTable, text, boolean, uuid } from 'drizzle-orm/pg-core';

export const authTable = pgTable('auth', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  isActive: boolean('is_active').notNull(),
});

export type authInsert = typeof authTable.$inferInsert;

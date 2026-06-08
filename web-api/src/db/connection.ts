import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { envConfig } from "../env.config.ts";
import * as schema from "./schemas";

const queryClient = postgres(envConfig.DATABASE_URL, {
   max: 20,
  idle_timeout: 20,
  connect_timeout: 20,
});

export const db = drizzle( queryClient, { schema });

export type Db = typeof db;
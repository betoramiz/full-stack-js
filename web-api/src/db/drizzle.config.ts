import { defineConfig } from 'drizzle-kit';
import { envConfig } from '../env.config.ts';

export default defineConfig({
  out: './src/db/drizzle',
  schema: './src/db/schemas/*.schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: envConfig.DATABASE_URL,
  },
});
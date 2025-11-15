import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema.ts',
  out: './drizzle/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || 'file:../../edgestack.db',
  },
});

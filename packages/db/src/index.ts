import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

export * from './schema';

// Create Turso client
export function createDbClient(url: string, authToken: string) {
  const client = createClient({
    url,
    authToken,
  });

  return drizzle(client, { schema });
}

// Type for the database client
export type DbClient = ReturnType<typeof createDbClient>;

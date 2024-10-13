import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from '$env/static/private';
import type { InferSelectModel } from 'drizzle-orm';

const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });

export const db = drizzle(client, { schema });

// DB TYPES
export type User = InferSelectModel<typeof schema.userTable>;
export type Session = InferSelectModel<typeof schema.sessionTable>;

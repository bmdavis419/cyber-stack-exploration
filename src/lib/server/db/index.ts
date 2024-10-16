import * as schema from './schema';
import { DATABASE_URL } from '$env/static/private';
import type { InferSelectModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(DATABASE_URL, { schema });

// DB TYPES
export type User = InferSelectModel<typeof schema.userTable>;
export type Session = InferSelectModel<typeof schema.sessionTable>;

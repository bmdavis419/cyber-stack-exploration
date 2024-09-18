import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '.';
import { sessionTable, userTable } from './schema';

export const dbAuthAdapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

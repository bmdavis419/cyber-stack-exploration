import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/lib/server/db/schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL ?? 'file:local.db',
		authToken: process.env.DATABASE_AUTH_TOKEN ?? 'N/A'
	}
});

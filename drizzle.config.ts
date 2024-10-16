import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	out: './migrations',
	dbCredentials: {
		url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/cyber_explore'
	}
});

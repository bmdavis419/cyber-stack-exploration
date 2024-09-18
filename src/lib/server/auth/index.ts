import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { dbAuthAdapter } from '../db/auth';

export const lucia = new Lucia(dbAuthAdapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return attributes;
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

// IMPORTANT NOTE: these are based on the drizzle schema, not the underlying DB
// so it is 'providerId' not 'provider_id'
interface DatabaseUserAttributes {
	email: string;
	provider: string;
	providerId: string;
	createdAt: Date;
}

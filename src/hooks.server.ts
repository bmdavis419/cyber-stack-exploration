import {
	deleteSessionTokenCookie,
	getSessionTokenCookie,
	setSessionTokenCookie
} from '$lib/server/auth/cookies';
import { validateSessionToken } from '$lib/server/auth/sessions';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = getSessionTokenCookie(event);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await validateSessionToken(sessionToken);
	if (session !== null) {
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.session = session;
	event.locals.user = user;
	return resolve(event);
};

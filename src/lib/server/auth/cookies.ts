import type { RequestEvent } from '@sveltejs/kit';

export const SESSION_COOKIE_NAME = 'session';

export function getSessionTokenCookie(event: RequestEvent) {
	return event.cookies.get(SESSION_COOKIE_NAME);
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set(SESSION_COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set(SESSION_COOKIE_NAME, '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});
}

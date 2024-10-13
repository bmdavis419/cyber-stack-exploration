import { deleteSessionTokenCookie } from '$lib/server/auth/cookies.js';
import { invalidateSession } from '$lib/server/auth/sessions.js';
import { error, redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const { session } = event.locals;
	if (!session) {
		error(401);
	}

	await Promise.all([deleteSessionTokenCookie(event), invalidateSession(session.id)]);

	return redirect(302, '/');
};

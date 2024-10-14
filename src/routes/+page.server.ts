import { deleteSessionTokenCookie } from '$lib/server/auth/cookies.js';
import { invalidateSession } from '$lib/server/auth/sessions.js';
import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const { user } = locals;

	return { user };
};

export const actions = {
	logout: async (event) => {
		const { session } = event.locals;
		if (!session) {
			error(401);
		}

		await Promise.all([deleteSessionTokenCookie(event), invalidateSession(session.id)]);

		return { success: true };
	}
};

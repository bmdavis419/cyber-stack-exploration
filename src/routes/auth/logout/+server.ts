import { lucia } from '$lib/server/auth';
import { error, redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	if (!event.locals.session) {
		error(401);
	}

	await lucia.invalidateSession(event.locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});

	return redirect(302, '/');
};

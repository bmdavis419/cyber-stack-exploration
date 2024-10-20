import { getOrCreateUserProfile } from "$lib/server/auth/index.js";

export const load = async ({ locals }) => {
	const profile = await getOrCreateUserProfile(locals);

	return { profile };
};

export const actions = {
	logout: async (event) => {
		await event.locals.supabase.auth.signOut();

		return { success: true };
	},
};

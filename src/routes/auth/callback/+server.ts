import { error, redirect } from "@sveltejs/kit";

export const GET = async (event) => {
    const {
        url,
        locals: { supabase },
    } = event;

    // return the user to an error page with instructions
    const code = url.searchParams.get("code") as string;
    const next = url.searchParams.get("next") ?? "/";

    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            throw redirect(303, `/${next.slice(1)}`);
        }
    }

    throw error(400, "Failed to login :(");
};

import { OAuth2RequestError } from 'arctic';
import { github } from '$lib/server/auth/github';
import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';
import { userTable } from '$lib/server/db/schema';

import type { RequestEvent } from '@sveltejs/kit';
import { createSession, generateSessionToken } from '$lib/server/auth/sessions';
import { setSessionTokenCookie } from '$lib/server/auth/cookies';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		const existingUser = await db.query.userTable.findFirst({
			where: and(
				eq(userTable.provider, 'github'),
				eq(userTable.providerId, githubUser.id.toString())
			)
		});

		if (existingUser) {
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, existingUser.id);
			setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} else {
			const githubEmailResponse = await fetch('https://api.github.com/user/emails', {
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`
				}
			});

			const githubEmails: GitHubEmail[] = await githubEmailResponse.json();

			const primaryEmail = githubEmails.find((email) => email.verified && email.primary);

			if (!primaryEmail) {
				throw new Error('No email found from API...');
			}

			const nUser = await db
				.insert(userTable)
				.values({
					provider: 'github',
					providerId: githubUser.id.toString(),
					email: primaryEmail.email
				})
				.returning({ insertedId: userTable.id });

			if (nUser.length === 0) {
				throw new Error('Failed to insert user...');
			}

			const userId = nUser[0].insertedId;

			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, userId);
			setSessionTokenCookie(event, sessionToken, session.expiresAt);
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface GitHubUser {
	id: number;
	login: string;
	// THERE IS MUCH MORE HERE
}

type GitHubEmail = {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: string | null;
};

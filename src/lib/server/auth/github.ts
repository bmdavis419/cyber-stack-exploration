import { GitHub } from 'arctic';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

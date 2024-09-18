# Cyber Stack (name pending) Exploration

This is a sort of brain dump and scratch work repo for getting my ideas down.

## Goals of this stack

- Best way to start a new SvelteKit project
- Simplify and speed up the onboarding to a SvelteKit project
- Modular
- Easy to eject out of the baseline (no annoying deeply baked in shit)
- Extremely easy to build on top of and expand
  - Want to have guides on the docs that go through how to add a ton of things that don't quite fit in the base (rate limiters, image management, etc.)

### Core non-changing pieces

- Sveltekit
- Tailwind
- Bun
- Drizzle (if you have a DB attached)

### Things I would like to modular-ly include

- AUTH: Lucia, Supabase, none
- DATABASE: Supabase, PlanetScale, Turso, none
- DEPLOY: SST, Vercel, Docker, Netlify, none

_NOTE: If you pick lucia for the auth you must pick one of the databases and if you pick supabase auth you must use supabase for the DB. This is a little contrived and maybe could be changed in the future, but it will make things SO much easier._

## Docs guides to add on top of the base

- File uploads (Cloudinary, UploadThing, and Supabase Storage/S3)
- Rate limiting (Upstash)
- Component libraries (Shadcn-svelte and Svelte Animations)
- Heavy API setup (Hono mounted with openapi doc and the rpc client)
- And more!

# This Codebase

This is an example codebase setup with the following:

- CORE: SvelteKit, Tailwind, Bun, and Drizzle
- AUTH: Lucia with a github sign in
- DATABASE: Libsql (Turso)
- DEPLOY: Vercel

## Getting Started

1. Fill in your `.env` based on the `.env.example` (for the github stuff [setup oauth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) and make sure to set the callback url to be: http://localhost:5173/auth/callback/github)
2. Install packages with `bun install`
3. Setup the db with `bun run db:push`
4. Start the server with `bun run dev`

# How this is setup

### Core

- Sveltekit is just a normal create svelte app with prettier, svelte 5 beta, and nothing else (I don't like eslint or testing fight me)
- Tailwind is just a basic config with no extra setup just an `app.css` imported into the layout
- Bun is the package manager
- Drizzle is in the DB (more below)

### Auth

- Auth backbone (not counting using it on a page) touches the following files:
  - `src/lib/server/auth/index.ts`
  - `src/lib/server/auth/github.ts`
  - `src/lib/server/db/auth.ts`
  - `src/routes/auth/callback/github/+server.ts`
  - `src/routes/auth/login/github/+server.ts`
  - `src/routes/auth/logout/+server.ts`
  - `src/app.d.ts`
  - `src/hooks.server.ts`
- Main thing that would need to be very modular is the drizzle db adapter, but that just lives in the `src/lib/server/db/auth.ts` file and can be easily switched based on the chosen DB
- Packages:
  - @lucia-auth/adapter-drizzle
  - arctic
  - lucia (dev)

### DB

- DB backbone (not counting using it on a page) touches the following files:
  - `drizzle.config.ts`
  - `src/lib/server/db/index.ts`
  - `src/lib/server/db/schema.ts`
- Big thing that will need to be swapped out a bunch is the dialect specific stuff in all 3 files
- Packages:
  - drizzle-orm
  - @libsql/client
  - drizzle-kit (dev)

### DEPLOY

- Vercel is the deployment provider here, very simple to use
- Deploy backbone touches the following files:
  - `svelte.config.js`
- Packages
  - @sveltejs/adapter-vercel

# Nova AI Portal (separate project; does not touch your existing Nova project)
Cloudflare Pages + Pages Functions + D1. No build step; plain HTML/JS.

## Pages
`/` landing, `/auth` sign in/up, `/app` dashboard (API routes under `/api/*` enforce auth).

## Setup (beginner steps)
1. `npm install`
2. `npx wrangler d1 create nova-portal-db` -> paste the returned `database_id` into `wrangler.toml`.
3. `npm run db:local`, copy `.dev.vars.example` to `.dev.vars` and fill in values, then `npm run dev`.
4. Production: `npx wrangler pages project create nova-portal`, then `npm run db:remote`.
5. Add secrets to THIS project (secrets are per-project; your existing Nova secret does not carry over):
   `npx wrangler pages secret put GEMINI_API_KEY --project-name nova-portal` (also GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET).
6. Bind D1 as `DB` in Pages > Settings > Bindings (wrangler.toml also declares it).
7. Google OAuth: create a Web OAuth client in Google Cloud; authorized redirect URIs: `https://<your-domain>/api/auth/callback` and `http://localhost:8788/api/auth/callback`.
8. `npm run deploy`.

## Implemented
Landing, auth (email+password PBKDF2, Google OAuth, sessions, sign out), Gemini chat (server-side key, 30s timeout, 15 msg/min limit), persistent chats, chat search, delete API, voice input, security headers.

## Not implemented
R2 uploads/attachments, Library, Tasks, Persona AI (tables exist, no API/UI), Explore, Settings, image generation, web grounding, ZIP/preview of generated projects, text-to-speech, password-reset email, streaming. Sidebar items for these are disabled and marked "Soon".

## Not verified
No live Gemini call, Google OAuth, D1 persistence or deployment has been tested.

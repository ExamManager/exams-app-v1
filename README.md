# ExamManager v1 (deprecated portfolio demo)

Vue 3 exam timer webapp — create timed exams, run the classroom timer, and manage accounts. Express backend with Supabase and Stripe.

**Status:** Deprecated early generation, kept as a public portfolio showcase. Prefer [exams-app-v3](https://github.com/ExamManager/exams-app-v3) for the latest architecture.

## Showcase notes

- **Public pages work** (`/`, `/pricing`, `/privacy`, `/support`, `/docs`, `/demo`, `/free`, `/login`, etc.).
- **Auth / signup are disabled** for this deploy — login UI renders but does not authenticate.
- SPA deep links are handled by root `vercel.json` (static `frontend/dist` + rewrite to `index.html`).

## Stack

- Vue 3, Vite, TypeScript, Tailwind CSS (frontend)
- Express (backend)
- Supabase Auth / database
- Stripe subscriptions
- Yarn / npm

## Structure

```text
frontend/   Vue 3 client
backend/    Express API (Stripe, email, Supabase)
```

## Deploy (Vercel)

Production is a **static Vite SPA**: `vercel.json` builds `frontend/` into `frontend/dist` and rewrites all routes to `index.html` so paths like `/pricing` work.

The Express `backend/` stays in-repo for local use. Auth and billing are disabled for this public portfolio showcase — backend secrets are not required on Vercel.

## Local development

```bash
# Backend
cp backend/.env.example backend/.env
cd backend && npm install && npm run serve

# Frontend (separate terminal)
cd frontend
cp .env.example .env
# set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (optional for public pages)
npm install && npm run dev
```

## Environment

See `backend/.env.example` for Stripe, Supabase, and MessageClient variables. Frontend needs at least:

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL (optional for public pages) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key (optional for public pages) |

Never put a Supabase **service role** key in the frontend.

## Commands

| Location | Command | Purpose |
| --- | --- | --- |
| `backend/` | `npm run serve` | API server |
| `frontend/` | `npm run dev` | Vite dev server |
| `frontend/` | `npm run build` | Production build |

## Related repositories

| Repo | Role |
| --- | --- |
| [exams-landing](https://github.com/ExamManager/exams-landing) | Waitlist / marketing landing |
| [exams-app-v2](https://github.com/ExamManager/exams-app-v2) | Next.js + Prisma exam manager |
| [exams-app-v3](https://github.com/ExamManager/exams-app-v3) | T3 / Drizzle SaaS rewrite |

## License

MIT — see [LICENSE](./LICENSE).

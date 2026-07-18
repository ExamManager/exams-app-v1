# ExamManager v1

Vue 3 exam timer webapp — create timed exams, run the classroom timer, and manage accounts. Express backend with Supabase and Stripe.

This is the earliest ExamManager generation. Prefer [exams-app-v3](https://github.com/ExamManager/exams-app-v3) for the latest architecture.

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

## Deploy (Vercel Services)

This repo is set up as a multi-service Vercel project (`vercel.json`):

- `frontend` — Vite / Vue at `/`
- `backend` — Express at `/api/*`

Production defaults `VITE_API_URL` to `/api` (rewritten to the Express service). Optionally set it explicitly on the frontend service. Backend secrets belong on the backend service only.

## Local development

```bash
# Backend
cp backend/.env.example backend/.env
cd backend && npm install && npm run serve

# Frontend (separate terminal)
cd frontend
cp .env.example .env
# set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm install && npm run dev
```

## Environment

See `backend/.env.example` for Stripe, Supabase, and MessageClient variables. Frontend needs at least:

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |

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

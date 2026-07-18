# ExamManager v1

Vue exam timer app (ExamManager / ExamTimer).

## Related

- [exams-landing](https://github.com/ExamManager/exams-landing)
- [exams-app-v2](https://github.com/ExamManager/exams-app-v2)
- [exams-app-v3](https://github.com/ExamManager/exams-app-v3)

## Structure

- `frontend/` — Vue 3 + Vite + Tailwind client
- `backend/` — Express API (Stripe, email, Supabase)

## Setup

1. Copy `backend/.env.example` to `backend/.env` and fill in values.
2. Add frontend env vars (e.g. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) as needed.
3. Install and run:

```bash
cd backend && npm install && npm run serve
cd frontend && npm install && npm run dev
```

## License

MIT

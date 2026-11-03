# NephChat

A simple guide to kidney health: risk screening, eGFR, education, a CKD diet planner, screening camps, and doctor tools. English and Urdu (RTL).

One Next.js app serves the patient app, the admin portal (`/admin`) and the API. Data lives in PostgreSQL.

## Stack

| Concern | Choice |
| --- | --- |
| App + API | Next.js 16 (App Router, server actions) |
| Database | PostgreSQL via Prisma 6 |
| Auth | Better Auth (email + password, admin plugin for roles) |
| UI | shadcn/ui (Base UI) + Tailwind CSS 4, lucide icons |
| i18n | next-intl (cookie-based locale, `messages/en.json`, `messages/ur.json`) |

## Getting started

Requires Node 20.9+ and PostgreSQL.

```bash
cp .env.example .env        # fill in DATABASE_URL, DIRECT_URL, BETTER_AUTH_SECRET, ADMIN_*
npm install
npm run db:deploy           # apply migrations
npm run db:seed             # load articles + 116 foods, create the first doctor account
npm run dev
```

Open http://localhost:3000 and sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## Roles

- **Patient** (`role = "user"`): open sign-up. Sees and deletes only their own saved results.
- **Doctor** (`role = "admin"`): never self-service. Created by `npm run db:seed` (first account) or by another doctor in **Admin → Users**. Can edit content, manage accounts and use Doctor tools.

The portal shows only aggregate usage counts, never an individual patient's results.

## Where things live

```
prisma/schema.prisma        data model (auth tables, patient results, content)
prisma/seed-data.ts         original articles and food table from the prototype
src/lib/clinical.ts         risk scoring, CKD-EPI 2021, KFRE, diet classification and meal plan
src/actions/                server actions (patient.ts, admin.ts, locale.ts)
src/app/(app)/              patient screens
src/app/(auth)/             sign in / sign up
src/app/admin/              admin portal (English only)
messages/                   UI strings (en, ur)
```

Content edited in the portal (camps, articles, foods) appears in the app immediately. Quiz questions, scoring and clinical reference tables are in code (`src/lib/clinical.ts`, `src/app/(app)/doctor/page.tsx`) because they are tied to the calculations.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` / `start` | Production build / server |
| `npm run db:migrate` | Create a migration after editing the schema (dev) |
| `npm run db:deploy` | Apply migrations (production) |
| `npm run db:seed` | Seed content and first doctor (idempotent; never overwrites portal edits) |
| `npm run typecheck`, `npm run lint` | Checks |

## Deploying

Any Node host with PostgreSQL works (Render, Railway, Fly, a VPS, or Vercel + a managed Postgres such as Neon/Supabase). Set the env vars from `.env.example`, with `BETTER_AUTH_URL` set to the public URL, then run `npm run db:deploy` on release. Turn on automated database backups at the provider and point an uptime check at `/login`.

## Not yet done

- App store packaging (Capacitor shell or PWA wrapper), store assets and listings. A web manifest is already served.
- Legal review of the privacy policy at `/privacy` (current text is a draft).
- Password reset email (needs an email provider).

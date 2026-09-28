# Meika — Deployment Readiness Analysis

> **Status:** Frontend prototype / marketing demo.
> **Verdict:** Builds and runs as a static site. **Not yet a functional product.**
> Every user-facing action is currently simulated client-side. This document lists exactly what exists, what is missing, and what must be added before production deployment.

_Last reviewed: June 2026_

---

## 1. Executive Summary

The Meika codebase is a **Figma Make export** — a polished, animation-rich React + Vite + Tailwind frontend. The UI for every advertised feature exists and looks production-quality. However:

- There is **no live backend**. A complete API service layer was scaffolded against a hypothetical ASP.NET Core server at `http://localhost:5000`, but nothing connects to it.
- **Authentication, file upload, encryption, sharing, payments, and forms are all simulated.**
- Navigation is **in-memory state**, not URL routing — so there are no shareable links, no browser history, and refresh resets the app.
- There is **no SEO, no error boundaries, no tests, and no environment configuration.**

The work remaining is substantial but well-defined. The frontend is a strong foundation; the gap is the entire backend + integration layer.

---

## 2. What Works Today

| Area | State |
| --- | --- |
| Visual design / responsive layout | ✅ Complete |
| Page-to-page navigation (state-based) | ✅ Works in-session |
| Animations & micro-interactions | ✅ Complete |
| Cookie consent banner + cookie policy | ✅ Functional (stores choice in localStorage) |
| Client-side form validation & sanitisation | ✅ Present |
| Client-side rate limiting | ⚠️ Present but resets on refresh (not secure) |
| MeikaDocs / Authenticator demo screens | ✅ Visually interactive (no real data) |

---

## 3. Critical Gaps (Blockers for a Functional Product)

### 3.1 No Backend / Persistence
- **Finding:** `src/app/utils/api-client.ts` defaults to `http://localhost:5000` (env var `VITE_API_BASE_URL` is unset). No request ever reaches a real server.
- `src/app/services/auth.service.ts` is the only service wired to the UI. `payment.service.ts` and `license.service.ts` are **fully written but never imported** — dead code.
- All data is hardcoded (e.g. `MeikaDocsUploadScreen.tsx` fake cloud file counts; `MeikaDocsPage.tsx` hardcoded `connected: true/false`).
- **Needed:**
  - Stand up the real backend (the documented ASP.NET Core API, or Supabase / Node / any provider).
  - Implement and host: user accounts, sessions, file metadata, sharing records, audit logs, licensing, payments.
  - A real database (Postgres/SQL Server) + object storage for files.

### 3.2 Authentication Is Simulated
- **Finding:** `src/app/components/AuthPage.tsx` — `handleLogin`/`handleRegister` call the dead backend, fail, and show an `alert("Demo mode - backend not connected")`. No session is ever created.
- OAuth (Microsoft/Google/GitHub) reads `VITE_AUTH_*_CLIENT_ID` env vars that are unset → always falls into "OAuth not configured" demo path.
- Passkey login is a pure `alert()` describing WebAuthn — **no `navigator.credentials` call exists.**
- **Needed:**
  - Real auth backend issuing JWT/refresh tokens (the api-client already expects `auth_token`/`refresh_token`).
  - Register OAuth apps with each provider; populate client IDs/secrets and redirect URIs.
  - Implement real WebAuthn registration/authentication for passkeys.
  - Move tokens to `httpOnly` cookies (currently planned for `localStorage`, which is XSS-vulnerable).

### 3.3 MeikaDocs Has No Real Functionality
- **Finding:** All of `src/app/pages/MeikaDocsPage.tsx` + `components/MeikaDocs*.tsx` are visual demos.
  - **No cloud SDKs** installed (no Google Drive, Dropbox, OneDrive, Box clients).
  - The "Import" progress bar is a `setInterval` faking progress; the local `<input type="file">` has **no `onChange` handler** — selecting a file does nothing.
  - **No encryption exists** despite "AES-256 / per-file key" marketing copy. The only crypto in the repo is `crypto.getRandomValues()` for token strings.
  - "Was this you?" security alerts and file sharing are hardcoded mock UIs.
- **Needed (to deliver the advertised product):**
  - Integrate each cloud provider's OAuth + file API (Google Drive API, Microsoft Graph, Dropbox API, Box API).
  - Real file upload to object storage (S3/Azure Blob/GCS) with resumable uploads.
  - Real client-side or server-side encryption (Web Crypto `SubtleCrypto` AES-GCM, per-file keys, key management/KMS).
  - Real access-control layer: when a secured file is opened, trigger a genuine push/email/in-app alert and gate access on the owner's response.
  - Real sharing (OrangeDox-style): secure links with expiry, view tracking, revocation — all backed by the database.

### 3.4 Forms Don't Submit
- **Finding:** Contact form (`ContactPage.tsx`) validates then `console.log`s the data — never sends. Several CTAs ("Book a Meeting", "Start Free Vault") have **no `onClick` handler**.
- **Needed:** Wire forms to a real endpoint (backend, or a service like Formspree/Resend/SendGrid for contact + newsletter). Add success/error feedback from the real response.

### 3.5 No URL Routing
- **Finding:** `src/app/App.tsx` uses `useState('home')` + a `switch`. `react-router` v7 is installed **but never used.**
- Consequences: no shareable URLs (everything is `/`), browser back/forward do nothing, **refresh resets to the intro page.**
- **Needed:** Migrate to `react-router` (`<BrowserRouter>`, `<Routes>`, `useNavigate`). Map each page + the overlay flows to real paths. This also unlocks SEO and analytics.

---

## 4. Important Gaps (Should Fix Before Launch)

### 4.1 SEO — Effectively Zero
- No `index.html` in the repo (Figma Make injects the shell). **No `document.title`, meta description, Open Graph, Twitter cards, `robots.txt`, or `sitemap.xml` anywhere.**
- As a state-based SPA with one URL, **no page is individually crawlable/indexable.**
- **Needed:** Real routing (4.5 above) + per-route `<title>`/meta (e.g. `react-helmet-async`), Open Graph images, `robots.txt`, sitemap. For full SEO, consider SSR/SSG (Next.js/Remix/Astro) since this is a marketing site.

### 4.2 No Error Handling Infrastructure
- **No React error boundary** — a render error crashes the whole app to a blank screen.
- **No 404 page** — the routing `default` silently renders the landing page for unknown states.
- **Needed:** Top-level `ErrorBoundary` with a fallback UI; a real NotFound route; consistent loading/error/empty states fed by real API responses; error logging (Sentry or similar).

### 4.3 Security Hardening
- Client-side rate limiters (`utils/security.ts`) reset on refresh and are trivially bypassable — **enforce rate limiting server-side.**
- Plan to store JWTs in `localStorage` is XSS-exposed → prefer `httpOnly` cookies.
- Add: CSP headers, CSRF protection on state-changing requests, input validation **server-side** (client sanitisation is not a security control), secrets in a vault (never in the bundle), dependency vulnerability scan.

### 4.4 Environment Configuration
- **No `.env` file exists.** All `VITE_*` vars are undefined and fall back to dev defaults.
- **Needed:** `.env.example` documenting every variable (`VITE_API_BASE_URL`, `VITE_API_VERSION`, `VITE_AUTH_MICROSOFT_CLIENT_ID`, `VITE_AUTH_GOOGLE_CLIENT_ID`, `VITE_AUTH_GITHUB_CLIENT_ID`, etc.); separate dev/staging/prod configs; CI secret injection.

---

## 5. Engineering / Quality Gaps

| Item | Current state | Needed |
| --- | --- | --- |
| Tests | None (no Jest/Vitest/RTL) | Unit + integration + E2E (Playwright/Cypress) |
| Linting | None (no ESLint/Prettier) | ESLint + Prettier + pre-commit hooks |
| Type checking | No `tsc` script / tsconfig-driven check | Add typecheck to CI |
| Build scripts | Only `vite build` (no `dev`/`lint`/`test`/`preview`) | Add full script set |
| CI/CD | None | Pipeline: install → lint → typecheck → test → build → deploy |
| Dead code | `payment.service.ts`, `license.service.ts` unused | Wire up or remove |
| Redundant deps | Both `motion` and `framer-motion`; `react-hook-form` installed but unused; aliased duplicate deps | Deduplicate to shrink bundle |
| Analytics / monitoring | None | Add analytics + uptime + error monitoring |
| Accessibility | Mixed — labels/focus rings present, but no skip links, no landmark routing | Full a11y audit (WCAG 2.1 AA) |

---

## 6. Recommended Roadmap to Production

**Phase 1 — Foundation**
1. Choose backend (Supabase is fastest for auth + DB + storage; or the documented ASP.NET API).
2. Migrate navigation to `react-router`; add `.env.example`; add ESLint/Prettier + scripts.
3. Add `ErrorBoundary` + 404 route.

**Phase 2 — Core Functionality**
4. Real authentication (email/password + OAuth + passkeys), `httpOnly` token storage.
5. Wire contact/newsletter forms to a real email service.
6. Real file upload + object storage + per-file encryption for MeikaDocs.

**Phase 3 — Product Depth**
7. Cloud provider integrations (Drive/OneDrive/Dropbox/Box).
8. Real security-alert flow + sharing with tracking/expiry/revocation.
9. Payments + licensing (wire the existing dead services).

**Phase 4 — Launch Hardening**
10. SEO (titles/meta/OG/sitemap; consider SSR).
11. Tests + CI/CD.
12. Security review, a11y audit, analytics + monitoring, load testing.

---

## 7. One-Line Summary

> **The frontend is built; the product is not.** To ship, add a real backend, real auth, real file handling + encryption, real routing, and the launch essentials (SEO, error handling, tests, CI/CD, security hardening).

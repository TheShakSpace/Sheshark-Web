# SheShark Web

A web app for **women entrepreneurs in clean energy**: dashboards, marketplace, funding, learning, community, safety, taxi, and **AI-assisted** business and health guidance. Built with **React 19**, **Vite 6**, **Tailwind CSS 4**, **Firebase** (auth & Firestore), and **optional OpenRouter** on the server when a key is set (large local answer library works without it).

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [How it runs](#how-it-runs)
- [Production build](#production-build)
- [Project structure](#project-structure)
- [Troubleshooting](#troubleshooting)

---

## Features

| Area | Description |
|------|-------------|
| **Landing & auth** | Public landing; sign-in via Firebase. |
| **Dashboard** | Main hub after login. |
| **Energy Hub** | Energy-focused content and tools. |
| **AI Assistant** | Chat UI; `POST /api/ai/chat` with **health** or **business** — matches a local library first, then OpenRouter if configured. |
| **Marketplace** | Marketplace experience. |
| **Funding** | Funding-related flows. |
| **Learning** | Learning content. |
| **Business** | Business tools and advice context. |
| **Community** | Community features. |
| **Taxi** | Taxi-related section. |
| **Safety** | Safety resources. |
| **Profile** | User profile. |

---

## Tech stack

- **UI:** React 19, React Router 7, Tailwind CSS 4, Lucide icons, Motion, GSAP, Recharts  
- **State:** Zustand  
- **Backend (dev & optional prod):** Express + **Vite middleware** in development; static `dist/` in production when `NODE_ENV=production`  
- **Auth & data:** Firebase Auth, Firestore, Analytics (optional)  
- **AI:** OpenRouter HTTP API (`server/aiChat.ts`) when `OPENROUTER_API_KEY` is set; curated JSON knowledge + fallbacks always available  
- **Tooling:** TypeScript, Vite, `tsx` for running the Node server  

---

## Prerequisites

- **Node.js** 18+ (20+ recommended)  
- **npm** (comes with Node)  
- **Optional:** [OpenRouter](https://openrouter.ai/) API key for cloud completions when the library does not match  
- A **Firebase** project (web app) for `VITE_*` variables  

---

## Getting started

1. **Clone the repository**

   ```bash
   git clone https://github.com/TheShakSpace/Sheshark-Web.git
   cd Sheshark-Web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment** — create a `.env` file in the project root (see [Environment variables](#environment-variables)). Do not commit real secrets.

4. **Start the dev server**

   ```bash
   npm run dev
   ```

5. Open **http://localhost:3000** in your browser.

---

## Environment variables

Create **`.env`** in the repo root. Vite exposes only variables prefixed with `VITE_` to the client bundle.

### Server (Express + OpenRouter)

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | No | If set, used for chat after keyword library misses (`server/aiChat.ts`). |
| `OPENROUTER_MODEL` | No | e.g. `openai/gpt-4o-mini` (default in code if unset). |
| `OPENROUTER_HTTP_REFERER` | No | Optional Referer header for OpenRouter. |
| `OPENROUTER_APP_TITLE` | No | Optional `X-Title` for OpenRouter. |
| `PORT` | No | HTTP port (default `3000`). |

### Client (Vite + Firebase)

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | e.g. `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | GCP project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Sender ID |
| `VITE_FIREBASE_APP_ID` | App ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Analytics (optional) |

### Optional

| Variable | Description |
|----------|-------------|
| `DISABLE_HMR` | Set to `true` to disable Vite HMR. |

Example skeleton:

```env
OPENROUTER_API_KEY=
OPENROUTER_MODEL=openai/gpt-4o-mini

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Runs **`tsx server.ts`**: Express with Vite dev middleware, `/api/ai/chat`, `/api/geocode`. |
| `npm run build` | Production Vite build → `dist/`. |
| `npm run preview` | Vite preview only (no Express / API). |
| `npm run lint` | Typecheck with `tsc --noEmit`. |
| `npm run clean` | Removes `dist/`. |

---

## How it runs

- **Development:** `npm run dev` starts Express (`server.ts`). Vite runs in **middleware mode** so you get HMR and the SPA on one port. AI requests use `POST /api/ai/chat` on the same origin.
- **Secrets:** Keep `OPENROUTER_*` server-only; never prefix with `VITE_`.

---

## Production build

1. Build the frontend:

   ```bash
   npm run build
   ```

2. Run Express with production static serving:

   ```bash
   NODE_ENV=production tsx server.ts
   ```

Set `OPENROUTER_*` in the host environment if you want cloud replies; otherwise the app uses the local knowledge file and fallbacks.

Static hosts (e.g. Netlify) need a separate API or serverless functions for `/api/ai/chat` unless you deploy the Node server.

---

## Project structure

```
├── server.ts          # Express: API routes + Vite (dev) or static dist (prod)
├── server/aiChat.ts   # Knowledge match + OpenRouter
├── vite.config.ts
├── index.html
├── public/
├── src/
│   ├── App.tsx        # Routes, responsive shell, sidebar drawer on mobile
│   ├── pages/
│   └── ...
└── package.json
```

---

## Troubleshooting

- **No AI cloud replies** — Expected without `OPENROUTER_API_KEY`; library and fallback text still work. Add a key and restart the server.  
- **Firebase errors** — Confirm all `VITE_FIREBASE_*` values in the Firebase console. Restart after env changes.  
- **Port in use** — Set `PORT` in `.env` or free the port.  
- **Netlify / static deploy** — Add redirects for SPA routes; wire `/api/ai/chat` via Functions or an external backend if you need OpenRouter there.

---

## License

Private / team use unless the repository owners specify otherwise.

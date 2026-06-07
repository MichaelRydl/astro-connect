# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## What this project is

**AstroConnect** is a web app for exploring NASA's open data. The design spec
(`astroconnect-design.svg`) describes a UI — primarily in Czech — built around
several NASA Open APIs:

- **APOD** — Astronomy Picture of the Day
- **NeoWs** — Near Earth Object Web Service (asteroids / "Asteroidy")
- **EPIC** — Earth Polychromatic Imaging Camera
- **Mars Rover Photos** — Perseverance/Curiosity imagery (Mast Cam, Haz cams, etc.)

> **Current state:** the UI is built to match `astroconnect-design.svg` and is
> **wired to live NASA Open APIs** via TanStack Query (APOD, Mars Rover Photos,
> NeoWs, EPIC). Each section handles loading (skeletons), error, and empty
> states. The Mars **sol + camera filters are functional** (Zustand-backed), the
> APOD hero opens a **lightbox**, and an **error boundary** wraps the app.
> **React Router** drives three routes (`/`, `/mars`, `/asteroidy`) with a shared
> layout and a responsive mobile menu. Treat the design SVG as the source of
> truth for look & layout.
>
> Requires a NASA API key in `VITE_NASA_API_KEY` (see `.env.example`); falls back
> to `DEMO_KEY`, which has tight rate limits (~30 req/hour).

## Tech stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Framework      | React 19 (`react`, `react-dom`)         |
| Language       | TypeScript ~5.9 (strict mode)           |
| Build / dev    | Vite 8 (`@vitejs/plugin-react`, Oxc)    |
| Styling        | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Routing        | React Router v7 (`react-router-dom`)    |
| Server state   | TanStack Query v5 (`@tanstack/react-query`) |
| Client state   | Zustand v5                              |
| Linting        | ESLint 9 (flat config) + typescript-eslint |
| Testing        | Vitest 3 + Testing Library (jsdom)      |

> Note: TanStack Query **is wired up** (`QueryClientProvider` in `main.tsx`,
> client in `src/lib/queryClient.ts`) and handles all NASA API fetching. Zustand
> holds client UI state — currently the Mars filters (`src/store/marsFilters.ts`).

## Project layout

```
.
├── index.html              # Vite entry; mounts #root, loads Google Fonts
├── .env.example            # VITE_NASA_API_KEY (copy to .env)
├── src/
│   ├── main.tsx            # React root: ErrorBoundary > QueryClientProvider > App
│   ├── App.tsx             # Router: BrowserRouter + Routes (Layout + pages)
│   ├── index.css           # Tailwind import + @theme tokens + animations
│   ├── vite-env.d.ts       # Typed import.meta.env (VITE_NASA_API_KEY)
│   ├── pages/              # Route components
│   │   ├── HomePage.tsx        # "/" — hero + Mars grid + sidebar + stats
│   │   ├── MarsPage.tsx        # "/mars" — wide Mars gallery (limit 12)
│   │   ├── AsteroidsPage.tsx   # "/asteroidy" — full NEO list
│   │   └── NotFoundPage.tsx    # 404
│   ├── test/setup.ts       # jest-dom matchers + RTL cleanup
│   ├── lib/
│   │   ├── nasa.ts             # nasaFetch helper, API key, NasaError
│   │   ├── format.ts           # cs-CZ date formatting, todayIso()
│   │   └── queryClient.ts      # TanStack Query client + defaults
│   ├── api/                # One module per NASA API: fetcher + types
│   │   ├── apod.ts             # Astronomy Picture of the Day
│   │   ├── mars.ts             # Perseverance latest_photos
│   │   ├── neo.ts              # NeoWs feed → mapped/sorted Neo[]
│   │   └── epic.ts             # EPIC natural images + image URL builder
│   ├── hooks/queries.ts    # useApod/useMarsPhotos[BySol]/useNeoFeed/useEpic
│   ├── store/marsFilters.ts # Zustand: selected sol + camera
│   ├── data/fallback.ts    # APOD fallback content on error
│   └── components/         # Presentational UI components
│       ├── Layout.tsx          # Navbar + <Outlet/> + Footer shell
│       ├── Navbar.tsx          # Sticky nav: NavLinks + responsive mobile menu
│       ├── Hero.tsx            # APOD hero (real image bg) + lightbox trigger
│       ├── Lightbox.tsx        # Fullscreen APOD modal (Esc/backdrop close)
│       ├── MarsSection.tsx     # Mars header + functional filters + photo grid
│       ├── PhotoCard.tsx       # Mars photo card (+ skeleton); links to img_src
│       ├── Dropdown.tsx        # Reusable filter dropdown (outside-click/Esc)
│       ├── AsteroidTracker.tsx # NeoWs list with safe/caution statuses
│       ├── EpicCard.tsx        # EPIC Earth: cycles day's frames as rotation
│       ├── StatsBar.tsx        # Dark quick-stats strip (NEO/EPIC live)
│       ├── ErrorNote.tsx       # Reusable inline error message
│       ├── ErrorBoundary.tsx   # App-level render error fallback
│       └── Footer.tsx          # Footer + links
│       └── *.test.ts(x)        # Co-located Vitest tests (format, neo, epic, Dropdown)
├── public/                 # Static assets served at / (favicon.svg, icons.svg)
├── astroconnect-design.svg # Design spec: layout, typography, color palette
├── vite.config.ts          # Vite plugins: react() + tailwindcss()
├── vitest.config.ts         # Test config (jsdom, setup); loaded only by Vitest
├── eslint.config.js         # Flat ESLint config
├── tsconfig.json           # Project references → app + node configs
├── tsconfig.app.json        # Compiler options for src/ (strict, bundler mode)
└── tsconfig.node.json       # Compiler options for Vite config files
```

## Commands

```bash
npm install        # install dependencies
npm run dev        # start Vite dev server with HMR
npm run build      # type-check (tsc -b) then bundle (vite build) → dist/
npm run lint       # run ESLint over the repo
npm run preview    # serve the production build locally
npm run test       # run the Vitest suite once
npm run test:watch # run Vitest in watch mode
npm run coverage   # run tests with a v8 coverage report
```

Before considering a change done, run `npm run lint`, `npm run test`, and
`npm run build`. `npm run build` is the strongest correctness gate — `tsc -b`
type-checks every project file (including `*.test.ts(x)`) before bundling.

### Testing
- Vitest + Testing Library, jsdom environment. Config lives in `vitest.config.ts`
  (kept separate from `vite.config.ts` to avoid a Vite-version type clash during
  `tsc -b`). Matchers/cleanup are registered in `src/test/setup.ts`.
- Tests are **co-located** with the code (`foo.ts` → `foo.test.ts`). Import
  `describe/it/expect/vi` from `vitest` explicitly (globals are not enabled).
- Favor testing pure logic (API mappers, formatters, URL builders) by mocking
  `fetch` with `vi.stubGlobal`; use Testing Library + `userEvent` for component
  behavior (see `Dropdown.test.tsx`).

## Conventions

### Code style
- **Strict TypeScript.** `tsconfig.app.json` enables `strict`,
  `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`.
  Unused variables/params will fail the build — clean them up.
- `verbatimModuleSyntax` is on: use `import type { ... }` for type-only imports.
- `allowImportingTsExtensions` is on: local imports include the extension
  (e.g. `import App from "./App.tsx"`).
- Existing files use **double quotes** and **2-space indentation**. Match the
  surrounding style.
- Components are PascalCase; the file exports the component as `default`.

### Styling
- Use **Tailwind utility classes** in JSX (`className="text-3xl font-bold"`).
  Tailwind v4 is configured via the Vite plugin; the `@import "tailwindcss";`
  and `@theme` tokens live in `src/index.css` — there is no `tailwind.config.js`.
  Note: Tailwind only generates classes it finds as **literal strings** — never
  build class names by interpolation (`bg-${x}`); branch on full literals.
- Design tokens from `astroconnect-design.svg` (use these when implementing UI):
  - Background (dark): `#0D0B1A` / `#1E1C19`
  - Surface / light bg: `#F5F3F0`
  - Primary accent (violet): `#6C5CE7`, lighter `#A78BFA`
  - Secondary accent (terracotta): `#C45A3C`
  - Status: safe/green `#22C55E` / `#2D6A4F`, caution/amber `#F59E0B`
  - Text/neutral: `#4A4740`, `#78756E`, `#A09D96`
  - Display typeface: **Instrument Serif**
- UI copy in the design is in **Czech** (e.g. "Asteroidy", "Sledovat",
  "Kontakt"). Follow the design's language for user-facing strings.

### State & data
- All NASA fetching goes through one fetcher (`src/lib/nasa.ts`), one module per
  API in `src/api/`, and shared `useQuery` hooks in `src/hooks/queries.ts`.
  **Define each query once in `hooks/queries.ts`** so components reading the same
  data (e.g. a section and `StatsBar`) share a query key and hit the cache — do
  not call `useQuery` ad hoc in components.
- The API key is read from `import.meta.env.VITE_NASA_API_KEY` (typed in
  `src/vite-env.d.ts`), falling back to `DEMO_KEY`. Keep real keys in `.env`
  (gitignored); document new vars in `.env.example`.
- Every data-driven section must handle loading (skeletons), error, and empty
  states — follow the existing components.
- Use Zustand stores for cross-component client state; keep server data in
  TanStack Query, not duplicated into Zustand.

### Routing
- Routes are declared in `src/App.tsx` (`BrowserRouter` + `Routes`). Pages live
  in `src/pages/`; the shared chrome (nav + footer) is `components/Layout.tsx`
  rendered via `<Outlet/>`. Add a new section by adding a page + a `<Route>` and
  a `navItems` entry in `Navbar.tsx`.
- `BrowserRouter` uses the HTML5 history API, so a production host must rewrite
  unknown paths to `index.html`. `vercel.json` does this for Vercel; replicate
  the rewrite on any other host.

## CI & deployment

- **CI:** `.github/workflows/ci.yml` runs `npm ci` → lint → test → build on
  pushes to `main` and on every PR (Node 22). Keep all three green.
- **Deploy:** Vite SPA; `vercel.json` rewrites all paths to `index.html`. Set
  `VITE_NASA_API_KEY` as an environment variable on the host.

## Git workflow

- Active development branch for this work: `claude/claude-md-docs-1EcbD`.
- Develop on the designated feature branch, commit with clear messages, and
  push with `git push -u origin <branch-name>`.
- **Do not** open a pull request unless explicitly asked.
- Remote: `MichaelRydl/astro-connect`.

## Notes for AI assistants

- The codebase is intentionally minimal right now; don't assume features exist —
  verify by reading `src/` before referencing components or routes.
- When building out features, reference `astroconnect-design.svg` for layout,
  spacing, color, and typography decisions.
- Keep the build green: `npm run build` (type-check) and `npm run lint` must
  pass. There are no tests to run yet.

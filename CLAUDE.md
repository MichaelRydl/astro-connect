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

> **Current state:** the repository is a fresh Vite scaffold. `src/App.tsx`
> renders only a "Hello World" placeholder. The dependencies and design are in
> place but the application features have **not** been built yet. Treat the
> design SVG as the source of truth for intended look, layout, and feature set.

## Tech stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Framework      | React 19 (`react`, `react-dom`)         |
| Language       | TypeScript ~5.9 (strict mode)           |
| Build / dev    | Vite 8 (`@vitejs/plugin-react`, Oxc)    |
| Styling        | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Server state   | TanStack Query v5 (`@tanstack/react-query`) |
| Client state   | Zustand v5                              |
| Linting        | ESLint 9 (flat config) + typescript-eslint |

> Note: TanStack Query and Zustand are installed but **not yet wired up**. When
> adding data fetching, use TanStack Query for NASA API calls; use Zustand for
> shared client-side UI state.

## Project layout

```
.
├── index.html              # Vite entry; mounts #root, loads src/main.tsx
├── src/
│   ├── main.tsx            # React root (StrictMode) → renders <App/>
│   ├── App.tsx             # Root component (currently a placeholder)
│   └── App.css             # @import "tailwindcss";
├── public/                 # Static assets served at / (favicon.svg, icons.svg)
├── astroconnect-design.svg # Design spec: layout, typography, color palette
├── vite.config.ts          # Vite plugins: react() + tailwindcss()
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
```

There is currently **no test runner** configured. `npm run build` is the
strongest correctness gate — it runs `tsc -b` (full type-check across the
project references) before bundling. Run `npm run build` and `npm run lint`
before considering a change done.

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
  Tailwind v4 is configured via the Vite plugin and a single
  `@import "tailwindcss";` in `src/App.css` — there is no `tailwind.config.js`.
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
- Wrap data fetching in TanStack Query hooks (`useQuery`/`useMutation`). NASA
  APIs typically require an API key — read it from a Vite env var
  (`import.meta.env.VITE_*`) and keep secrets out of the repo (`.env` is
  gitignored; `dotenv` is a dependency).
- Use Zustand stores for cross-component client state; keep server data in
  TanStack Query, not duplicated into Zustand.

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

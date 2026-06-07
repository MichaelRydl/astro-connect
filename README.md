# AstroConnect

Webová aplikace pro objevování vesmíru skrze otevřená data NASA. UI je v češtině
a vychází z návrhu v [`astroconnect-design.svg`](./astroconnect-design.svg).

Zobrazuje data ze čtyř otevřených NASA API:

- **APOD** — Astronomický snímek dne (hero + lightbox)
- **Mars Rover Photos** — nejnovější snímky z Perseverance s filtry (sol + kamera)
- **NeoWs** — blízké objekty (asteroidy) se statusem bezpečný / sledovat
- **EPIC** — živá Země z družice DSCOVR s přehráním rotace

## Tech stack

React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS v4 · React Router v7 ·
TanStack Query v5 · Zustand v5 · Vitest + Testing Library

## Začínáme

```bash
npm install
cp .env.example .env   # doplň svůj NASA API klíč (https://api.nasa.gov)
npm run dev
```

Bez klíče se použije `DEMO_KEY` s přísnými limity (~30 požadavků/hod). Vlastní
klíč je zdarma a doporučený — aplikace dělá několik volání na jedno načtení.

## Skripty

| Příkaz               | Popis                                            |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | dev server s HMR                                 |
| `npm run build`      | typová kontrola (`tsc -b`) + build do `dist/`    |
| `npm run preview`    | servíruje produkční build                        |
| `npm run lint`       | ESLint                                           |
| `npm run test`       | spustí testy (Vitest)                            |
| `npm run test:watch` | testy ve watch režimu                            |
| `npm run coverage`   | testy s reportem pokrytí                         |

## Nasazení

Projekt je SPA s `BrowserRouter`. Hostovací služba musí přesměrovat neznámé
cesty na `index.html` — pro Vercel to zajišťuje [`vercel.json`](./vercel.json).

## Dokumentace pro vývoj

Konvence, struktura a postupy jsou v [`CLAUDE.md`](./CLAUDE.md).

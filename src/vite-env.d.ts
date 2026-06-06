/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** NASA API klíč. Fallback na DEMO_KEY, pokud není nastaven. */
  readonly VITE_NASA_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

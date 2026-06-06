// Sdílená vrstva pro volání NASA Open APIs (api.nasa.gov).
// Klíč se bere z VITE_NASA_API_KEY, jinak se použije DEMO_KEY (přísné limity).

export const API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";
export const NASA_BASE = "https://api.nasa.gov";

export class NasaError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "NasaError";
    this.status = status;
  }
}

export async function nasaFetch<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(NASA_BASE + path);
  url.searchParams.set("api_key", API_KEY);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url);
  if (!res.ok) {
    const message =
      res.status === 429
        ? "Překročen limit požadavků NASA API. Nastav vlastní VITE_NASA_API_KEY."
        : `NASA API odpovědělo chybou ${res.status}.`;
    throw new NasaError(message, res.status);
  }
  return (await res.json()) as T;
}

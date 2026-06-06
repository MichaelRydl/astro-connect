// Formátování dat v češtině (odpovídá návrhu, např. "29. března 2026").

const longFmt = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortFmt = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "numeric",
});

/** Přijímá ISO řetězec ("2026-03-29") nebo "2026-03-29 00:00:00". */
function toDate(value: string): Date {
  return new Date(value.replace(" ", "T"));
}

export function formatCzDate(value: string): string {
  return longFmt.format(toDate(value));
}

/** Krátký formát pro statistiky, např. "29.3.". */
export function formatCzShort(value: string): string {
  return shortFmt.format(toDate(value)).replace(/\s/g, "") + ".";
}

/** Dnešní datum ve formátu YYYY-MM-DD (lokální čas). */
export function todayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

import { API_KEY, NASA_BASE, nasaFetch } from "../lib/nasa";

// EPIC — Earth Polychromatic Imaging Camera (DSCOVR)
// https://api.nasa.gov/EPIC/api/natural
export interface EpicImage {
  identifier: string;
  image: string;
  date: string;
  caption: string;
}

export function fetchEpicNatural(): Promise<EpicImage[]> {
  return nasaFetch<EpicImage[]>("/EPIC/api/natural");
}

/** Sestaví URL plného PNG snímku z archivu EPIC. */
export function epicImageUrl(img: EpicImage): string {
  const [date] = img.date.split(" ");
  const [year, month, day] = date.split("-");
  return `${NASA_BASE}/EPIC/archive/natural/${year}/${month}/${day}/png/${img.image}.png?api_key=${API_KEY}`;
}

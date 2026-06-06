import { nasaFetch } from "../lib/nasa";

// APOD — Astronomy Picture of the Day
// https://api.nasa.gov/planetary/apod
export interface Apod {
  title: string;
  explanation: string;
  date: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  copyright?: string;
}

export function fetchApod(): Promise<Apod> {
  return nasaFetch<Apod>("/planetary/apod");
}

// Statická data odpovídající návrhu (astroconnect-design.svg).
// Později nahradí odpovědi z NASA Open APIs (APOD, Mars Rover Photos, NeoWs, EPIC).

export interface Apod {
  badge: string;
  title: string;
  description: string;
  date: string;
  credit: string;
}

export interface MarsPhoto {
  id: number;
  camera: string;
  sol: string;
  /** Placeholder odstín dlaždice, než se napojí skutečný snímek. */
  tone: string;
}

export type NeoStatus = "safe" | "caution";

export interface NeoObject {
  id: string;
  name: string;
  status: NeoStatus;
  statusLabel: string;
  distanceLd: string;
  diameter: string;
}

export interface QuickStat {
  value: string;
  label: string;
  accent: string;
}

export const apod: Apod = {
  badge: "Snímek dne",
  title: "Mlhovina v Orionu",
  description:
    "Tento úchvatný snímek zachycuje jednu z nejznámějších mlhovin na noční obloze — kolébku nových hvězd...",
  date: "29. března 2026",
  credit: "NASA / ESA / Hubble Heritage Team",
};

export const marsPhotos: MarsPhoto[] = [
  { id: 1, camera: "Mast Cam", sol: "Sol 1042", tone: "#9a7d5a" },
  { id: 2, camera: "Navigation", sol: "Sol 1042", tone: "#7a6b52" },
  { id: 3, camera: "Front Haz", sol: "Sol 1042", tone: "#a08060" },
  { id: 4, camera: "Chemistry", sol: "Sol 1041", tone: "#887050" },
  { id: 5, camera: "Hand Lens", sol: "Sol 1041", tone: "#6d5e48" },
  { id: 6, camera: "Rear Haz", sol: "Sol 1041", tone: "#95805e" },
];

export const neoObjects: NeoObject[] = [
  {
    id: "2024-ab",
    name: "2024 AB",
    status: "safe",
    statusLabel: "Bezpečný",
    distanceLd: "2.1 LD",
    diameter: "120 m",
  },
  {
    id: "2026-xy",
    name: "2026 XY",
    status: "safe",
    statusLabel: "Bezpečný",
    distanceLd: "4.5 LD",
    diameter: "45 m",
  },
  {
    id: "2025-qr7",
    name: "2025 QR7",
    status: "caution",
    statusLabel: "Sledovat",
    distanceLd: "0.8 LD",
    diameter: "310 m",
  },
];

export const today = "29. března 2026";

export const quickStats: QuickStat[] = [
  { value: "1,198,204", label: "Celkem fotek", accent: "text-primary" },
  { value: "4", label: "Aktivní mise", accent: "text-mars" },
  { value: "12", label: "NEO dnes", accent: "text-safe" },
  { value: "29.3.", label: "Poslední EPIC", accent: "text-muted" },
];

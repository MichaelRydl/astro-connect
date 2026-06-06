import { nasaFetch } from "../lib/nasa";

// NeoWs — Near Earth Object Web Service
// https://api.nasa.gov/neo/rest/v1/feed
interface NeoRaw {
  id: string;
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: {
    miss_distance: { lunar: string };
  }[];
}

interface NeoFeedResponse {
  element_count: number;
  near_earth_objects: Record<string, NeoRaw[]>;
}

export type NeoStatus = "safe" | "caution";

/** Zploštělý objekt připravený k zobrazení. */
export interface Neo {
  id: string;
  name: string;
  status: NeoStatus;
  statusLabel: string;
  distanceLd: string;
  diameterM: number;
}

export interface NeoFeed {
  count: number;
  objects: Neo[];
}

function mapNeo(raw: NeoRaw): Neo {
  const { estimated_diameter_min, estimated_diameter_max } =
    raw.estimated_diameter.meters;
  const diameterM = Math.round(
    (estimated_diameter_min + estimated_diameter_max) / 2,
  );
  const lunar = Number(raw.close_approach_data[0]?.miss_distance.lunar ?? NaN);

  return {
    id: raw.id,
    name: raw.name.replace(/[()]/g, "").trim(),
    status: raw.is_potentially_hazardous_asteroid ? "caution" : "safe",
    statusLabel: raw.is_potentially_hazardous_asteroid
      ? "Sledovat"
      : "Bezpečný",
    distanceLd: Number.isFinite(lunar) ? `${lunar.toFixed(1)} LD` : "—",
    diameterM,
  };
}

/** Vrátí NEO pro daný den, seřazené od nejbližšího průletu. */
export async function fetchNeoFeed(date: string): Promise<NeoFeed> {
  const data = await nasaFetch<NeoFeedResponse>("/neo/rest/v1/feed", {
    start_date: date,
    end_date: date,
  });

  const raw = data.near_earth_objects[date] ?? [];
  const objects = raw
    .map(mapNeo)
    .sort((a, b) => parseFloat(a.distanceLd) - parseFloat(b.distanceLd));

  return { count: data.element_count, objects };
}

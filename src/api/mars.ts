import { nasaFetch } from "../lib/nasa";

// Mars Rover Photos — nejnovější snímky z Perseverance
// https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos
export interface MarsCamera {
  id: number;
  name: string;
  full_name: string;
}

export interface MarsPhoto {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
  camera: MarsCamera;
}

interface LatestPhotosResponse {
  latest_photos: MarsPhoto[];
}

interface PhotosResponse {
  photos: MarsPhoto[];
}

export async function fetchMarsLatest(): Promise<MarsPhoto[]> {
  const data = await nasaFetch<LatestPhotosResponse>(
    "/mars-photos/api/v1/rovers/perseverance/latest_photos",
  );
  return data.latest_photos ?? [];
}

export async function fetchMarsPhotosBySol(sol: number): Promise<MarsPhoto[]> {
  const data = await nasaFetch<PhotosResponse>(
    "/mars-photos/api/v1/rovers/perseverance/photos",
    { sol: String(sol) },
  );
  return data.photos ?? [];
}

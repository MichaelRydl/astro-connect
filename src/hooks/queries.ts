import { useQuery } from "@tanstack/react-query";
import { fetchApod } from "../api/apod";
import { fetchMarsLatest, fetchMarsPhotosBySol } from "../api/mars";
import { fetchNeoFeed } from "../api/neo";
import { fetchEpicNatural } from "../api/epic";
import { todayIso } from "../lib/format";

// Centrální definice dotazů — sdílené queryKey zajistí, že komponenty
// (např. sekce + StatsBar) čtou z téže cache.

const HOUR = 1000 * 60 * 60;

export function useApod() {
  return useQuery({ queryKey: ["apod"], queryFn: fetchApod, staleTime: 6 * HOUR });
}

export function useMarsPhotos() {
  return useQuery({
    queryKey: ["mars", "perseverance", "latest"],
    queryFn: fetchMarsLatest,
    staleTime: HOUR,
  });
}

export function useMarsPhotosBySol(sol: number | null) {
  return useQuery({
    queryKey: ["mars", "perseverance", "sol", sol],
    queryFn: () => fetchMarsPhotosBySol(sol as number),
    enabled: sol !== null,
    staleTime: HOUR,
  });
}

export function useNeoFeed() {
  const date = todayIso();
  return useQuery({
    queryKey: ["neo", date],
    queryFn: () => fetchNeoFeed(date),
    staleTime: HOUR,
  });
}

export function useEpic() {
  return useQuery({
    queryKey: ["epic", "natural"],
    queryFn: fetchEpicNatural,
    staleTime: HOUR,
  });
}

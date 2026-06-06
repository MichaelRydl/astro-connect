import { useMarsPhotos, useMarsPhotosBySol } from "../hooks/queries";
import { useMarsFilters } from "../store/marsFilters";
import type { MarsPhoto } from "../api/mars";
import PhotoCard, { PhotoCardSkeleton } from "./PhotoCard";
import Dropdown, { type DropdownItem } from "./Dropdown";
import ErrorNote from "./ErrorNote";

const SOL_OPTIONS = 8;

/** Unikátní kamery z aktuální sady snímků (pro filtr). */
function uniqueCameras(photos: MarsPhoto[]) {
  const seen = new Map<string, string>();
  for (const p of photos) {
    if (!seen.has(p.camera.name)) seen.set(p.camera.name, p.camera.full_name);
  }
  return [...seen].map(([name, fullName]) => ({ name, fullName }));
}

export default function MarsSection({
  limit = 6,
  wide = false,
}: {
  limit?: number;
  wide?: boolean;
}) {
  const { sol, cameraName, setSol, setCamera } = useMarsFilters();

  // Nejnovější sada vždy běží (zdroj nejnovějšího solu pro dropdown).
  const latest = useMarsPhotos();
  const bySol = useMarsPhotosBySol(sol);

  const latestSol = latest.data?.[0]?.sol;
  const isLatest = sol === null;
  const active = isLatest ? latest : bySol;

  const allPhotos = active.data ?? [];
  const cameras = uniqueCameras(allPhotos);
  const filtered = cameraName
    ? allPhotos.filter((p) => p.camera.name === cameraName)
    : allPhotos;
  const photos = filtered.slice(0, limit);

  const gridClass = wide
    ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

  // Volby pro dropdowny
  const selectedSol = sol ?? latestSol;
  const solItems: DropdownItem[] = latestSol
    ? Array.from({ length: SOL_OPTIONS }, (_, i) => latestSol - i).map((s) => ({
        key: String(s),
        label: `Sol ${s}`,
        active: s === selectedSol,
        // Nejnovější sol využívá cache z latest_photos.
        onSelect: () => setSol(s === latestSol ? null : s),
      }))
    : [];

  const cameraItems: DropdownItem[] = [
    {
      key: "all",
      label: "Všechny kamery",
      active: cameraName === null,
      onSelect: () => setCamera(null),
    },
    ...cameras.map((c) => ({
      key: c.name,
      label: c.fullName,
      active: c.name === cameraName,
      onSelect: () => setCamera(c.name),
    })),
  ];

  return (
    <section aria-labelledby="mars-heading">
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-mars">
        <span aria-hidden="true">🪐</span> Nejnovější z Marsu
      </p>

      <h2 id="mars-heading" className="mt-3 font-serif text-[26px] text-ink">
        Perseverance Rover
      </h2>

      {/* Filtry */}
      <div className="mt-4 flex flex-wrap gap-3">
        <Dropdown
          label={selectedSol ? `Sol ${selectedSol}` : "Sol —"}
          items={solItems}
          disabled={!latestSol}
        />
        <Dropdown
          label={
            cameraName
              ? (cameras.find((c) => c.name === cameraName)?.fullName ?? "Kamera")
              : "Všechny kamery"
          }
          items={cameraItems}
          disabled={allPhotos.length === 0}
        />
      </div>

      {/* Mřížka snímků */}
      <div className={`mt-6 ${gridClass}`}>
        {active.isLoading &&
          Array.from({ length: limit }).map((_, i) => <PhotoCardSkeleton key={i} />)}

        {!active.isLoading &&
          photos.map((photo) => <PhotoCard key={photo.id} photo={photo} />)}
      </div>

      {active.isError && (
        <ErrorNote className="mt-6" message="Snímky z Marsu se nepodařilo načíst." />
      )}
      {!active.isLoading && !active.isError && photos.length === 0 && (
        <ErrorNote
          className="mt-6"
          message="Pro zvolený sol a kameru nejsou k dispozici žádné snímky."
        />
      )}
    </section>
  );
}

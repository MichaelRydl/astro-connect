import { useMarsPhotos } from "../hooks/queries";
import PhotoCard, { PhotoCardSkeleton } from "./PhotoCard";
import ErrorNote from "./ErrorNote";

function FilterChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-lg border border-stroke bg-white px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-mars/40"
    >
      {label}
      <span className="text-[10px] text-muted-soft" aria-hidden="true">
        ▾
      </span>
    </button>
  );
}

export default function MarsSection() {
  const { data, isLoading, isError } = useMarsPhotos();
  const photos = data?.slice(0, 6) ?? [];
  const latestSol = photos[0]?.sol;

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
        <FilterChip label={latestSol ? `Sol ${latestSol}` : "Sol —"} />
        <FilterChip label="Všechny kamery" />
      </div>

      {/* Mřížka 3×2 */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <PhotoCardSkeleton key={i} />)}

        {!isLoading &&
          photos.map((photo) => <PhotoCard key={photo.id} photo={photo} />)}
      </div>

      {isError && <ErrorNote className="mt-6" message="Snímky z Marsu se nepodařilo načíst." />}
      {!isLoading && !isError && photos.length === 0 && (
        <ErrorNote className="mt-6" message="Pro tento sol nejsou k dispozici žádné snímky." />
      )}
    </section>
  );
}

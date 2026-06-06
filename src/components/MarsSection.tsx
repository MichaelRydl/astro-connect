import { marsPhotos } from "../data/mock";
import PhotoCard from "./PhotoCard";

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
        <FilterChip label="Sol 1042" />
        <FilterChip label="Všechny kamery" />
      </div>

      {/* Mřížka 3×2 */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {marsPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
}

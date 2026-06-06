import type { MarsPhoto } from "../data/mock";

export default function PhotoCard({ photo }: { photo: MarsPhoto }) {
  return (
    <figure className="group overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)]">
      {/* Plocha snímku (placeholder, než se napojí API) */}
      <div
        className="relative aspect-[3/2] w-full overflow-hidden"
        style={{
          background: `radial-gradient(120% 100% at 30% 25%, ${photo.tone} 0%, rgba(0,0,0,0.35) 120%)`,
        }}
      >
        {/* Náznak terénu */}
        <span className="absolute left-[18%] top-[40%] size-20 rounded-full bg-black/10 blur-md" />
        <span className="absolute right-[12%] top-[55%] size-12 rounded-full bg-black/15 blur-md" />
        <span className="absolute inset-x-0 bottom-0 h-1/4 bg-black/10" />

        {/* Hover overlay s ikonou zvětšení */}
        <div className="absolute inset-0 flex items-center justify-center bg-deep-space/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex size-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Popisek */}
      <figcaption className="flex items-center justify-between px-4 py-3">
        <span className="text-[11px] font-semibold text-ink">{photo.camera}</span>
        <span className="text-[10px] text-muted-soft">{photo.sol}</span>
      </figcaption>
    </figure>
  );
}

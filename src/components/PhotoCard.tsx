import type { MarsPhoto } from "../api/mars";

export function PhotoCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      <div className="aspect-[3/2] w-full animate-pulse bg-stroke" />
      <div className="flex items-center justify-between px-4 py-3">
        <span className="h-3 w-20 animate-pulse rounded bg-stroke" />
        <span className="h-3 w-12 animate-pulse rounded bg-stroke" />
      </div>
    </div>
  );
}

export default function PhotoCard({ photo }: { photo: MarsPhoto }) {
  return (
    <a
      href={photo.img_src}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)]"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink/10">
        <img
          src={photo.img_src}
          alt={`${photo.camera.full_name} — Sol ${photo.sol}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

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

      <div className="flex items-center justify-between px-4 py-3">
        <span className="truncate text-[11px] font-semibold text-ink">
          {photo.camera.full_name}
        </span>
        <span className="shrink-0 pl-2 text-[10px] text-muted-soft">Sol {photo.sol}</span>
      </div>
    </a>
  );
}

import { useState } from "react";
import { useApod } from "../hooks/queries";
import { apodFallback } from "../data/fallback";
import { formatCzDate } from "../lib/format";
import Lightbox from "./Lightbox";

// Statické rozmístění hvězd pro pozadí mlhoviny (zobrazí se, dokud není snímek).
const stars = [
  { x: 18, y: 18, s: 3, o: 0.7 },
  { x: 32, y: 28, s: 2, o: 0.5 },
  { x: 44, y: 12, s: 2.4, o: 0.6 },
  { x: 56, y: 22, s: 1.6, o: 0.4 },
  { x: 66, y: 10, s: 3, o: 0.6 },
  { x: 78, y: 18, s: 2, o: 0.5 },
  { x: 86, y: 14, s: 2.6, o: 0.7 },
  { x: 24, y: 52, s: 1.6, o: 0.3 },
  { x: 38, y: 62, s: 2.4, o: 0.5 },
  { x: 82, y: 44, s: 2, o: 0.4 },
  { x: 16, y: 66, s: 3, o: 0.5 },
  { x: 50, y: 48, s: 2, o: 0.6 },
  { x: 60, y: 72, s: 2.6, o: 0.4 },
];

function Stars() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {stars.map((star, i) => (
        <span
          key={i}
          className="star star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.s,
            height: star.s,
            opacity: star.o,
            animationDelay: `${(i % 5) * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const { data, isLoading, isError } = useApod();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Obsah: živá data, jinak fallback. U videa necháme pozadí mlhoviny.
  const isImage = data?.media_type === "image";
  const bgImage = isImage ? (data.hdurl ?? data.url) : undefined;
  const title = data?.title ?? apodFallback.title;
  const description = data?.explanation ?? apodFallback.explanation;
  const date = data?.date ?? apodFallback.date;
  const credit = data?.copyright?.trim() ?? (isError ? apodFallback.credit : "NASA");

  return (
    <section
      aria-label="Snímek dne"
      className="hero-bg fade-up relative overflow-hidden rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
    >
      {/* Skutečný snímek APOD jako pozadí (klik otevře lightbox) */}
      {bgImage && (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Zobrazit snímek: ${title}`}
          className="absolute inset-0 cursor-zoom-in"
        >
          <img src={bgImage} alt={title} className="size-full object-cover" />
        </button>
      )}

      {!bgImage && <Stars />}

      {/* Overlay vlevo pro čitelnost */}
      <div className="hero-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Obsah (klik mimo tlačítka propustíme na snímek v pozadí) */}
      <div className="pointer-events-none relative flex min-h-[440px] flex-col justify-center px-8 py-12 sm:px-12">
        <span className="inline-flex w-fit items-center rounded-full border border-accent/30 bg-primary/20 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
          Snímek dne
        </span>

        {isLoading ? (
          <div className="mt-6 max-w-xl animate-pulse space-y-4">
            <div className="h-10 w-2/3 rounded-lg bg-white/15" />
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-4/5 rounded bg-white/10" />
            <div className="h-10 w-32 rounded-full bg-white/15" />
          </div>
        ) : (
          <>
            <h1 className="mt-6 font-serif text-4xl text-canvas sm:text-5xl">{title}</h1>

            <p className="mt-4 line-clamp-2 max-w-xl text-sm font-light leading-relaxed text-canvas/60">
              {description}
            </p>

            {data ? (
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="pointer-events-auto mt-7 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                Číst dál <span aria-hidden="true">→</span>
              </button>
            ) : (
              <a
                href="https://apod.nasa.gov/apod/astropix.html"
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto mt-7 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                Číst dál <span aria-hidden="true">→</span>
              </a>
            )}

            <p className="mt-10 text-[11px] text-canvas/30">
              {formatCzDate(date)} &nbsp;·&nbsp; {credit}
            </p>
          </>
        )}
      </div>

      {lightboxOpen && data && (
        <Lightbox apod={data} onClose={() => setLightboxOpen(false)} />
      )}
    </section>
  );
}

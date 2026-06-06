import { useEffect } from "react";
import type { Apod } from "../api/apod";
import { formatCzDate } from "../lib/format";
import { apodFallback } from "../data/fallback";

export default function Lightbox({
  apod,
  onClose,
}: {
  apod: Apod;
  onClose: () => void;
}) {
  // Zamkne scroll a zavírá na Escape.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const isImage = apod.media_type === "image";
  const credit = apod.copyright?.trim() || apodFallback.credit;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={apod.title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-space/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fade-up flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-deep-space ring-1 ring-white/10"
      >
        {/* Médium */}
        <div className="relative flex max-h-[60vh] items-center justify-center overflow-hidden bg-black">
          {isImage ? (
            <img
              src={apod.hdurl ?? apod.url}
              alt={apod.title}
              className="max-h-[60vh] w-full object-contain"
            />
          ) : (
            <iframe
              src={apod.url}
              title={apod.title}
              allowFullScreen
              className="aspect-video w-full"
            />
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Zavřít"
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Text */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <h2 className="font-serif text-3xl text-canvas">{apod.title}</h2>
          <p className="mt-1 text-[11px] text-canvas/40">
            {formatCzDate(apod.date)} &nbsp;·&nbsp; {credit}
          </p>
          <p className="mt-4 text-sm font-light leading-relaxed text-canvas/70">
            {apod.explanation}
          </p>

          <a
            href={apod.hdurl ?? apod.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-[13px] font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Otevřít originál <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/** Vizualizace Země z kamery DSCOVR/EPIC. */
function Earth() {
  return (
    <div className="relative size-44">
      {/* Atmosférický glow */}
      <span className="absolute inset-0 rounded-full ring-2 ring-sky-300/15" />
      <span className="absolute -inset-1.5 rounded-full ring ring-sky-300/10" />

      {/* Zeměkoule (pomalá rotace) */}
      <svg viewBox="0 0 176 176" className="earth-rotate size-full" aria-hidden="true">
        <defs>
          <radialGradient id="earthGrad" cx="0.4" cy="0.35" r="0.85">
            <stop offset="0%" stopColor="#40916c" />
            <stop offset="55%" stopColor="#2d6a4f" />
            <stop offset="100%" stopColor="#1b4965" />
          </radialGradient>
        </defs>
        <circle cx="88" cy="88" r="80" fill="url(#earthGrad)" />
        {/* Náznak kontinentů */}
        <ellipse cx="62" cy="66" rx="30" ry="25" fill="#40916c" opacity="0.45" transform="rotate(-10 62 66)" />
        <ellipse cx="112" cy="96" rx="20" ry="30" fill="#2d6a4f" opacity="0.35" transform="rotate(15 112 96)" />
        <ellipse cx="72" cy="116" rx="16" ry="12" fill="#52b788" opacity="0.35" />
        {/* Oblačnost */}
        <ellipse cx="58" cy="58" rx="26" ry="6" fill="#fff" opacity="0.15" transform="rotate(-5 58 58)" />
        <ellipse cx="116" cy="120" rx="22" ry="5" fill="#fff" opacity="0.12" transform="rotate(8 116 120)" />
      </svg>

      {/* Tlačítko přehrání */}
      <button
        type="button"
        aria-label="Přehrát rotaci"
        className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/25"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
}

export default function EpicCard() {
  return (
    <section
      aria-labelledby="epic-heading"
      className="rounded-2xl border border-hairline bg-white p-6 shadow-[0_2px_8px_rgba(108,92,231,0.06)]"
    >
      <p
        id="epic-heading"
        className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-earth"
      >
        <span aria-hidden="true">🌍</span> Živá Země — EPIC
      </p>

      <div className="mt-6 flex justify-center">
        <Earth />
      </div>

      <p className="mt-6 text-center text-[11px] text-muted">Přehrát rotaci →</p>
    </section>
  );
}

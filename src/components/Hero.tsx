import { apod } from "../data/mock";

// Statické rozmístění hvězd v pozadí mlhoviny.
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

export default function Hero() {
  return (
    <section
      aria-label="Snímek dne"
      className="hero-bg fade-up relative overflow-hidden rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
    >
      {/* Hvězdy */}
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

      {/* Overlay vlevo pro čitelnost */}
      <div className="hero-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Obsah */}
      <div className="relative flex min-h-[440px] flex-col justify-center px-8 py-12 sm:px-12">
        <span className="inline-flex w-fit items-center rounded-full border border-accent/30 bg-primary/20 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
          {apod.badge}
        </span>

        <h1 className="mt-6 font-serif text-4xl text-canvas sm:text-5xl">
          {apod.title}
        </h1>

        <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-canvas/60">
          {apod.description}
        </p>

        <button
          type="button"
          className="mt-7 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          Číst dál <span aria-hidden="true">→</span>
        </button>

        <p className="mt-10 text-[11px] text-canvas/30">
          {apod.date} &nbsp;·&nbsp; {apod.credit}
        </p>
      </div>
    </section>
  );
}

import { neoObjects, today, type NeoObject } from "../data/mock";

const statusStyles: Record<
  NeoObject["status"],
  { card: string; dotRing: string; dot: string; badge: string }
> = {
  safe: {
    card: "border-green-200 bg-green-50",
    dotRing: "bg-safe/15",
    dot: "bg-safe",
    badge: "bg-green-100 text-green-600",
  },
  caution: {
    card: "border-amber-200 bg-amber-50",
    dotRing: "bg-caution/15",
    dot: "bg-caution",
    badge: "bg-amber-100 text-amber-600",
  },
};

function NeoRow({ neo }: { neo: NeoObject }) {
  const s = statusStyles[neo.status];
  return (
    <li className={`flex items-center gap-3 rounded-[10px] border px-3.5 py-3 ${s.card}`}>
      <span className={`flex size-5 shrink-0 items-center justify-center rounded-full ${s.dotRing}`}>
        <span className={`size-2 rounded-full ${s.dot}`} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-ink">{neo.name}</span>
          <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-semibold ${s.badge}`}>
            {neo.statusLabel}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-muted">
          Vzdálenost: {neo.distanceLd} &nbsp;·&nbsp; Ø {neo.diameter}
        </p>
      </div>
    </li>
  );
}

export default function AsteroidTracker() {
  return (
    <section
      aria-labelledby="neo-heading"
      className="rounded-2xl border border-hairline bg-white p-6 shadow-[0_2px_8px_rgba(108,92,231,0.06)]"
    >
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-mars-light">
        <span aria-hidden="true">☄️</span> Hlídač asteroidů
      </p>

      <h2 id="neo-heading" className="mt-3 font-serif text-[22px] text-ink">
        Dnes: {today}
      </h2>

      <hr className="my-4 border-hairline" />

      <ul className="flex flex-col gap-3">
        {neoObjects.map((neo) => (
          <NeoRow key={neo.id} neo={neo} />
        ))}
      </ul>
    </section>
  );
}

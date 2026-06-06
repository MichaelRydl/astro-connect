import { useNeoFeed } from "../hooks/queries";
import { formatCzDate, todayIso } from "../lib/format";
import type { Neo } from "../api/neo";

const statusStyles: Record<
  Neo["status"],
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

function NeoRow({ neo }: { neo: Neo }) {
  const s = statusStyles[neo.status];
  return (
    <li className={`flex items-center gap-3 rounded-[10px] border px-3.5 py-3 ${s.card}`}>
      <span className={`flex size-5 shrink-0 items-center justify-center rounded-full ${s.dotRing}`}>
        <span className={`size-2 rounded-full ${s.dot}`} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[13px] font-semibold text-ink">{neo.name}</span>
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-semibold ${s.badge}`}>
            {neo.statusLabel}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-muted">
          Vzdálenost: {neo.distanceLd} &nbsp;·&nbsp; Ø {neo.diameterM} m
        </p>
      </div>
    </li>
  );
}

function RowSkeleton() {
  return (
    <li className="flex items-center gap-3 rounded-[10px] border border-hairline px-3.5 py-3">
      <span className="size-5 shrink-0 animate-pulse rounded-full bg-stroke" />
      <div className="flex-1 space-y-2">
        <span className="block h-3 w-24 animate-pulse rounded bg-stroke" />
        <span className="block h-3 w-40 animate-pulse rounded bg-stroke" />
      </div>
    </li>
  );
}

export default function AsteroidTracker() {
  const { data, isLoading, isError } = useNeoFeed();
  const objects = data?.objects.slice(0, 4) ?? [];

  return (
    <section
      aria-labelledby="neo-heading"
      className="rounded-2xl border border-hairline bg-white p-6 shadow-[0_2px_8px_rgba(108,92,231,0.06)]"
    >
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-mars-light">
        <span aria-hidden="true">☄️</span> Hlídač asteroidů
      </p>

      <h2 id="neo-heading" className="mt-3 font-serif text-[22px] text-ink">
        Dnes: {formatCzDate(todayIso())}
      </h2>

      <hr className="my-4 border-hairline" />

      <ul className="flex flex-col gap-3">
        {isLoading && Array.from({ length: 3 }).map((_, i) => <RowSkeleton key={i} />)}
        {!isLoading && objects.map((neo) => <NeoRow key={neo.id} neo={neo} />)}
      </ul>

      {isError && (
        <p role="status" className="text-xs text-muted">
          Data o asteroidech se nepodařilo načíst.
        </p>
      )}
      {!isLoading && !isError && objects.length === 0 && (
        <p role="status" className="text-xs text-muted">
          Pro dnešní den nejsou hlášené žádné blízké objekty.
        </p>
      )}
    </section>
  );
}

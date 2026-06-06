import { quickStats } from "../data/mock";

export default function StatsBar() {
  return (
    <section
      aria-label="Rychlé statistiky"
      className="flex flex-wrap items-center gap-y-4 rounded-2xl bg-deep-space px-8 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
    >
      {quickStats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex-1 ${i > 0 ? "border-l border-white/[0.08] pl-6" : ""}`}
        >
          <p className="font-serif text-[22px] leading-none text-canvas">{stat.value}</p>
          <p
            className={`mt-2 text-[9px] font-semibold uppercase tracking-[0.12em] ${stat.accent}`}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
}

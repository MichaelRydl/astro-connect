import Hero from "../components/Hero";
import MarsSection from "../components/MarsSection";
import AsteroidTracker from "../components/AsteroidTracker";
import EpicCard from "../components/EpicCard";
import StatsBar from "../components/StatsBar";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-10 lg:px-0">
      <Hero />

      {/* Hlavní obsah 2/3 + sidebar 1/3 */}
      <div className="mt-12 grid grid-cols-1 gap-x-[46px] gap-y-10 lg:grid-cols-[1fr_410px]">
        {/* Levý sloupec */}
        <div className="flex flex-col gap-10">
          <MarsSection />
          <StatsBar />
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-8">
          <AsteroidTracker />
          <EpicCard />
        </aside>
      </div>
    </main>
  );
}

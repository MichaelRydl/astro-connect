import AsteroidTracker from "../components/AsteroidTracker";

export default function AsteroidsPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-10 lg:px-0">
      <div className="max-w-2xl">
        <AsteroidTracker limit={20} />
      </div>
    </main>
  );
}

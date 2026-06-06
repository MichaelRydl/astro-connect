import MarsSection from "../components/MarsSection";

export default function MarsPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-10 lg:px-0">
      <MarsSection limit={12} wide />
    </main>
  );
}

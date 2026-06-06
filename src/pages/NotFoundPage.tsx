import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-6 py-24 text-center">
      <p className="font-serif text-6xl text-ink">404</p>
      <p className="max-w-md text-sm text-muted">
        Tahle stránka se ztratila v kosmu. Zkus to z domovské obrazovky.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.03]"
      >
        Zpět domů
      </Link>
    </main>
  );
}

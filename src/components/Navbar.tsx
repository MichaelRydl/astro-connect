import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Domů", to: "/", end: true },
  { label: "Mars", to: "/mars", end: false },
  { label: "Asteroidy", to: "/asteroidy", end: false },
];

/** Logo — souhvězdí složené z kroužků (viz návrh). */
function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="12" fill="none" stroke="url(#logoGrad)" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="2" fill="#a78bfa" opacity="0.9" />
      <circle cx="18" cy="12" r="1.5" fill="#6c5ce7" opacity="0.7" />
      <circle cx="14" cy="18" r="1.8" fill="#a78bfa" opacity="0.8" />
      <circle cx="7" cy="16" r="1" fill="#6c5ce7" opacity="0.5" />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6c5ce7" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function desktopLinkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? "rounded-full bg-primary/15 px-4 py-1.5 text-[13px] font-medium text-accent"
    : "rounded-full px-4 py-1.5 text-[13px] font-medium text-muted transition-colors hover:text-canvas";
}

function mobileLinkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? "block rounded-lg bg-primary/15 px-4 py-2.5 text-sm font-medium text-accent"
    : "block rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-canvas";
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-deep-space/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 lg:px-0">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <Logo />
          <span className="font-serif text-xl text-canvas">AstroConnect</span>
        </Link>

        {/* Navigace (desktop) */}
        <ul className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink to={item.to} end={item.end} className={desktopLinkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Pravé ikony */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Nastavení"
            className="hidden size-8 items-center justify-center rounded-full bg-white/[0.06] text-muted transition-colors hover:text-canvas sm:flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10l2 2M19 5l-2 2M5 19l2-2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Profil"
            className="flex size-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-accent"
          >
            M
          </button>

          {/* Hamburger (mobil) */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex size-8 items-center justify-center rounded-full bg-white/[0.06] text-muted transition-colors hover:text-canvas md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Navigace (mobil) */}
      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-white/5 px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

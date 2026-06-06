const links = ["API Docs", "GitHub", "Kontakt"];

export default function Footer() {
  return (
    <footer className="bg-deep-space">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-0">
        <div>
          <p className="font-serif text-[17px] text-canvas">AstroConnect</p>
          <p className="mt-1 text-[10px] text-muted">
            Powered by NASA Open APIs — APOD · Mars Rover Photos · NeoWs · EPIC
          </p>
        </div>

        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-[11px] font-medium text-muted transition-colors hover:text-canvas"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

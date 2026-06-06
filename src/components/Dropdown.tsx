import { useEffect, useRef, useState } from "react";

export interface DropdownItem {
  key: string;
  label: string;
  active?: boolean;
  onSelect: () => void;
}

export default function Dropdown({
  label,
  items,
  disabled = false,
}: {
  label: string;
  items: DropdownItem[];
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-lg border border-stroke bg-white px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-mars/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {label}
        <span
          className={`text-[10px] text-muted-soft transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-[calc(100%+6px)] z-20 max-h-64 min-w-44 overflow-auto rounded-xl border border-hairline bg-white p-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.14)]"
        >
          {items.map((item) => (
            <li key={item.key} role="option" aria-selected={item.active}>
              <button
                type="button"
                onClick={() => {
                  item.onSelect();
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                  item.active
                    ? "bg-mars/10 font-semibold text-mars"
                    : "text-ink hover:bg-canvas"
                }`}
              >
                {item.label}
                {item.active && <span aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

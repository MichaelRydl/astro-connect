import { create } from "zustand";

// Klientský stav filtrů Mars sekce. Server data drží TanStack Query —
// zde žije jen volba uživatele (sol + kamera).
interface MarsFilterState {
  /** Vybraný sol; null = nejnovější. */
  sol: number | null;
  /** Abbreviation kamery (camera.name); null = všechny. */
  cameraName: string | null;
  setSol: (sol: number | null) => void;
  setCamera: (cameraName: string | null) => void;
}

export const useMarsFilters = create<MarsFilterState>((set) => ({
  sol: null,
  cameraName: null,
  // Kamery se mezi soly liší → při změně solu volbu kamery resetujeme.
  setSol: (sol) => set({ sol, cameraName: null }),
  setCamera: (cameraName) => set({ cameraName }),
}));

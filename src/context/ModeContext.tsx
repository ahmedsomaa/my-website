import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type UIMode = "polished" | "raw";

interface ModeCtx {
  mode: UIMode;
  toggle: () => void;
  setMode: (m: UIMode) => void;
}

const Ctx = createContext<ModeCtx | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<UIMode>(() => {
    if (typeof window === "undefined") return "polished";
    return (localStorage.getItem("ui-mode") as UIMode) || "polished";
  });

  useEffect(() => {
    localStorage.setItem("ui-mode", mode);
    const root = document.documentElement;
    root.classList.toggle("raw-mode", mode === "raw");
    root.classList.toggle("polished", mode === "polished");
  }, [mode]);

  return (
    <Ctx.Provider value={{ mode, toggle: () => setMode(mode === "polished" ? "raw" : "polished"), setMode }}>
      {children}
    </Ctx.Provider>
  );
}

export function useMode() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
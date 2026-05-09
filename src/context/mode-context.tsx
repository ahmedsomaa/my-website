import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type UIMode = "polished" | "raw";
export type Theme = "light" | "dark";

interface ModeCtx {
  mode: UIMode;
  toggle: () => void;
  setMode: (m: UIMode) => void;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ModeCtx | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<UIMode>(() => {
    if (typeof window === "undefined") return "polished";
    return (localStorage.getItem("ui-mode") as UIMode) || "polished";
  });

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("ui-theme") as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    return "dark";
  });

  useEffect(() => {
    localStorage.setItem("ui-mode", mode);
    const root = document.documentElement;
    root.classList.toggle("raw-mode", mode === "raw");
    root.classList.toggle("polished", mode === "polished");
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("ui-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Ctx.Provider
      value={{
        mode,
        toggle: () => setMode(mode === "polished" ? "raw" : "polished"),
        setMode,
        theme,
        toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
        setTheme,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useMode() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
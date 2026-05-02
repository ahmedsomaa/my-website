import { useMode } from "@/context/mode-context";

export default function SiteFooter() {
  const { mode } = useMode();
  return (
    <footer className="border-t hairline mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs font-mono-pair text-muted-foreground">
        <p className="uppercase tracking-[0.2em]">
          Crafting elegant software <span className="mx-2 text-foreground/30">|</span> som3aware — 2026
        </p>
        <p className="uppercase tracking-[0.2em]">
          Tanta, EG <span className="mx-2 text-foreground/30">·</span> 31.0°N 30.9°E
        </p>
        {mode === "raw" && (
          <p className="uppercase tracking-[0.2em] text-foreground/50">
            mode: raw / hex: #141414 / grid: 24px
          </p>
        )}
      </div>
    </footer>
  );
}
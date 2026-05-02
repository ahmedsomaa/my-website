import { NavLink, Link } from "react-router-dom";
import { useMode } from "@/context/ModeContext";
import { Code2, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "00 / index" },
  { to: "/about", label: "01 / about" },
  { to: "/projects", label: "02 / projects" },
];

export default function SiteHeader() {
  const { mode, toggle } = useMode();
  return (
    <header className="sticky top-0 z-30 border-b hairline bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-14 flex items-center justify-between">
        <Link to="/" className="font-display text-sm md:text-base tracking-wider lowercase">
          som3aware
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-mono-pair">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative transition-colors hover:text-foreground ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <span className="inline-flex items-center gap-2">
                  {isActive && <span className="h-1 w-1 bg-foreground" />}
                  {l.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={toggle}
          className="group inline-flex items-center gap-2 border hairline px-3 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono-pair hover:bg-foreground hover:text-background transition-colors"
          aria-label="Toggle code-to-design mode"
        >
          {mode === "polished" ? (
            <>
              <Code2 className="h-3.5 w-3.5" strokeWidth={1.25} />
              <span>view: design</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.25} />
              <span>view: code</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
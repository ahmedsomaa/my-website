import { PROJECTS } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { usePageAccent, PAGE_ACCENTS } from "@/hooks/usePageAccent";

export default function Projects() {
  usePageAccent(PAGE_ACCENTS.projects);
  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-[420px] grid-dot pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[420px] accent-glow pointer-events-none" />
      <header className="relative mb-16 md:mb-20">
        <p className="font-mono-pair text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          02 / projects — ls -la ~/work
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-4xl">
          a <span className="text-accent-page">directory</span> of small, considered things.
        </h1>
      </header>

      <div className="border-t hairline grid grid-cols-12 font-mono-pair text-[10px] uppercase tracking-[0.25em] text-muted-foreground py-3">
        <div className="col-span-1">id</div>
        <div className="col-span-5 md:col-span-4">project</div>
        <div className="hidden md:block md:col-span-4">stack</div>
        <div className="col-span-3 md:col-span-2">role</div>
        <div className="col-span-3 md:col-span-1 text-right">status</div>
      </div>

      <ul className="border-t hairline">
        {PROJECTS.map((p) => (
          <li key={p.id} className="border-b hairline group">
            <a
              href={p.url ?? "#"}
              target={p.url ? "_blank" : undefined}
              rel="noreferrer"
              className="grid grid-cols-12 items-start gap-3 py-6 md:py-8 transition-colors hover:bg-foreground/5"
            >
              <div className="col-span-1 font-mono-pair text-xs text-muted-foreground">{p.id}</div>
              <div className="col-span-11 md:col-span-4">
                <h3 className="font-display uppercase text-xl md:text-2xl flex items-center gap-2">
                  {p.title}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" strokeWidth={1.25} />
                </h3>
                <p className="mt-2 font-mono-pair text-sm text-muted-foreground max-w-md">
                  {p.summary}
                </p>
                <p className="mt-2 font-mono-pair text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  {p.year}
                </p>
              </div>
              <div className="hidden md:flex md:col-span-4 flex-wrap gap-1.5 pt-1">
                {p.stack.map((s) => (
                  <span key={s} className="border hairline px-2 py-1 font-mono-pair text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
              <div className="col-span-8 md:col-span-2 font-mono-pair text-xs text-muted-foreground pt-1">
                {p.role}
              </div>
              <div className="col-span-4 md:col-span-1 text-right pt-1">
                <StatusPill status={p.status} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusPill({ status }: { status: "shipped" | "wip" | "archived" }) {
  const map: Record<typeof status, { label: string; className: string }> = {
    shipped: { label: "● shipped", className: "text-ts-blue" },
    wip: { label: "◐ wip", className: "text-foreground" },
    archived: { label: "○ archived", className: "text-muted-foreground" },
  };
  const { label, className } = map[status];
  return (
    <span className={`inline-block font-mono-pair text-[10px] uppercase tracking-[0.2em] ${className}`}>
      {label}
    </span>
  );
}
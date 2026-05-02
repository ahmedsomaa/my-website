import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { usePageAccent, PAGE_ACCENTS } from "@/hooks/use-page-accent";
import type { CaseStudy } from "@/types/case-study";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";
import { getAllShowcaseProjects } from "@/data/showcase-projects";
import { getAllCaseStudiesSorted } from "@/lib/case-studies";

function hostWithoutWww(host: string): string {
  const h = host.toLowerCase();
  return h.startsWith("www.") ? h.slice(4) : h;
}

function normalizeComparableUrl(url: string): string {
  try {
    const u = new URL(url.trim());
    u.hash = "";
    const path = u.pathname.replace(/\/+$/, "") || "";
    const host = hostWithoutWww(u.hostname);
    return `${u.protocol}//${host}${path}${u.search}`.toLowerCase();
  } catch {
    return url.trim().toLowerCase().replace(/\/+$/, "");
  }
}

function portfolioDescriptionForCaseStudy(study: CaseStudy): string {
  for (const p of PORTFOLIO_PROJECTS) {
    const projectUrl = normalizeComparableUrl(p.url);
    if (study.liveUrl && normalizeComparableUrl(study.liveUrl) === projectUrl) {
      return p.description;
    }
    if (study.repoUrl && normalizeComparableUrl(study.repoUrl) === projectUrl) {
      return p.description;
    }
  }
  return study.oneLiner;
}

function showcaseUrlsCoveredByCaseStudies(
  studies: ReturnType<typeof getAllCaseStudiesSorted>,
): Set<string> {
  const urls = new Set<string>();
  for (const s of studies) {
    if (s.liveUrl) urls.add(normalizeComparableUrl(s.liveUrl));
    if (s.repoUrl) urls.add(normalizeComparableUrl(s.repoUrl));
  }
  return urls;
}

type WorkRow =
  | {
      kind: "case-study";
      key: string;
      idLabel: string;
      title: string;
      description: string;
      date: string;
      stack: string[];
      href: string;
      external: false;
    }
  | {
      kind: "showcase";
      key: string;
      idLabel: string;
      title: string;
      description: string;
      date: string;
      stack: string[];
      href: string;
      external: true;
    };

function buildWorkRows(): WorkRow[] {
  const studies = getAllCaseStudiesSorted();
  const coveredShowcaseUrls = showcaseUrlsCoveredByCaseStudies(studies);
  const showcase = getAllShowcaseProjects().filter(
    (p) => !coveredShowcaseUrls.has(normalizeComparableUrl(p.url)),
  );

  const studyRows: WorkRow[] = studies.map((s) => ({
    kind: "case-study",
    key: `cs-${s.slug}`,
    idLabel: String(s.order).padStart(2, "0"),
    title: s.title,
    description: portfolioDescriptionForCaseStudy(s),
    date: s.date,
    stack: s.techTags,
    href: `/work/${s.slug}`,
    external: false,
  }));

  const offset = studies.length;
  const showcaseRows: WorkRow[] = showcase.map((p, i) => ({
    kind: "showcase",
    key: `p-${p.id}`,
    idLabel: String(offset + i + 1).padStart(2, "0"),
    title: p.title,
    description: p.description,
    date: p.date,
    stack: p.stack,
    href: p.url,
    external: true,
  }));

  return [...studyRows, ...showcaseRows];
}

export default function WorkIndex() {
  usePageAccent(PAGE_ACCENTS.work);
  const rows = buildWorkRows();

  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-[420px] grid-dot pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[420px] accent-glow pointer-events-none" />
      <header className="relative mb-16 md:mb-20">
        <p className="font-mono-pair text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          02 / work — ls -la ~/work
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-4xl">
          a <span className="text-accent-page">directory</span> of small,
          considered things.
        </h1>
      </header>

      <div className="border-t hairline grid grid-cols-12 font-mono-pair text-[10px] uppercase tracking-[0.25em] text-muted-foreground py-3">
        <div className="col-span-1">id</div>
        <div className="col-span-5 md:col-span-6">project</div>
        <div className="col-span-3 md:col-span-3">stack</div>
        <div className="col-span-3 md:col-span-2 text-right">date</div>
      </div>

      <ul className="border-t hairline">
        {rows.map((row) =>
          row.external ? (
            <li key={row.key} className="border-b hairline group">
              <a
                href={row.href}
                target="_blank"
                rel="noreferrer"
                className="grid grid-cols-12 items-start gap-3 py-6 md:py-8 transition-colors hover:bg-foreground/5"
              >
                <RowCells row={row} />
              </a>
            </li>
          ) : (
            <li key={row.key} className="border-b hairline group">
              <Link
                to={row.href}
                className="grid grid-cols-12 items-start gap-3 py-6 md:py-8 transition-colors hover:bg-foreground/5"
              >
                <RowCells row={row} />
              </Link>
            </li>
          ),
        )}
      </ul>

      <p className="relative mt-10 font-mono-pair text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">
          ← index
        </Link>
      </p>
    </div>
  );
}

function StackTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 pt-0.5 md:pt-1 justify-start">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block font-mono-pair text-[10px] uppercase tracking-[0.15em] text-muted-foreground border hairline px-1.5 py-0.5"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function RowCells({ row }: { row: WorkRow }) {
  return (
    <>
      <div className="col-span-1 font-mono-pair text-xs text-muted-foreground">
        {row.idLabel}
      </div>
      <div className="col-span-5 md:col-span-6 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-display uppercase text-xl md:text-2xl leading-tight">{row.title}</h3>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            strokeWidth={1.25}
          />
        </div>
        <p className="mt-2 font-ntype text-sm text-muted-foreground leading-relaxed max-w-xl">
          {row.description}
        </p>
      </div>
      <div className="col-span-3 md:col-span-3">
        <StackTags tags={row.stack} />
      </div>
      <div className="col-span-3 md:col-span-2 text-right font-mono-pair text-xs text-muted-foreground pt-0.5 md:pt-1 tabular-nums">
        {row.date}
      </div>
    </>
  );
}

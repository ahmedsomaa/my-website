import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { usePageAccent, PAGE_ACCENTS } from "@/hooks/use-page-accent";
import type { CaseStudy } from "@/types/case-study";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";
import { getAllShowcaseProjects } from "@/data/showcase-projects";
import { getAllCaseStudiesSorted } from "@/lib/case-studies";

const PAGE_SIZE = 10;

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
    title: s.title,
    description: portfolioDescriptionForCaseStudy(s),
    date: s.date,
    stack: s.techTags,
    href: `/work/${s.slug}`,
    external: false,
  }));

  const showcaseRows: WorkRow[] = showcase.map((p) => ({
    kind: "showcase",
    key: `p-${p.id}`,
    title: p.title,
    description: p.description,
    date: p.date,
    stack: p.stack,
    href: p.url,
    external: true,
  }));

  return [...studyRows, ...showcaseRows];
}

function directoryPathParts(row: WorkRow): {
  prefix: string;
  emphasis: string;
} {
  if (!row.external) {
    const slug = row.href.replace(/^\/work\//, "");
    return { prefix: "~/work/", emphasis: `${slug}/` };
  }
  try {
    const u = new URL(row.href);
    const host = hostWithoutWww(u.hostname);
    const parts = u.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
    const leaf = parts.length ? `${parts.join("/")}/` : "";
    return {
      prefix: "~/links/",
      emphasis: leaf ? `${host}/${leaf}` : `${host}/`,
    };
  } catch {
    return {
      prefix: "~/links/",
      emphasis: `${row.title.toLowerCase().replace(/\s+/g, "-")}/`,
    };
  }
}

function StackChips({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 pt-0.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block font-mono-pair text-[10px] uppercase tracking-[0.12em] text-muted-foreground border hairline px-1.5 py-0.5"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function WorkLineRow({
  row,
  globalIndex,
}: {
  row: WorkRow;
  globalIndex: number;
}) {
  const { prefix, emphasis } = directoryPathParts(row);
  const rowClass =
    "group flex gap-3 md:gap-4 py-6 md:py-8 transition-colors hover:bg-foreground/5";

  const inner = (
    <>
      <span className="font-mono-pair text-xs text-muted-foreground tabular-nums shrink-0 w-7 pt-1">
        {String(globalIndex).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-2 flex-1">
            <p className="font-mono-pair text-sm md:text-base text-foreground leading-snug normal-case">
              <span className="text-muted-foreground">{prefix}</span>
              <span className="text-accent-page">{emphasis}</span>
            </p>
            <h2 className="font-display text-lg md:text-2xl uppercase leading-tight">
              {row.title}
            </h2>
          </div>
          <ArrowUpRight
            className="shrink-0 h-4 w-4 md:h-5 md:w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground mt-0.5"
            strokeWidth={1.25}
          />
        </div>
        {row.description ? (
          <p className="font-ntype text-[0.9375rem] md:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {row.description}
          </p>
        ) : null}
        <StackChips tags={row.stack} />
        <p className="font-mono-pair text-[10px] md:text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {row.date}
        </p>
      </div>
    </>
  );

  if (row.external) {
    return (
      <a href={row.href} target="_blank" rel="noreferrer" className={rowClass}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={row.href} className={rowClass}>
      {inner}
    </Link>
  );
}

export default function WorkIndex() {
  usePageAccent(PAGE_ACCENTS.work);
  const rows = useMemo(() => buildWorkRows(), []);
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => {
    if (!rows.length) return 1;
    return Math.ceil(rows.length / PAGE_SIZE);
  }, [rows.length]);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const clampedPage = Math.min(Math.max(1, page), totalPages);

  const pagedRows = useMemo(() => {
    if (!rows.length) return [];
    const start = (clampedPage - 1) * PAGE_SIZE;
    return rows.slice(start, start + PAGE_SIZE);
  }, [rows, clampedPage]);

  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-[420px] building-blocks pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[420px] accent-glow pointer-events-none" />
      <header className="relative mb-16 md:mb-20">
        <p className="font-mono-pair text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          02 / work — ls -la ~/work
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-4xl">
          a <span className="text-accent-page">directory</span> of products
          I&apos;ve built.
        </h1>
      </header>

      <div className="border-t hairline">
        {rows.length === 0 ? (
          <div className="py-10 font-mono-pair text-xs uppercase tracking-[0.25em] text-muted-foreground">
            // no projects listed
          </div>
        ) : (
          <ul className="list-none m-0 border-x border-b hairline bg-background">
            {pagedRows.map((row, i) => {
              const globalIndex = (clampedPage - 1) * PAGE_SIZE + i + 1;
              return (
                <li key={row.key} className="border-b hairline last:border-b-0">
                  <WorkLineRow row={row} globalIndex={globalIndex} />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {rows.length > PAGE_SIZE && (
        <nav
          className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t hairline pt-6 font-mono-pair text-xs uppercase tracking-[0.2em] text-muted-foreground"
          aria-label="Work list pagination"
        >
          <button
            type="button"
            disabled={clampedPage <= 1}
            onClick={() =>
              setPage((x) => {
                const c = Math.min(Math.max(1, x), totalPages);
                return Math.max(1, c - 1);
              })
            }
            className="hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            ← prev
          </button>
          <span className="tabular-nums">
            page {clampedPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={clampedPage >= totalPages}
            onClick={() =>
              setPage((x) => {
                const c = Math.min(Math.max(1, x), totalPages);
                return Math.min(totalPages, c + 1);
              })
            }
            className="hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            next →
          </button>
        </nav>
      )}

      <div className="relative mt-10 font-mono-pair text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">
          ← index
        </Link>
      </div>
    </div>
  );
}

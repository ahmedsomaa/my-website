import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./section-header";
import { getFeaturedCaseStudies } from "@/lib/case-studies";
import { isGithubUrl } from "@/lib/url-helpers";

const CASE_STUDY_COVERS: Record<string, string> = {
  "editor-setup": "/images/editor-setup-cover.png",
  hivo: "/images/hivo-cover.png",
  reconciled: "/images/reconciled-cover.png",
  "covid-tracker": "/images/covid-tracker-cover.png",
  "sharp-studio": "/images/sharp-studio-cover.png",
};

export default function FeaturedWork() {
  const featured = getFeaturedCaseStudies(3);

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <SectionHeader index="01" label="work" title="Selected work" />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((study) => {
          const repoHref =
            study.repoUrl ??
            (isGithubUrl(study.liveUrl) ? study.liveUrl : null);
          const liveHref =
            study.liveUrl && !isGithubUrl(study.liveUrl) ? study.liveUrl : null;
          const coverSrc = CASE_STUDY_COVERS[study.slug];

          return (
            <li
              key={study.slug}
              className="relative border hairline bg-background p-6 md:p-8 flex flex-col min-h-[280px] overflow-hidden"
            >
              <Link
                to={`/work/${study.slug}`}
                aria-label={`Open ${study.title} case study`}
                className="absolute inset-0 z-10"
              />
              {coverSrc ? (
                <div className="relative z-0 mb-5 overflow-hidden border hairline bg-muted/40">
                  <img
                    src={coverSrc}
                    alt={`${study.title} project preview`}
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : null}
              <h3 className="font-display text-xl md:text-2xl uppercase leading-tight">
                {study.title}
              </h3>
              <p className="mt-2 font-mono-pair text-[10px] uppercase tracking-[0.2em] text-muted-foreground tabular-nums">
                {study.date}
              </p>
              <p className="mt-3 flex-1 font-ntype text-sm text-muted-foreground leading-relaxed">
                {study.oneLiner}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {study.techTags.map((tag) => (
                  <span
                    key={tag}
                    className="border hairline px-2 py-1 font-mono-pair text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="relative z-20 mt-5 flex flex-wrap items-center gap-4 font-mono-pair text-[10px] uppercase tracking-[0.15em]">
                {liveHref ? (
                  <a
                    href={liveHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-ts-blue hover:underline"
                  >
                    Live
                  </a>
                ) : null}
                {repoHref && repoHref !== liveHref ? (
                  <a
                    href={repoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-ts-blue hover:underline"
                  >
                    Repo
                  </a>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 font-mono-pair text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
        >
          → all work
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
        </Link>
      </div>
    </section>
  );
}

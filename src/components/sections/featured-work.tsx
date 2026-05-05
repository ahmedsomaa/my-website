import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./section-header";
import { getFeaturedCaseStudies } from "@/lib/case-studies";
import { isGithubUrl } from "@/lib/url-helpers";

export default function FeaturedWork() {
  const featured = getFeaturedCaseStudies(3);

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <SectionHeader index="01" label="work" title="Featured work" />

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border hairline">
        {featured.map((study) => {
          const repoHref =
            study.repoUrl ??
            (isGithubUrl(study.liveUrl) ? study.liveUrl : null);

          return (
            <li
              key={study.slug}
              className="bg-background p-6 md:p-8 flex flex-col min-h-[280px]"
            >
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
              <p className="mt-4 font-mono-pair text-xs text-ts-blue uppercase tracking-[0.15em]">
                {study.impactMetric}
              </p>
              {repoHref ? (
                <div className="mt-3 font-mono-pair text-[10px] uppercase tracking-[0.15em]">
                  <a
                    href={repoHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-ts-blue hover:underline"
                  >
                    Repository
                  </a>
                </div>
              ) : null}
              <div className="mt-8 pt-4 border-t hairline border-border/60">
                <Link
                  to={`/work/${study.slug}`}
                  className="group inline-flex items-center gap-2 font-mono-pair text-xs uppercase tracking-[0.25em] text-foreground hover:text-ts-blue transition-colors"
                >
                  Read case study
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.25}
                  />
                </Link>
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

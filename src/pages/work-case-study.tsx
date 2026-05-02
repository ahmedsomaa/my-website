import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { usePageAccent, PAGE_ACCENTS } from "@/hooks/use-page-accent";
import { getCaseStudyBySlug, getNextCaseStudySlug } from "@/lib/case-studies";
import NotFound from "./not-found";

export default function WorkCaseStudy() {
  usePageAccent(PAGE_ACCENTS.work);
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!study) {
    return <NotFound />;
  }

  const nextSlug = getNextCaseStudySlug(study.slug);

  return (
    <article className="relative mx-auto max-w-3xl px-6 md:px-10 pt-16 pb-20">
      <div className="absolute inset-x-0 top-0 h-[280px] grid-dot pointer-events-none opacity-40" />

      <header className="relative mb-16 md:mb-20">
        <p className="font-mono-pair text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          work / {study.slug}
        </p>
        <h1 className="font-display text-3xl md:text-5xl uppercase leading-tight">{study.title}</h1>
        <p className="mt-6 font-ntype text-base md:text-lg text-muted-foreground leading-relaxed">{study.oneLiner}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {study.techTags.map((tag) => (
            <span
              key={tag}
              className="border hairline px-2 py-1 font-mono-pair text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        {study.liveUrl && (
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 border hairline px-5 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair hover:bg-foreground hover:text-background transition-colors"
          >
            View live
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
          </a>
        )}
      </header>

      <section className="relative mb-14">
        <h2 className="font-mono-pair text-xs uppercase tracking-[0.25em] text-ts-blue mb-4">{study.problem.heading}</h2>
        <p className="font-ntype text-sm md:text-base text-muted-foreground leading-relaxed">{study.problem.description}</p>
      </section>

      <section className="relative mb-14">
        <h2 className="font-mono-pair text-xs uppercase tracking-[0.25em] text-ts-blue mb-4">{study.myRole.heading}</h2>
        <p className="font-ntype text-sm md:text-base text-muted-foreground leading-relaxed">{study.myRole.description}</p>
      </section>

      <section className="relative mb-14">
        <h2 className="font-mono-pair text-xs uppercase tracking-[0.25em] text-ts-blue mb-4">{study.solution.heading}</h2>
        <p className="font-ntype text-sm md:text-base text-muted-foreground leading-relaxed">{study.solution.description}</p>
      </section>

      <section className="relative mb-16">
        <h2 className="font-mono-pair text-xs uppercase tracking-[0.25em] text-ts-blue mb-4">{study.impact.heading}</h2>
        <ul className="mt-4 space-y-3 font-ntype text-sm md:text-base text-muted-foreground leading-relaxed">
          {study.impact.metrics.map((m) => (
            <li key={m} className="flex gap-3">
              <span className="text-ts-blue font-mono-pair text-xs shrink-0 mt-0.5">▸</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-ntype text-sm md:text-base text-muted-foreground leading-relaxed">{study.impact.description}</p>
      </section>

      <nav className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-10 border-t hairline">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 font-mono-pair text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.25} />
          Back to work
        </Link>
        {nextSlug ? (
          <Link
            to={`/work/${nextSlug}`}
            className="inline-flex items-center gap-2 font-mono-pair text-xs uppercase tracking-[0.25em] text-foreground hover:text-ts-blue transition-colors"
          >
            Next project
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
          </Link>
        ) : null}
      </nav>
    </article>
  );
}

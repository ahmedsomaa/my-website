import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { ProgressiveImage } from "@/components/progressive-image";
import { HOME_MOTION_EASE } from "@/components/home-section-motion";
import SectionHeader from "./section-header";
import { getFeaturedCaseStudies } from "@/lib/case-studies";
import { isGithubUrl } from "@/lib/url-helpers";

const CARD_IMAGE_SIZES =
  "(min-width: 1280px) 520px, (min-width: 768px) calc(50vw - 120px), calc(100vw - 100px)";

const CASE_STUDY_CARDS: Record<string, { src: string; srcSet: string }> = {
  "editor-setup": {
    src: "/images/cards/editor-setup-1080.webp",
    srcSet:
      "/images/cards/editor-setup-640.webp 640w, /images/cards/editor-setup-1080.webp 1080w",
  },
  hivo: {
    src: "/images/cards/hivo-1080.webp",
    srcSet: "/images/cards/hivo-640.webp 640w, /images/cards/hivo-1080.webp 1080w",
  },
  reconciled: {
    src: "/images/cards/reconciled-756.webp",
    srcSet:
      "/images/cards/reconciled-640.webp 640w, /images/cards/reconciled-756.webp 756w",
  },
  "sharp-studio": {
    src: "/images/cards/sharp-studio-1080.webp",
    srcSet:
      "/images/cards/sharp-studio-640.webp 640w, /images/cards/sharp-studio-1080.webp 1080w",
  },
};

export default function FeaturedWork() {
  const featured = getFeaturedCaseStudies();
  const reduceMotion = useReducedMotion() === true;

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <SectionHeader index="01" label="work" title="Selected work" />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((study, i) => {
          const repoHref =
            study.repoUrl ??
            (isGithubUrl(study.liveUrl) ? study.liveUrl : null);
          const liveHref =
            study.liveUrl && !isGithubUrl(study.liveUrl) ? study.liveUrl : null;
          const cover = CASE_STUDY_CARDS[study.slug];

          return (
            <m.li
              key={study.slug}
              className="relative border hairline bg-background p-6 md:p-8 flex flex-col min-h-[280px] overflow-hidden"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                ease: HOME_MOTION_EASE,
                delay: reduceMotion ? 0 : 0.06 + i * 0.1,
              }}
            >
              <Link
                to={`/work/${study.slug}`}
                aria-label={`Open ${study.title} case study`}
                className="absolute inset-0 z-10"
              />
              {cover ? (
                <div className="relative z-0 mb-5 overflow-hidden border hairline bg-muted/40">
                  <ProgressiveImage
                    src={cover.src}
                    srcSet={cover.srcSet}
                    sizes={CARD_IMAGE_SIZES}
                    alt={`${study.title} project preview`}
                    wrapperClassName="aspect-square w-full"
                    className="h-full w-full object-cover"
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
            </m.li>
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

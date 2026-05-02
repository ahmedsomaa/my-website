import { Link } from "react-router-dom";
import SectionHeader from "@/components/sections/section-header";
import { TIMELINE, INTERESTS, ABOUT_CONTENT, BUILD_FLOW } from "@/data/portfolio";
import { GraduationCap, Briefcase } from "lucide-react";
import { usePageAccent, PAGE_ACCENTS } from "@/hooks/use-page-accent";

export default function About() {
  usePageAccent(PAGE_ACCENTS.about);
  const experience = TIMELINE.filter((t) => t.kind === "experience");
  const education = TIMELINE.filter((t) => t.kind === "education");

  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-[420px] grid-vercel-dense pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[420px] accent-glow pointer-events-none" />
      <header className="relative mb-16 md:mb-24">
        <p className="font-mono-pair text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          01 / about — cd ~/about
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-4xl">
          a <span className="text-accent-page">software engineer</span> who designs, and a designer who ships.
        </h1>
      </header>

      <section className="relative mb-20 max-w-3xl space-y-6">
        <SectionHeader index="02" label="philosophy" title="Dev philosophy" />
        <p className="font-ntype text-sm md:text-base leading-relaxed text-muted-foreground">{ABOUT_CONTENT.philosophy}</p>
      </section>

      <section className="relative mb-20">
        <SectionHeader index="03" label="layers" title="Current toolchain" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border hairline">
          {[
            { label: "Data layer", body: BUILD_FLOW[0].tech },
            { label: "Logic layer", body: BUILD_FLOW[1].tech },
            { label: "Presentation", body: BUILD_FLOW[2].tech },
            { label: "Infra layer", body: BUILD_FLOW[3].tech },
          ].map((layer) => (
            <div key={layer.label} className="bg-background p-5 md:p-6">
              <p className="font-mono-pair text-[10px] uppercase tracking-[0.25em] text-ts-blue mb-3">{layer.label}</p>
              <p className="font-ntype text-sm">{layer.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mb-20 max-w-3xl space-y-4">
        <SectionHeader index="04" label="lesson" title="One full-stack mistake" />
        <p className="font-ntype text-sm md:text-base leading-relaxed text-muted-foreground">{ABOUT_CONTENT.mistake}</p>
      </section>

      <section className="relative mb-20 max-w-3xl space-y-4">
        <SectionHeader index="05" label="collab" title="Collaboration" />
        <p className="font-ntype text-sm md:text-base leading-relaxed text-muted-foreground">{ABOUT_CONTENT.collaboration}</p>
        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 border hairline px-4 py-2.5 text-xs uppercase tracking-[0.2em] font-mono-pair hover:bg-foreground hover:text-background transition-colors"
          >
            View work
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border hairline px-4 py-2.5 text-xs uppercase tracking-[0.2em] font-mono-pair text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>
      </section>

      <Timeline
        title="Experience"
        icon={<Briefcase className="h-4 w-4" strokeWidth={1.25} />}
        items={experience}
      />
      <Timeline
        title="Education"
        icon={<GraduationCap className="h-4 w-4" strokeWidth={1.25} />}
        items={education}
      />

      <section className="mt-24">
        <SectionHeader index="08" label="interests" title="Off-screen" />
        <ul className="grid md:grid-cols-2 gap-px bg-border border hairline">
          {INTERESTS.map((i, idx) => (
            <li key={i} className="bg-background p-5 md:p-6 font-mono-pair text-sm flex gap-4">
              <span className="text-muted-foreground">{String(idx + 1).padStart(2, "0")}</span>
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Timeline({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: typeof TIMELINE;
}) {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8 font-mono-pair text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {icon}
        <span>{title}</span>
        <span className="flex-1 h-px bg-border ml-2" />
      </div>
      <ol className="relative border-l hairline pl-6 md:pl-10 space-y-10">
        {items.map((item) => (
          <li key={item.year + item.title} className="relative">
            <span className="absolute -left-[7px] md:-left-[11px] top-2 h-2.5 w-2.5 bg-background border hairline" />
            <p className="font-mono-pair text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{item.year}</p>
            <h3 className="mt-1 font-display uppercase text-lg md:text-2xl">{item.title}</h3>
            <p className="mt-1 font-mono-pair text-sm text-foreground/80">
              <span className="text-muted-foreground">@</span> {item.org}
            </p>
            <p className="mt-3 max-w-2xl font-mono-pair text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

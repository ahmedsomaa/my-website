import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./section-header";

const EXPERIENCE_ITEMS = [
  {
    role: "Growth Engineer",
    company: "Eignspaces",
    period: "2024 - Present",
    description:
      "Own high-impact full-stack features across marketplace and financial products, contributing to systems that drove acquisition and improving delivery through refactoring and analytics-driven decisions.",
  },
  {
    role: "Software Engineer",
    company: "VOIS (Vodafone Intelligent Solutions)",
    period: "2020 - 2021",
    description:
      "Built and improved frontend systems for enterprise tools, delivering dashboards, component libraries, and internal platforms used in call center operations at scale.",
  },
] as const;

export default function SelectedExperienceSnapshot() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <SectionHeader
        index="03"
        label="experience"
        title="Selected experience"
      />

      <ul className="relative space-y-8 md:space-y-10">
        <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-border" />
        {EXPERIENCE_ITEMS.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <li
              key={`${item.company}-${item.period}`}
              className="relative grid grid-cols-1 md:grid-cols-2 md:gap-12"
            >
              <div
                className={
                  isLeft ? "md:col-start-1 md:text-right" : "md:col-start-2"
                }
              >
                <article className="border hairline bg-background p-6 md:p-7">
                  <h3 className="font-display text-lg md:text-xl uppercase leading-snug">
                    {item.role} - {item.company}
                  </h3>
                  <p className="mt-2 font-mono-pair text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {item.period}
                  </p>
                  <p className="mt-5 font-ntype text-sm text-muted-foreground leading-relaxed text-left">
                    {item.description}
                  </p>
                </article>
              </div>
              <span className="hidden md:block absolute left-1/2 top-8 h-3 w-3 -translate-x-1/2 rounded-full border hairline bg-background" />
            </li>
          );
        })}
      </ul>

      <div className="mt-8 font-mono-pair text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
        >
          View full experience
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
        </Link>
      </div>
    </section>
  );
}

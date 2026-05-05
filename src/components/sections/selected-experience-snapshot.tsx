import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./section-header";

const EXPERIENCE_ITEMS = [
  {
    company: "Eignspaces",
    role: "Growth Engineer",
    period: "01/2024 - present",
    description:
      "Owned high-impact full-stack features for Hivo, including unit management and core marketplace UI, leading to an iOS launch while introducing Cursor-driven workflows and mentoring React Native interns.",
  },
  {
    company: "Reconciled (acquired by LaborEdge)",
    role: "Full-Stack Engineer",
    period: "01/2024 - 10/2025",
    description:
      "Reduced technical debt by 40% and cut delivery time by 60% through systematic refactoring, while partnering with the CFO and teams across six countries to ship features that supported acquisition.",
  },
] as const;

export default function SelectedExperienceSnapshot() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <SectionHeader
        index="03"
        label="experience"
        title="Selected experience snapshot"
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
                    {item.company}
                  </h3>
                  <p className="mt-2 font-mono-pair text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {item.role} - {item.period}
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
          View full resume & experience
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
        </Link>
      </div>
    </section>
  );
}

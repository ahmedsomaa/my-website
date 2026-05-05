import SectionHeader from "./section-header";

const PHILOSOPHY_POINTS = [
  {
    title: "Systems thinking first",
    body: "I start with the data model and API contracts, then wrap them in UI. This prevents rework and keeps frontend and backend aligned.",
  },
  {
    title: "Product over process",
    body: "I collaborate directly with stakeholders like CFOs, founders, and designers to ship features that drive business outcomes, not just ticket completion.",
  },
  {
    title: "Speed without chaos",
    body: "I reduce technical debt systematically (40% at Reconciled) and use AI-assisted workflows (Cursor) to accelerate daily work without cutting corners.",
  },
  {
    title: "Elevate the team",
    body: "I mentor juniors, document decisions, and coordinate across time zones (6 countries) because seniority means shipping through others, not alone.",
  },
] as const;

export default function EngineeringPhilosophy() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <SectionHeader
        index="04"
        label="philosophy"
        title="Engineering philosophy"
      />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border hairline">
        {PHILOSOPHY_POINTS.map((point) => (
          <li key={point.title} className="bg-background p-6 md:p-8">
            <h3 className="font-display text-lg md:text-xl uppercase leading-snug">
              {point.title}
            </h3>
            <p className="mt-3 font-ntype text-sm text-muted-foreground leading-relaxed">
              {point.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

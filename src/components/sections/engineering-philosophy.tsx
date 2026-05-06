import SectionHeader from "./section-header";

const PHILOSOPHY_POINTS = [
  {
    title: "Systems & Experience",
    body: "I build at the intersection of scalability and usability-creating systems that are reliable, maintainable, and feel intuitive to use.",
  },
  {
    title: "Speed & Quality",
    body: "I prioritize delivering value early, then iterating to improve performance, quality, and long-term maintainability.",
  },
  {
    title: "Collaboration & Growth",
    body: "I work closely with product and design, and actively mentor others to raise both code quality and team capability.",
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

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border hairline">
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

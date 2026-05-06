import SectionHeader from "./section-header";

const TESTIMONIALS = [
  {
    quote:
      "Ahmed helped prove our product was technically feasible. He ramped fast, asked smart questions, and delivered with clarity and reliability.",
    author: "Josh Zack",
    role: "Co-Founder @ Reconciled",
  },
  {
    quote:
      "Thoughtful, detail-oriented, and impactful-Ahmed consistently improved the product and brought strong execution to every challenge.",
    author: "Brock Rumer",
    role: "Product & Design @ Reconciled",
  },
] as const;

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <SectionHeader index="05" label="testimonials" title="Testimonials" />

      <ul className="border hairline divide-y divide-border">
        {TESTIMONIALS.map((item) => (
          <li key={item.author} className="bg-background p-6 md:p-8">
            <blockquote className="font-ntype text-base md:text-lg text-muted-foreground leading-relaxed">
              "{item.quote}"
            </blockquote>
            <p className="mt-4 font-mono-pair text-xs uppercase tracking-[0.2em] text-ts-blue">
              {item.author}, {item.role}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

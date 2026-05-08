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
      <SectionHeader
        index="03"
        label="testimonials"
        title="What working together felt like."
      />

      <ul className="space-y-12 md:space-y-16">
        {TESTIMONIALS.map((item, idx) => (
          <li
            key={item.author}
            className={`max-w-4xl ${idx % 2 === 1 ? "md:ml-auto md:text-right" : ""}`}
          >
            <blockquote className="font-ntype text-lg md:text-2xl text-foreground leading-relaxed">
              "{item.quote}"
            </blockquote>
            <p className="mt-5 font-mono-pair text-[11px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">
              — {item.author}, {item.role}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

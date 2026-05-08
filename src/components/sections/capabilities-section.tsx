import { Link } from "react-router-dom";
import SectionHeader from "./section-header";

const FOCUS_ITEMS: readonly {
  id: string;
  title: string;
  body: string;
  ctaText?: string;
  ctaTo?: string;
}[] = [
  {
    id: "01",
    title: "Simplicity in complexity",
    body: "Make complex systems feel simple, intuitive, and effortless to use without losing depth.",
  },
  {
    id: "02",
    title: "Attention to detail",
    body: "Treat small details as meaningful decisions - they often define the difference between good and great products.",
  },
  {
    id: "03",
    title: "Interface craftsmanship",
    body: "Build pixel-perfect interfaces where spacing, structure, and interaction feel intentional and consistent.",
  },
  {
    id: "04",
    title: "Engineering quality",
    body: "Balance speed with maintainability - ship fast without creating fragile systems.",
  },
  {
    id: "05",
    title: "Writing & knowledge sharing",
    body: "Share engineering and product thinking through writing to transfer knowledge and reflect on real-world experience.",
    ctaText: "Read my writing",
    ctaTo: "/blog",
  },
  {
    id: "06",
    title: "Mentorship & growth",
    body: "Help junior and mid-level engineers grow through guidance, feedback, and practical engineering insight.",
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <SectionHeader index="02" label="focus" title="What I focus on" />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
        {FOCUS_ITEMS.map((item) => (
          <li key={item.id}>
            <p className="font-mono-pair text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {item.id}
            </p>
            <h3 className="mt-3 font-display text-xl md:text-2xl leading-snug text-foreground">
              {item.title}
            </h3>
            <p className="mt-3 font-ntype text-sm md:text-base text-muted-foreground leading-relaxed">
              {item.body}
            </p>
            {item.ctaText && item.ctaTo ? (
              <div className="mt-3 font-mono-pair text-xs uppercase tracking-[0.2em]">
                <Link
                  to={item.ctaTo}
                  className="inline-flex items-center text-ts-blue hover:underline underline-offset-4 transition-colors"
                >
                  {`→ ${item.ctaText}`}
                </Link>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

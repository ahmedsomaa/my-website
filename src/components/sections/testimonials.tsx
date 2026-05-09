import SectionHeader from "./section-header";
import { motion, useReducedMotion } from "framer-motion";
import { HOME_MOTION_EASE } from "@/components/home-section-motion";

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
  const reduceMotion = useReducedMotion() === true;

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <SectionHeader
        index="03"
        label="testimonials"
        title="What working together felt like."
      />

      <ul className="space-y-12 md:space-y-16">
        {TESTIMONIALS.map((item, idx) => (
          <motion.li
            key={item.author}
            className={`max-w-4xl ${idx % 2 === 1 ? "md:ml-auto md:text-right" : ""}`}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: idx % 2 === 0 ? -32 : 32 }
            }
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{
              duration: 0.56,
              ease: HOME_MOTION_EASE,
              delay: reduceMotion ? 0 : 0.08 + idx * 0.14,
            }}
          >
            <blockquote className="font-ntype text-lg md:text-2xl text-foreground leading-relaxed">
              "{item.quote}"
            </blockquote>
            <p className="mt-5 font-mono-pair text-[11px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">
              — {item.author}, {item.role}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

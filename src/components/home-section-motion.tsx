import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const HOME_MOTION_EASE: [number, number, number, number] = [
  0.25, 0.1, 0.25, 1,
];

type ScrollPreset = "work" | "focus" | "voices" | "connect";

const scrollPresets: Record<
  ScrollPreset,
  { y: number; duration: number; amount: number | "some" }
> = {
  work: { y: 36, duration: 0.55, amount: 0.12 },
  focus: { y: 28, duration: 0.52, amount: 0.1 },
  voices: { y: 26, duration: 0.58, amount: 0.14 },
  connect: { y: 32, duration: 0.62, amount: 0.18 },
};

/** Soft mount for above-the-fold hero (does not fight in-hero text motion). */
export function HomeHeroReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion() === true;
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: HOME_MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Scroll-driven block reveal for stacked home sections. */
export function HomeScrollReveal({
  children,
  preset,
}: {
  children: ReactNode;
  preset: ScrollPreset;
}) {
  const reduce = useReducedMotion() === true;
  const { y, duration, amount } = scrollPresets[preset];
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -64px 0px" }}
      transition={{ duration, ease: HOME_MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}

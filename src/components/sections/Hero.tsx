import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMode } from "@/context/mode-context";

export default function Hero() {
  const { mode } = useMode();
  return (
    <section className="relative">
      <div
        className={`absolute inset-0 ${mode === "raw" ? "grid-bg opacity-100" : "grid-bg opacity-30"}`}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 md:pt-32 pb-24 md:pb-40">
        <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono-pair mb-8">
          <span className="h-1.5 w-1.5 bg-ts-blue animate-pulse" />
          <span>00 / hero</span>
          <span className="h-px w-12 bg-foreground/30" />
          <span>
            ~/som3aware/index<span className="text-ts-blue">.tsx</span>
          </span>
        </div>

        <p className="mb-4 font-mono-pair text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Hello, I&apos;m Ahmed Ismail
        </p>
        <h1 className="font-display font-bold leading-[1.1] tracking-[-0.4px] text-[clamp(1.35rem,3.8vw+0.2rem,2rem)] md:text-[clamp(2rem,2.2vw+1rem,3rem)] max-w-none">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="inline-block whitespace-nowrap"
          >
            I turn complex
          </motion.span>
          <br />
          <span className="inline-block whitespace-nowrap">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35, ease: "easeOut" }}
            >
              ideas into{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.35, ease: "easeOut" }}
              className="relative inline-block px-0.5"
            >
              intuitive
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-0.5 -right-0.5 -bottom-1 h-2 border-b-2 border-ts-blue/90 rotate-[-1.8deg] rounded-[999px]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-0.5 -right-0.5 -bottom-[3px] h-2 border-b border-ts-blue/70 rotate-[0.8deg] rounded-[999px]"
              />
            </motion.span>
          </span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.35, ease: "easeOut" }}
            className="inline-block whitespace-nowrap"
          >
            digital experiences
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.35, ease: "easeOut" }}
          className="mt-10 max-w-3xl text-sm md:text-base lg:text-lg text-muted-foreground font-ntype leading-relaxed"
        >
          I care about crafting seamless, effortless experiences — designed to
          captivate, delight, and last.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.35, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 border hairline px-5 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair bg-foreground text-background hover:bg-background hover:text-foreground transition-colors"
          >
            View My Work
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.25}
            />
          </Link>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 border hairline px-5 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair hover:bg-muted transition-colors"
          >
            Get In Touch
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.25}
            />
          </Link>
        </motion.div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border hairline">
          {[
            { k: "7+", lines: ["Years experience"], c: "text-brand-react" },
            { k: "10+", lines: ["Products shipped"], c: "text-brand-node" },
            { k: "4+", lines: ["Organizationss"], c: "text-brand-ts" },
            {
              k: "2",
              lines: ["Degrees · BSc & MSE"],
              c: "text-brand-tailwind",
            },
          ].map(({ k, lines, c }) => (
            <div key={k} className="bg-background p-5 md:p-6">
              <p className={`font-display text-lg md:text-2xl ${c}`}>{k}</p>
              <p className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono-pair leading-snug md:whitespace-nowrap">
                {lines[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

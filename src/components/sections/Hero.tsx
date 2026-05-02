import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Typewriter from "@/components/typewriter";
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

        <h1 className="font-display font-bold uppercase leading-[0.95] tracking-[-0.4px] text-[clamp(2rem,4vw+0.75rem,2.5rem)] md:text-[clamp(2.25rem,2.75vw+1.25rem,3.75rem)] max-w-none">
          <Typewriter text="Crafting" speed={70} />
          <br />
          <span className="text-ts-blue">
            <Typewriter text="elegant" speed={55} delay={700} />
          </span>{" "}
          <Typewriter text="products." speed={55} delay={1500} caret={false} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          className="mt-10 max-w-3xl text-base md:text-lg lg:text-xl text-muted-foreground font-ntype leading-relaxed"
        >
          I turn complex ideas into seamless digital experiences that feel
          effortless to use—crafted to captivate, delight, and make a lasting
          impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 border hairline px-5 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair hover:bg-foreground hover:text-background transition-colors"
          >
            View My Work
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.25}
            />
          </Link>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 border hairline px-5 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair hover:bg-foreground hover:text-background transition-colors"
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
